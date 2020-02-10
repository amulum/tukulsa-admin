import React from 'react';
import { Route, Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'unistore/react';
import { store } from '../store/store';
// PAGES
import Dashboard from '../Pages/Dashboard'
import Transactions from '../Pages/Transactions'
import Report from '../Pages/Report'
import Login from '../Pages/Login'


const Mainroute = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                  <Route exact path="/login" component={Login}/>
                  <Route exact path="/dashboard" component={Dashboard}/>
                  <Route exact path="/transactions" component={Transactions}/>
                  <Route exact path="/report" component={Report}/>
                </Switch>
            </BrowserRouter>
        </Provider>
    )
}

export default Mainroute;