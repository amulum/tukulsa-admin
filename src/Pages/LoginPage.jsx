import React, { Component, Fragment } from "react";
import Login from "../Components/Login";
import { connect } from "unistore/react";
import { actions } from "../store/store";
import { withRouter, Redirect } from "react-router-dom";

class LoginPage extends Component {
  state= {
    isReport: false,
    isError: false
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
        handleOpen={this.handleOpen}
        handleSubmit={this.handleSubmitForm}
        />
      
    }
  }
}

export default connect("isLoggedIn, loginReport, isError", actions)(withRouter(LoginPage));
