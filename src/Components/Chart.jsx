import React from "react";
import { LineChart } from "react-chartkick";
import { makeStyles } from "@material-ui/core/styles";
import "chart.js";
import Title from "../Components/Title";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  depositContext: {
    flex: 1
  },
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

export default function Chart(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Title>Riwayat Transaksi</Title>
            <LineChart data={props.data} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
