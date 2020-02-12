import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../store/store";
import { store } from "../store/store";
import MiniDrawer from "../Components/Layout/MiniDrawer";
import { Typography } from "@material-ui/core";
import "../App.css";
import Balances from "../Components/Balance";
import Chart from "../Components/Chart";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));
function ControlledOpenSelect(props) {
  const classes = useStyles();
  const [age, setAge] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const getTransactionsByDay = days => {
    console.log("masuk get user transac");
    const req = {
      method: "get",
      url: `https://tukulsa.site/admin/transaction/filterby`,
      data: {
        days_ago: days
      }
    };
    console.log("cek req filter transactions", req);
    const self = store;
    axios(req)
      .then(response => {
        let totalPenjualan = response.data.total_transaction;
        totalPenjualan = totalPenjualan
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        let totalProfit = response.data.total_profit;
        totalProfit = totalProfit
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        self.setState({
          listAllTransactions: response.data.transaction,
          totalTransaksi: response.data.total_transaction_number,
          totalPenjualan: totalPenjualan,
          totalProfit: totalProfit,
          listSuccessTransactions: response.data.detail_success_transaction,
          isLoading: false
        });
        console.log("masuk then", response.data);
      })
      .catch(error => {
        self.setState({
          isLoading: false
        });
        console.log("masuk error", error);
      });
  };

  const handleChange = event => {
    setAge(event.target.value);
    store.setState({ DashboardPeriod: event.target.value });
    getTransactionsByDay(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div style={{ margin: "0 0 0 auto" }}>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Periode</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={age}
          onChange={handleChange}
        >
          <MenuItem value={7}>7 Hari Terakhir</MenuItem>
          <MenuItem value={30}>30 Hari Terakhir</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

const generateData = transactions => {
  let list_day_trx = transactions.map(item => {
    let day = item.created_at.slice(0, 16);
    let price = item.price;
    return { day, price };
  });
  let temp = {};
  for (let i = 0; i < list_day_trx.length; i++) {
    let day_trx = list_day_trx[i];

    if (!temp[day_trx.day]) {
      temp[day_trx.day] = day_trx;
    } else {
      temp[day_trx.day].price += day_trx.price;
    }
  }
  let result = [];
  for (var prop in temp) result.push(temp[prop]);
  let result_dict = {};
  for (let i = 0; i < result.length; i++) {
    let obj = result[i];
    result_dict[obj.day] = obj.price;
  }
  return result_dict;
};
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
