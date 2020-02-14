import React, { Component, Fragment } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../store/store";
import MiniDrawer from "../Components/Layout/MiniDrawer";
import { Typography, Grid } from "@material-ui/core";
import "../App.css";
import BoxElement from "../Components/BoxElement";
import TableTransaction from "../Components/TableTransaction";
import FilterBy from "../Components/FilterBy"
import SearchBar from "../Components/SearchBar"
import PaginationControlled from "../Components/Pagination";


class Transactions extends Component {
  state = {
    isLoading: true,
    paymentStatus : '',
    orderStatus: '',
    word: '',
    listStatusPembayaran: [
      "LUNAS",
      "TERTUNDA",
      "BELUM DIBAYAR",
      "KADALUWARSA"
    ],
    listStatusOrder: [
      "SUKSES",
      "BELUM DIPROSES"
    ],
    listAllTransactions: [],
    selectedPage: 1
  };
  componentDidMount = async () => {
    await this.props.getAllTransactions();
    await this.setState({ listAllTransactions : this.props.listAllTransactions})
    await setTimeout(this.setState({isLoading: this.props.isLoading}), 5000)

  };
  handleFilterPayment = (status) => {
    this.setState({paymentStatus : status})
  }
  handleFilterOrder = (status) => {
    this.setState({orderStatus : status})
  }
  handleSearchBar = async (keyword) => {
    await this.setState({word: keyword})
  }
  handlePagination = async (page) => {
    await this.setState({ selectedPage : page})
  }
  // butuh handlefilterstatus, id, title, listFilter
  render() {
    const { listAllTransactions, paymentStatus, orderStatus, word, selectedPage } = this.state
    let topIndex, bottomIndex
    if (selectedPage === 1) {
      topIndex = 10
      bottomIndex = 0
    } else {
      topIndex = (selectedPage*10)
      bottomIndex = (selectedPage*10) - 10
    }
    let filteredTransactions = listAllTransactions
    if (paymentStatus !== ""){
      filteredTransactions = filteredTransactions.filter(item => {
        if (item.payment_status === paymentStatus) {
            return item;
        }
        return false;
      });
    }
    if (orderStatus !== ""){
      filteredTransactions = filteredTransactions.filter(item => {
        if (item.order_status === orderStatus) {
            return item;
        }
        return false;
      });
    }
    if (word !== ""){
      filteredTransactions = filteredTransactions.filter(item => {
        if (new RegExp(word).test(item.order_id.toLowerCase())) {
          return item;
        } else {
          return false;
        }
      });
    }
    const oke = <TableTransaction 
        listAllTransactions={filteredTransactions.slice(bottomIndex, topIndex)}
        isLoading={this.state.isLoading}
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
            <Grid container justify="space-between" alignItems="center" spacing={2}>
              <Grid item xs={3} >
              <Typography
                variant="h4"
                style={{ marginTop: "auto", marginBottom: "auto", fontFamily: "antipasto_prodemibold, sans-serif", fontWeight: "700", color: "#306854" }}
              >
                Transactions
              </Typography>
              </Grid>
              <Grid item xs={3}>
                <SearchBar 
                  handleSearchbar={this.handleSearchBar}
                />
              </Grid>
              <Grid item xs={3} >
                <Grid container justify="space-around" direction="row" alignItems="center">
                  <FilterBy 
                    id="status-pembayaran"
                    title="STATUS PEMBAYARAN"
                    handleFilterStatus={this.handleFilterPayment}
                    listFilter={this.state.listStatusPembayaran}
                  />
                </Grid>
              </Grid>
              <Grid item xs={3} >
                <Grid container justify="space-around" direction="row" alignItems="center">
                  <FilterBy 
                    id="status-order"
                    title="STATUS ORDER"
                    handleFilterStatus={this.handleFilterOrder}
                    listFilter={this.state.listStatusOrder}
                  />
                </Grid>
              </Grid>
            </Grid>
            <BoxElement value={oke} />
            <Grid Container justify="flex-end">
              <Grid item xs={12}>
                <PaginationControlled handlePagination={this.handlePagination} lengthPages={Math.ceil(filteredTransactions.length/10)}/>
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
  "listAllTransactions",
  actions
)(withRouter(Transactions));