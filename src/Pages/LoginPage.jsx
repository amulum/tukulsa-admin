import React, { Component } from "react";
import Login from "../Components/Login";
import { connect } from "unistore/react";
import { actions } from "../store/store";
import { withRouter, Redirect } from "react-router-dom";

class LoginPage extends Component {
  state= {
    isReport: false
  }
  componentWillMount = async () => {
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
    }
  };
  render() {
    if (this.state.isReport) {
      return (
        <Redirect to="/report"/>
      )
    }
    else if (localStorage.getItem('token')) {
      return (
        <Redirect to="/dashboard"/>
      )
    } else {
      return <Login handleSubmit={this.handleSubmitForm} />;
    }
  }
}

export default connect("isLoggedIn, loginReport", actions)(withRouter(LoginPage));
