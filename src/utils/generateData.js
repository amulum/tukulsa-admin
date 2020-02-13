const getDaysInTime =num => {
  let date = new Date();
  let days = {};
  for (let i=0; i <= num; i++){
    let newDay = new Date(date).toJSON().slice(0,10).replace(/-/g,'/')
    days[newDay] = 0
    date.setDate(date.getDate() - 1)
  }
  return days
}

const generateData = (transactions, daysAgo) => {
  let list_day_trx = transactions.map(item => {
    let day = item.created_at.slice(0, 16);
    let price = item.price;
    return { day, price };
  });
  let temp = {};
  for (let i = 0; i < list_day_trx.length; i++) {
    let day_trx = list_day_trx[i];

    if (!temp[day_trx.day]) {
      temp[day_trx.day] = day_trx;
    } else {
      temp[day_trx.day].price += day_trx.price;
    }
  }
  let result = [];
  for (var prop in temp) result.push(temp[prop]);
  let result_dict = getDaysInTime(daysAgo);
  for (let i = 0; i < result.length; i++) {
    let obj = result[i];
    result_dict[obj.day] = obj.price;
  }
  return result_dict;
};

export default generateData