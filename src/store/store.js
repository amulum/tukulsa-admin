import createStore from 'unistore';
import axios from 'axios'

const liff = window.liff

const initialState = {
  listAllTransactions: []
};
export const store = createStore(initialState);


// testing = 'https://tukulsa-new-test.herokuapp.com'
// prod = 'https://tukulsa-prod.herokuapp.com'
const apiPath = 'https://tukulsa.site'
export const actions = store => ({
  // BASIC FUNCTION
  setInput: (store, event) => {
    console.log(event.target.name, event.target.value)
    store.setState({
      [event.target.name]: event.target.value
    })
  },
  setChange: (store, key, value) => {
    store.setState({
      [key]: value
    });
  },
  setManyChanges: (store, dict) => {
    store.setState(dict)
  },
  // FUNCTIONS
  handleLogin : async (state, security) => {
    console.log('masuk handle login')
    const req = await {
      method: 'get',
      url: `${apiPath}/auth?security_code=${security}`
    };
    console.log('cek req admin transactions', req);
    const self = store;
    await axios(req)
      .then(response => {
        self.setState({
          isLoading: false
        });
        localStorage.setItem('token', response.data.token)
        console.log('masuk then', response.data);
      })
      .catch(error => {
        self.setState({
          isLoading: false
        });
        console.log('masuk error', error);
      });
  },
  getAllTransactions: async (state) => {
    console.log('masuk get user transac')
    const req = await {
      method: 'get',
      url: `${apiPath}/admin/transaction/list`,
    };
    console.log('cek req admin transactions', req);
    const self = store;
    await axios(req)
      .then(response => {
        self.setState({
          listAllTransactions: response.data,
          isLoading: false
        });
        console.log('masuk then', response.data);
      })
      .catch(error => {
        self.setState({
          isLoading: false
        });
        console.log('masuk error', error);
      });
  },

  getUserTransactions: async (state, line_id) => {
    console.log('masuk get user transac')
    const dataProfile = {
      line_id
    }
    console.log(dataProfile)
    const req = await {
      method: 'post',
      url: `${apiPath}/users/transactions/filterby`,
      data: dataProfile
    };
    console.log('cek req usertransactions', req);
    const self = store;
    await axios(req)
      .then(response => {
        self.setState({
          listTransactions: response.data,
          isLoading: false
        });
        console.log('masuk then', response.data);
      })
      .catch(error => {
        self.setState({
          isLoading: false
        });
        console.log('masuk error', error);
      });
  },
  initializeLiff: (state) => {
    // const myLiffId = process.env.MY_LIFF_ID;
    console.log('2')
    console.log('masuk initializeLiff')
    liff
      .init({
        liffId: "1653837101-NwEQEqV9" // use own liffId
      })
      .then(() => {
        // Start to use liff's api
        console.log('3')
        console.log('masuk initializeApp')
        console.log('5')
        store.setState({
          language: liff.getLanguage(),
          OS: liff.getOS(),
          version: liff.getVersion(),
          isInClient: liff.isInClient(),
          isLoggedIn: liff.isLoggedIn(),
        })

        // get profile
        liff.getProfile().then(profile => {
            store.setState({
              userId: profile.userId,
              displayName: profile.displayName,
              pictureUrl: profile.pictureUrl,
              statusMessage: profile.statusMessage
            })
            console.log('6')
            console.log('getprofile liff', initialState.userId)
            console.log('getprofile liff', initialState.displayName)
            console.log('getprofile liff', initialState.pictureUrl)
            console.log('getprofile liff', initialState.statusMessage)
          })
          .catch((err) => {
            console.log('6 error')
            console.log('error', err);
          });
      })
      .catch((err) => {
        // Error happens during initialization
        console.log('4')
        console.log(err.code, err.message);
      });
  },
  sendMessages: (state, messages) => {
    console.log('masuk sendMessages store', messages)
    liff.sendMessages([{
        type: 'text',
        text: `${messages}`
      }])
      .then(() => {
        console.log('message sent');
      })
      .catch((err) => {
        console.log('error', err);
      });
  },
  closeWindow: (state) => {
    liff.closeWindow()
  }
})