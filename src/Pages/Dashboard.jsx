import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../store/store";
import MiniDrawer from "../Components/Layout/MiniDrawer";
import { Typography } from "@material-ui/core";
import "../App.css";
import Balances from "../Components/Balance";
import Chart from "../Components/Chart";
import Grid from "@material-ui/core/Grid";
import generateData from '../utils/generateData';
import ControlledOpenSelect from '../Components/ControlledOpenSelect';

class Dashboard extends Component {
  componentDidMount = () => {
    this.props.getFilterTransactions(this.props.DashboardPeriod);
    this.props.getBalanceMobilePulsa();
    console.log("did mount", this.props.listAllTransactions);
  };
  render() {
    const data = generateData(this.props.listSuccessTransactions);
    return (
      <Fragment>
        <MiniDrawer />
        {/* Content begin here */}
        <main style={{ padding: "1.5em", paddingTop: "8%", width: "100%" }}>
          <Grid container direction="row">
            <Typography
              variant="h5"
              style={{ marginTop: "auto", marginBottom: "auto" }}
            >
              Dashboard
            </Typography>
            <ControlledOpenSelect />
          </Grid>
          <Balances
            periode={this.props.DashboardPeriod + " Hari Terakhir"}
            totalPenjualan={`Rp ${this.props.totalPenjualan}`}
            totalTransaksi={this.props.totalTransaksi}
            balancePulsa={this.props.balancePulsa}
          />
          <Chart data={data} />
        </main>
        {/* EOF content */}
      </Fragment>
    );
  }
}

export default connect(
  "DashboardPeriod, totalPenjualan, totalTransaksi, listSuccessTransactions, balancePulsa, listAllTransaction, isLoading, totalProfit",
  actions
)(withRouter(Dashboard));
