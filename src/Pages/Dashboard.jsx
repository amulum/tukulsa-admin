import React, { Component, Fragment } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "unistore/react";
import { actions, store } from "../store/store";
import MiniDrawer from "../Components/Layout/MiniDrawer";
import { Typography } from "@material-ui/core";
import "../App.css";
import Balances from "../Components/Balance";
import Chart from "../Components/Chart";
import Grid from "@material-ui/core/Grid";
import generateData from '../utils/generateData';
import ControlledOpenSelect from '../Components/ControlledOpenSelect';
import CustomSnackbar from '../Components/SnackBar'



class Dashboard extends Component {
  state = {
    isLoadingModal: true,
    isLoadingPenjualan: true,
    openSnack: false
  }
  componentDidMount = async () => {
    await this.props.getFilterTransactions(this.props.DashboardPeriod);
    await this.props.getBalanceMobilePulsa();
    this.setState({isLoadingModal : this.props.isLoadingModal})
    this.setState({isLoadingPenjualan : this.props.isLoadingPenjualan})
    if (this.props.isFromLogin) {
      console.log('yeay masuk if from login')
      this.setState({openSnack: true})
      store.setState({isFromLogin: false})
    }
  };
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({openSnack: false});
    store.setState({isFromLogin: false})
  };
  render() {
    const message = 
    <Typography variant="h6">
      Welcome Admin!
    </Typography>
    const data = generateData(this.props.listSuccessTransactions, this.props.DashboardPeriod);
    if (localStorage.getItem('token')=== null) {
      return (
        <Redirect to="/"/>
      )
    } else {
        return (
          <Fragment>
            <MiniDrawer />
            {/* Content begin here */}
            <main style={{ padding: "1.5em", paddingTop: "7%", width: "100%" }}>
              <CustomSnackbar
                open={this.state.openSnack}
                handleOpen={this.handleOpen}
                handleClose={this.handleClose}
                selectedSnack="success"
                messageSnack={message}
                transition="slide"
              />
              <Grid container direction="row" alignItems="center">
                <Grid item xs={10} >
                  <Typography
                    variant="h4"
                    style={{ marginTop: "auto", marginBottom: "auto", fontFamily: "antipasto_prodemibold, sans-serif", fontWeight: "700", color: "#306854" }}
                  >
                    Dashboard
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <ControlledOpenSelect />
                </Grid>
              </Grid>
              <Balances
                periode={this.props.DashboardPeriod + " Hari Terakhir"}
                totalPenjualan={`Rp ${this.props.totalPenjualan}`}
                totalTransaksi={this.props.totalTransaksi}
                balancePulsa={this.props.balancePulsa}
                isLoadingModal={this.state.isLoadingModal}
                isLoadingPenjualan={this.state.isLoadingPenjualan}
              />
              <Chart data={data} />
            </main>
            {/* EOF content */}
          </Fragment>
        );
      }
    }
}

export default connect(
  "DashboardPeriod, totalPenjualan, totalTransaksi, listSuccessTransactions, balancePulsa, listAllTransaction, isLoading, totalProfit, isLoadingModal, isLoadingPenjualan",
  actions
)(withRouter(Dashboard));
