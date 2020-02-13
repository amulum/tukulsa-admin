import React from "react";
import { Typography, Grid, Paper, makeStyles } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab"
import Title from "./Title";

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
    color: theme.palette.text.secondary,
    borderRadius: "10px",
    border: "1.3px solid #306854",
    boxShadow: "1px 0px 6px 3px rgba(224,234,236,0.74)",
  },
  center: {
    textAlign: "center"
  }
}));

export default function Balances(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid className={classes.center} item xs={12}>
          <Title>Ringkasan Penjualan</Title>
        </Grid>
      </Grid>
      <Grid container spacing={3} justify="center">
        <Grid item xs>
          <Paper className={classes.paper}>
            <Title>Sisa Asset</Title>
            {props.isLoadingModal?
              <div style={{display: "flex", justifyContent:"center"}}>
                <Skeleton animation="wave" width="60%" style={{textAlign: "center"}} height={41}/>
              </div>
            :
              <Typography component="p" variant="h4" color="Primary">
                Rp {props.balancePulsa}
              </Typography>
            }
            <Typography
              color="textSecondary"
              className={classes.depositContext}
            >
              Hari Ini
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>
            <Title>Total Penjualan</Title>
            {props.isLoadingPenjualan?
              <div style={{display: "flex", justifyContent:"center"}}>
                <Skeleton animation="wave" width="60%" style={{textAlign: "center"}} height={41}/>
              </div>
            :
              <Typography component="p" variant="h4" color="Primary">
                {props.totalPenjualan}
              </Typography>
            }
            <Typography
              color="textSecondary"
              className={classes.depositContext}
            >
              {props.periode}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>
            <Title>Total Transaksi</Title>
            {props.isLoadingPenjualan?
              <div style={{display: "flex", justifyContent:"center"}}>
                <Skeleton animation="wave" width="60%" style={{textAlign: "center"}} height={41}/>
              </div>
            :
              <Typography component="p" variant="h4" color="Primary">
                {props.totalTransaksi}
              </Typography>
            }
            <Typography
              color="textSecondary"
              className={classes.depositContext}
            >
              {props.periode}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
