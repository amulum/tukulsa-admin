import React from "react";
import { LineChart } from "react-chartkick";
import { makeStyles, Typography } from "@material-ui/core";
import "chart.js";
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
          <Typography
            variant="h4"
            style={{ fontFamily: "Cabin", fontWeight: "400", color: "#306854" }}
          >
            Riwayat Transaksi
          </Typography>
            <LineChart data={props.data} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
