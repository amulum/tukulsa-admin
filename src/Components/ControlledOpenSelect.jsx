import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { store } from "../store/store";
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
export default function ControlledOpenSelect(props) {
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
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div style={{ margin: "0 0 0 auto" }}>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel}id="demo-controlled-open-select-label">Periode</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={age}
          onChange={handleChange}
          labelWidth={labelWidth}
        >
          <MenuItem value={1}>1 Hari Terakhir</MenuItem>
          <MenuItem value={3}>3 Hari Terakhir</MenuItem>
          <MenuItem value={7}>7 Hari Terakhir</MenuItem>
          <MenuItem value={30}>30 Hari Terakhir</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}