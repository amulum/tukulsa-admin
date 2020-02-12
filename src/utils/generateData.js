const generateData = transactions => {
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
  let result_dict = {};
  for (let i = 0; i < result.length; i++) {
    let obj = result[i];
    result_dict[obj.day] = obj.price;
  }
  return result_dict;
};

export default generateData