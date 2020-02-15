import React, { Component, Fragment } from "react";
import Login from "../Components/Login";
import { connect } from "unistore/react";
import { actions } from "../store/store";
import { withRouter, Redirect } from "react-router-dom";
import { store } from '../store/store'

class LoginPage extends Component {
  state= {
    isReport: false,
    isError: false,
    isFromLogout: false
  }
  componentWillMount = async () => {
    if (this.props.isFromLogout) {
      await this.setState({isFromLogout: this.props.isFromLogout})
      await store.setState({isFromLogout: false})
    }
  }
  componentDidMount = async () => {
    let security = await this.props.match.params.code;
    if (
      security !== "" &&
      security !== undefined
    ) {
      if (security.length === 32) {
        await this.props.handleLogin(security);
        if (this.props.loginReport) {
          await this.setState({isReport: this.props.loginReport})
        }
      }
    }
  };
  handleSubmitForm = async event => {
    event.preventDefault();
    let security = event.target.security.value;
    await this.props.handleLogin(security);
    if (this.props.isLoggedIn) {
      await store.setState({isFromLogin: true})
      await this.props.history.replace("/dashboard");
    } else {
      await this.setState({ isError : this.props.isError })
      console.log('masuk else is logged in', this.props.isError)
    }
  };
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({isError: false});
    this.setState({isFromLogout: false})

  };
  handleOpen = () => {
    this.setState({isError: true});
  }
  render() {
    if (this.state.isReport) {
      return (
        <Fragment>
          <Redirect to="/report"/>
        </Fragment>
      )
    }
    else if (localStorage.getItem('token')) {
      return (
        <Redirect to="/dashboard"/>
      )
    } else {
      return <Login
        open={this.state.isError}
        handleClose={this.handleClose}
        handleSubmit={this.handleSubmitForm}
        isFromLogout={this.state.isFromLogout}
        />
      
    }
  }
}

export default connect("isLoggedIn, loginReport, isError, isFromLogout", actions)(withRouter(LoginPage));
