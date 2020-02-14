import React from "react";
import { Typography, Grid, Paper, makeStyles } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab"
import Title from "./Title";

const useStyles = makeStyles(theme => ({
  depositContext: {
    flex: 1,
    fontFamily: "Questrial, sans-serif"
  },
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: "10px",
    border: "1.5px solid #306854",
    boxShadow: "1px 0px 6px 3px rgba(224,234,236,0.74)",
  },
  center: {
    textAlign: "center"
  },
  duit : {
    fontFamily: "Questrial",
    fontWeight: "500",
    color: "#e7a127",
    marginTop: "0.2em",
    marginBottom: "0.2em",
  }
}));

export default function Balances(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid className={classes.center} item xs={12} style={{margin: "0.4em auto 0.4em"}}>
        <Typography
          variant="h4"
          style={{ fontFamily: "Cabin", fontWeight: "400", color: "#306854" }}
        >
          Ringkasan Penjualan
        </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={3} justify="center">
        <Grid item xs>
          <Paper className={classes.paper}>
            <Title>Sisa Asset</Title>
            {props.isLoadingModal?
              <div style={{display: "flex", justifyContent:"center"}}>
                <Skeleton animation="wave" width="60%" style={{textAlign: "center"}} height={75}/>
              </div>
            :
              <Typography variant="h3" className={classes.duit}>
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
                <Skeleton animation="wave" width="60%" style={{textAlign: "center"}} height={75}/>
              </div>
            :
              <Typography variant="h3" className={classes.duit}>
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
                <Skeleton animation="wave" width="60%" style={{textAlign: "center"}} height={75}/>
              </div>
            :
              <Typography variant="h3" className={classes.duit}>
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
