import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../store/store";
import MiniDrawer from "../Components/Layout/MiniDrawer";
import { Typography, Grid } from "@material-ui/core";
import "../App.css";
import BoxElement from "../Components/BoxElement";
import TableTransaction from "../Components/TableTransaction";
import FilterBy from "../Components/FilterBy"
import SearchBar from "../Components/SearchBar"

class Transactions extends Component {
  state = {
    isLoading: true,
    paymentStatus : '',
    orderStatus: '',
    word: '',
    listStatusPembayaran: [
      "TERTUNDA",
      "LUNAS",
      "BELUM DIBAYAR"
    ],
    listStatusOrder: [
      "SUKSES",
      "BELUM DIPROSES"
    ],
    listAllTransactions: []
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
    console.log('keyword dari component', keyword)
    await this.setState({word: keyword})
    console.log('state keyword', this.state.word)
  }
  // butuh handlefilterstatus, id, title, listFilter
  render() {
    const { listAllTransactions, paymentStatus, orderStatus, word } = this.state
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
        console.log('if condition',new RegExp(word).test(item.order_id.toLowerCase()))
        if (new RegExp(word).test(item.order_id.toLowerCase())) {
          console.log('string found')
          return item;
        } else {
          console.log('masuk else')
          return false;
        }
      });
    }
    const oke = <TableTransaction 
        listAllTransactions={filteredTransactions}
        isLoading={this.state.isLoading}
      />;
    return (
      <Fragment>
        <MiniDrawer />
        {/* Content begin here */}
        <main style={{ padding: "1.5em", paddingTop: "8%", width: "100%" }}>
          <Grid container justify="space-between" alignItems="center" spacing={2}>
            <Grid item xs={3} >
              <Typography variant="h5">Transaction</Typography>
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