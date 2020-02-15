import React, { Component, Fragment } from "react";
import { withRouter, Redirect } from "react-router-dom";
import MiniDrawer from "../Components/Layout/MiniDrawer";
import { Typography, Grid } from "@material-ui/core";
import "../App.css";
import BoxElement from "../Components/BoxElement";
import TableReport from "../Components/TableReport";
import { connect } from "unistore/react";
import { actions } from "../store/store";
import FilterBy from "../Components/FilterBy";
import SearchBar from "../Components/SearchBar";
import PaginationControlled from "../Components/Pagination";
import { store } from "../store/store";
import CustomSnackbar from "../Components/SnackBar";

class Report extends Component {
  state = {
    word: "",
    listAllReport: [],
    reportStatus: "",
    listStatusReport: ["SELESAI", "BELUM DISELESAIKAN"],
    selectedPage: 1,
    isLoading: true
  };
  componentWillMount = async () => {
    if (this.props.isFromLoginReport) {
      // console.log("yeay masuk if from login");
      this.setState({ openSnack: true });
      store.setState({ isFromLoginReport: false });
    }
  };
  refreshReport = async () => {
    await this.props.getAllReport(this.state.reportStatus);
    await this.setState({ listAllReport: this.props.listAllReport });
  };
  componentDidMount = async () => {
    await this.refreshReport();
    await this.setState({ reportStatus: this.props.reportStatus });
    await setTimeout(this.setState({ isLoading: this.props.isLoading }), 5000);
    // console.log("masuk did mount lagi kah?");
  };
  handleChangeReport = async reportId => {
    // await this.props.handleChangeReport(reportId, "BELUM DISELESAIKAN");
    await this.props.handleChangeReport(reportId, "SELESAI");
    await this.refreshReport();
  };
  handleFilterStatus = async status => {
    await this.setState({ reportStatus: status });
  };
  handlePagination = async page => {
    await this.setState({ selectedPage: page });
  };
  handleSearchBar = async keyword => {
    await this.setState({ word: keyword });
  };
  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ openSnack: false });
    store.setState({ isFromLoginReport: false });
  };
  render() {
    const message = <Typography variant="h6">Welcome Admin!</Typography>;
    const { listAllReport, reportStatus, selectedPage, word } = this.state;
    let filteredReport = listAllReport;
    let topIndex, bottomIndex;
    if (selectedPage === 1) {
      topIndex = 10;
      bottomIndex = 0;
    } else {
      topIndex = selectedPage * 10;
      bottomIndex = selectedPage * 10 - 10;
    }
    if (reportStatus !== "") {
      filteredReport = listAllReport.filter(item => {
        if (item.status === reportStatus) {
          return item;
        }
        return false;
      });
    }
    if (word !== "") {
      filteredReport = filteredReport.filter(item => {
        if (new RegExp(word).test(item.order_id.toLowerCase())) {
          return item;
        } else {
          return false;
        }
      });
    }
    const oke = (
      <TableReport
        listAllReport={filteredReport.slice(bottomIndex, topIndex)}
        handleChangeReport={this.handleChangeReport}
        isLoading={this.state.isLoading}
      />
    );
    if (localStorage.getItem("token") === null) {
      return <Redirect to="/" />;
    } else {
      return (
        <Fragment>
          <MiniDrawer />
          {/* Content begin here */}
          <main style={{ padding: "1.5em", paddingTop: "7%", width: "100%" }}>
            <CustomSnackbar
              open={this.state.openSnack}
              handleClose={this.handleClose}
              selectedSnack="success"
              messageSnack={message}
              transition="slide"
            />
            <Grid container justify="space-between" alignItems="center">
              <Grid item xs={6}>
                <Typography
                  variant="h4"
                  style={{
                    marginTop: "auto",
                    marginBottom: "auto",
                    fontFamily: "antipasto_prodemibold, sans-serif",
                    fontWeight: "700",
                    color: "#306854"
                  }}
                >
                  Report
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <SearchBar handleSearchbar={this.handleSearchBar} />
              </Grid>
              <Grid item xs={3}>
                <Grid
                  container
                  justify="space-around"
                  direction="row"
                  alignItems="center"
                >
                  <FilterBy
                    id="status-laporan"
                    title="STATUS LAPORAN"
                    handleFilterStatus={this.handleFilterStatus}
                    listFilter={this.state.listStatusReport}
                  />
                </Grid>
              </Grid>
            </Grid>
            <BoxElement value={oke} />
            <Grid Container justify="flex-end">
              <Grid item xs={12}>
                <PaginationControlled
                  handlePagination={this.handlePagination}
                  lengthPages={Math.ceil(filteredReport.length / 10)}
                />
              </Grid>
            </Grid>
          </main>
          {/* EOF content */}
        </Fragment>
      );
    }
  }
}

export default connect(
  "listAllReport, isLoading, reportStatus, isFromLoginReport",
  actions
)(withRouter(Report));
