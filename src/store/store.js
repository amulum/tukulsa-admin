import createStore from "unistore";
import axios from "axios";

const initialState = {
  isLoggedIn: false,
  listAllTransactions: [],
  listAllReport: [],
  DashboardPeriod: 30,
  totalTransaksi: 0,
  totalPenjualan: 0,
  totalProfit: 0,
  listSuccessTransactions: [],
  isLoading: true,
  balancePulsa: 0
};
export const store = createStore(initialState);

// testing = 'https://tukulsa-new-test.herokuapp.com'
// prod = 'https://tukulsa-prod.herokuapp.com'
const apiPath = "https://tukulsa.site";
export const actions = store => ({
  // BASIC FUNCTION
  setInput: (store, event) => {
    console.log(event.target.name, event.target.value);
    store.setState({
      [event.target.name]: event.target.value
    });
  },
  setChange: (store, key, value) => {
    store.setState({
      [key]: value
    });
  },
  setManyChanges: (store, dict) => {
    store.setState(dict);
  },
  // FUNCTIONS
  handleLogin: async (state, security) => {
    console.log("masuk handle login", security);
    const req = await {
      method: "get",
      url: `${apiPath}/auth?security_code=${security}`
    };
    console.log("cek req admin transactions", req);
    const self = store;
    await axios(req)
      .then(response => {
        self.setState({
          isLoading: false,
          isLoggedIn: true
        });
        localStorage.setItem("token", response.data.token);
        console.log("masuk then", response.data);
      })
      .catch(error => {
        self.setState({
          isLoading: false
        });
        console.log("masuk error", error);
      });
  },
  handleChangeReport: async (state, report_id, report_status) => {
    let dataChange = {
      report_id,
      report_status
    };
    const req = await {
      method: "put",
      url: `${apiPath}/admin/report`,
      data: dataChange
    };
    console.log("cek req admin transactions", req);
    const self = store;
    await axios(req)
      .then(response => {
        self.setState({
          isLoading: false
        });
        console.log("masuk then", response.data);
      })
      .catch(error => {
        self.setState({
          isLoading: false
        });
        console.log("masuk error", error);
      });
  },
  getAllTransactions: async state => {
    console.log("masuk get user transac");
    const req = await {
      method: "get",
      url: `${apiPath}/admin/transaction/list`
    };
    console.log("cek req admin transactions", req);
    const self = store;
    await axios(req)
      .then(response => {
        self.setState({
          listAllTransactions: response.data,
          isLoading: false
        });
        console.log("masuk then", response.data);
      })
      .catch(error => {
        self.setState({
          isLoading: false
        });
        console.log("masuk error", error);
      });
  },
  getAllReport: async state => {
    console.log("masuk get user transac");
    const req = await {
      method: "get",
      url: `${apiPath}/admin/report`
    };
    console.log("cek req admin report", req);
    const self = store;
    await axios(req)
      .then(response => {
        self.setState({
          listAllReport: response.data,
          isLoading: false
        });
        console.log("masuk then", response.data);
      })
      .catch(error => {
        self.setState({
          isLoading: false
        });
        console.log("masuk error", error);
      });
  },
  getFilterTransactions: async (state, days) => {
    console.log("masuk get user transac");
    const req = await {
      method: "get",
      url: `${apiPath}/admin/transaction/filterby`,
      data: {
        days_ago: days
      }
    };
    console.log("cek req filter transactions", req);
    const self = store;
    await axios(req)
      .then(response => {
        let totalPenjualan = response.data.total_transaction;
        totalPenjualan = totalPenjualan
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        let totalProfit = response.data.total_profit;
        totalProfit = totalProfit
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        self.setState({
          listAllTransactions: response.data.transaction,
          totalTransaksi: response.data.total_transaction_number,
          totalPenjualan: totalPenjualan,
          totalProfit: totalProfit,
          listSuccessTransactions: response.data.detail_success_transaction,
          isLoading: false
        });
        console.log("masuk then", response.data);
      })
      .catch(error => {
        self.setState({
          isLoading: false
        });
        console.log("masuk error", error);
      });
  },
  getBalanceMobilePulsa: async state => {
    const req = await {
      method: "get",
      url: `${apiPath}/admin/balancepulsa`
    };
    const self = store;
    await axios(req)
      .then(response => {
        let balancePulsa = response.data.balance.data.balance;
        balancePulsa = balancePulsa
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        self.setState({
          isLoading: false,
          balancePulsa: balancePulsa
        });
        console.log("masuk then", response);
      })
      .catch(error => {
        self.setState({
          isLoading: false
        });
        console.log("masuk error", error);
      });
  }
});
