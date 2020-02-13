import React, { Component } from "react";
import Login from "../Components/Login";
import { connect } from "unistore/react";
import { actions } from "../store/store";
import { withRouter } from "react-router-dom";

class LoginPage extends Component {
  componentDidMount = async () => {
    console.log(this.props.match.params.code);
    if (
      this.props.match.params.code !== "" &&
      this.props.match.params.code !== undefined
    ) {
      if (this.props.match.params.code.length === 32) {
        let security = this.props.match.params.code;
        await this.props.handleLogin(security);
        if (this.props.isLoggedIn) {
          await this.props.history.replace("/report");
        }
      }
    }
  };
  handleSubmitForm = async event => {
    event.preventDefault();
    console.log(event.target.security.value);
    let security = event.target.security.value;
    console.log("summary", this.props);
    await this.props.handleLogin(security);
    console.log(security);
    console.log(this.props.isLoggedIn);
    if (this.props.isLoggedIn) {
      await this.props.history.replace("/dashboard");
    }
  };
  render() {
    return <Login handleSubmit={this.handleSubmitForm} />;
  }
}

export default connect("isLoggedIn", actions)(withRouter(LoginPage));
