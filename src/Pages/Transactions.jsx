import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../store/store";
import MiniDrawer from "../Components/Layout/MiniDrawer";
import { Typography } from "@material-ui/core";
import "../App.css";
import BoxElement from "../Components/BoxElement";
import TableTransaction from "../Components/TableTransaction";

const oke = <TableTransaction />;
class Transactions extends Component {
  state = {
    isLoading: true
  };
  componentDidMount = async () => {
    await this.props.getAllTransactions();
  };
  render() {
    return (
      <Fragment>
        <MiniDrawer />
        {/* Content begin here */}
        <main style={{ padding: "1.5em", paddingTop: "8%", width: "100%" }}>
          <Typography variant="h5">Transactions</Typography>
          <BoxElement value={oke} />
        </main>
        {/* EOF content */}
      </Fragment>
    );
  }
}

export default connect(
  "listAllTransactions",
  actions
)(withRouter(Transactions));
