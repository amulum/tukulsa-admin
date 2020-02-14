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

class Report extends Component {
  state = {
    listAllReport : [],
    reportStatus: '',
    listStatusReport: [
      "SELESAI",
      "BELUM DISELESAIKAN"
    ]
  }

  refreshReport = async () => {
    await this.props.getAllReport(this.state.reportStatus);
    await this.setState({listAllReport: this.props.listAllReport})
    }
  componentDidMount = async () => {
    await this.setState({ reportStatus: this.props.reportStatus})
    await this.refreshReport()
  };
  handleChangeReport = async (reportId) => {
    // await this.props.handleChangeReport(reportId, "BELUM DISELESAIKAN");
    await this.props.handleChangeReport(reportId, "SELESAI");
    await this.refreshReport()
    };
  handleFilterStatus = async (status) => {
    await this.setState({reportStatus : status})
    await this.props.getAllReport(status);
    await this.setState({listAllReport: this.props.listAllReport})
  }
  render() {
    const { listAllReport, reportStatus } = this.state
    let filteredReport
    if (reportStatus !== ""){
      filteredReport = listAllReport.filter(item => {
        if (item.status !== reportStatus) {
            return item;
        }
        return false;
      });
    } else {
      filteredReport = listAllReport
    }
    const oke = <TableReport
    listAllReport={filteredReport}
    handleChangeReport={this.handleChangeReport}
    />;
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
            <Grid container justify="space-between" alignItems="center">
              <Grid item xs={9} >
              <Typography
                variant="h4"
                style={{ marginTop: "auto", marginBottom: "auto", fontFamily: "antipasto_prodemibold, sans-serif", fontWeight: "700", color: "#306854" }}
              >
                Report
              </Typography>
              </Grid>
              <Grid item xs={3} >
                <Grid container justify="space-around" direction="row" alignItems="center">
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
          </main>
          {/* EOF content */}
        </Fragment>
      );
    }
  }
}

export default connect("listAllReport, isLoading, reportStatus", actions)(withRouter(Report));
