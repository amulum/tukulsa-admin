import React, { Component, Fragment } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../store/store";
import MiniDrawer from "../Components/Layout/MiniDrawer";
import { Typography, Grid } from "@material-ui/core";
import "../App.css";
import BoxElement from "../Components/BoxElement";
import FilterBy from "../Components/FilterBy"
import TableProduct from "../Components/TableProduct";
import PaginationControlled from "../Components/Pagination";

class Product extends Component {
  state = {
    isLoading: true,
    operator: '',
    word: '',
    listOperator: [
      "Telkomsel",
      "Indosat",
      "XL",
      "Three",
      "AXIS",
      "Smart"
    ],
    listStatusOrder: [
      "SUKSES",
      "BELUM DIPROSES"
    ],
    listAllTransactions: [],
    listAllProduct: [],
    selectedPage: 1
  };
  refreshReport = async () => {
    await this.props.getAllProduct();
    await this.setState({listAllProduct: this.props.listAllProduct})
  }
  componentDidMount = async () => {
    await this.props.getAllProduct()
    console.log('listproduct did mount', this.props.listAllProduct)
    await this.setState({listAllProduct: this.props.listAllProduct})
    await setTimeout(this.setState({isLoading: this.props.isLoading}), 5000)

  };
  handleFilterOperator = (status) => {
    this.setState({operator : status})
  }
  handleChangePrice = async (productId, price) => {
    console.log('cek product id di pages',productId)
    console.log('cek price baru di pages', price)
    await this.props.editProductPrice(productId, price)
    await this.refreshReport()
  }
  handlePagination = async (page) => {
    await this.setState({ selectedPage : page})
  }
  // butuh handlefilterstatus, id, title, listFilter
  render() {
    const { listAllProduct, operator, selectedPage } = this.state
    let topIndex, bottomIndex
    if (selectedPage === 1) {
      topIndex = 10
      bottomIndex = 0
    } else {
      topIndex = (selectedPage*10)
      bottomIndex = (selectedPage*10) - 10
    }
    console.log('page :', selectedPage)
    console.log('top index :', topIndex)
    console.log('bottom index :', bottomIndex)
    let filteredProduct = listAllProduct
    if (operator !== ""){
      filteredProduct = filteredProduct.filter(item => {
        if (item.operator === operator) {
            return item;
        }
        return false;
      });
    }
    const oke = <TableProduct 
        listAllProduct={filteredProduct.slice(bottomIndex,topIndex)}
        isLoading={this.state.isLoading}
        handleChangePrice={this.handleChangePrice}
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
              <Grid item xs={9} >
              <Typography
                variant="h4"
                style={{ marginTop: "auto", marginBottom: "auto", fontFamily: "antipasto_prodemibold, sans-serif", fontWeight: "700", color: "#306854" }}
              >
                Product
              </Typography>
              </Grid>
              <Grid item xs={3} >
                <Grid container justify="space-around" direction="row" alignItems="center">
                  <FilterBy 
                    id="operator"
                    title="OPERATOR"
                    handleFilterStatus={this.handleFilterOperator}
                    listFilter={this.state.listOperator}
                  />
                </Grid>
              </Grid>
            </Grid>
            <BoxElement value={oke} />
            <Grid Container justify="flex-end">
              <Grid item xs={12}>
                <PaginationControlled handlePagination={this.handlePagination} lengthPages={Math.ceil(filteredProduct.length/10)}/>
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
  "listAllTransactions, listAllProduct", 
  actions
)(withRouter(Product));