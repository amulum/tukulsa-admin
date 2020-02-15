import createStore from "unistore";
import axios from "axios";

const initialState = {
  isLoading: true,
  isLoadingPenjualan: true,
  isLoadingModal: true,
  isLoggedIn: false,
  isFromLogin: false,
  isError: false,
  loginReport: false,
  listAllTransactions: [],
  listAllReport: [],
  DashboardPeriod: 30,
  totalTransaksi: 0,
  totalPenjualan: 0,
  totalProfit: 0,
  listSuccessTransactions: [],
  balancePulsa: 0,
  reportStatus: ''
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
    console.log("cek req admin login", req);
    const self = store;
    await axios(req)
      .then(response => {
        if (security.length === 32) {
          self.setState({
            loginReport: true,
            isLoading: false,
            isFromLogin: true
          })
        } else {
          self.setState({
            isLoading: false,
            isLoggedIn: true,
            isFromLogin: true
          })
        }
        localStorage.setItem("token", response.data.token);
        console.log("masuk then", response.data);
      })
      .catch(error => {
        self.setState({
          isLoading: false,
          isError: true
        });
        console.log("masuk error", error);
      });
  },
  handleChangeReport: async (state, report_id, report_status) => {
    await store.setState({isLoading : true})
    let dataChange = {
      report_id,
      report_status
    };
    const req = await {
      method: "put",
      url: `${apiPath}/admin/report`,
      data: dataChange,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    };
    console.log("cek req handleChangeReport", req);
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
    await store.setState({isLoading : true})
    console.log("masuk get user transac");
    const req = await {
      method: "get",
      url: `${apiPath}/admin/transaction/list`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
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
  getAllReport: async (state, status) => {
    console.log("masuk get all report", status);
    let dataStatus = status? status: ''
    const req = await {
      method: "get",
      url: `${apiPath}/admin/report?report_status=${dataStatus}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
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
  getAllProduct: async (state) => {
    await store.setState({isLoading: true})
    console.log("masuk get all product")
    const req = await {
      method: "get",
      url: `${apiPath}/admin/product/list`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    };
    console.log("cek req admin product", req);
    const self = store;
    await axios(req)
      .then(response => {
        self.setState({
          listAllProduct: response.data,
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
    await store.setState({ isLoadingPenjualan: true })
    console.log("masuk get user transac");
    const req = await {
      method: "get",
      url: `${apiPath}/admin/transaction/filterby`,
      data: {
        days_ago: days
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
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
          isLoadingPenjualan: false
        });
        console.log("masuk then", response.data);
      })
      .catch(error => {
        self.setState({
          isLoadingPenjualan: false
        });
        console.log("masuk error", error);
      });
  },
  getBalanceMobilePulsa: async state => {
    await store.setState({ isLoadingModal: true })
    const req = await {
      method: "get",
      url: `${apiPath}/admin/balancepulsa`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    };
    const self = store;
    await axios(req)
      .then(response => {
        let balancePulsa = response.data.balance.data.balance;
        balancePulsa = balancePulsa
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        self.setState({
          isLoadingModal: false,
          balancePulsa: balancePulsa
        });
        console.log("masuk then", response);
      })
      .catch(error => {
        self.setState({
          isLoadingModal: false
        });
        console.log("masuk error", error);
      });
  },
  editProductPrice: async (state, product_id, price) => {
    store.setState({isLoading : true})
    let dataEdit = {
      product_id,
      price
    }
    const req = await {
      method: "put",
      url: `${apiPath}/admin/product/edit`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      data : dataEdit
    };
    console.log('cek req edit product price', req)
    const self = store;
    await axios(req)
      .then(response => {
        self.setState({
          isLoading: false,
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
