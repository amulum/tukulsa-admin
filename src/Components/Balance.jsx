import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

function preventDefault(event) {
  event.preventDefault();
}

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

export default function Balances() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs>
          <Paper className={classes.paper}>
            <Title>Saldo MobilePulsa</Title>
            <Typography component="p" variant="h4" color="Primary">
              $3,024.00
            </Typography>
            <Typography
              color="textSecondary"
              className={classes.depositContext}
            >
              on 15 March, 2019
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>
            <Title>Total Penjualan</Title>
            <Typography component="p" variant="h4" color="Primary">
              Rp 3,024.00
            </Typography>
            <Typography
              color="textSecondary"
              className={classes.depositContext}
            >
              on 15 March, 2019
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>
            <Title>Total Transaksi</Title>
            <Typography component="p" variant="h4" color="Primary">
              21
            </Typography>
            <Typography
              color="textSecondary"
              className={classes.depositContext}
            >
              on 15 March, 2019
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
