import React, { Fragment } from "react";
import { connect } from "unistore/react";
import { actions } from "../../store/store";
import { withRouter } from "react-router-dom";
import {
  makeStyles,
  Grid,
  Typography
} from "@material-ui/core";
// ICONS

const useStyles = makeStyles(theme => ({
  status: {
    padding: "0.4em"
  },
  padding: {
    padding: "0.4em",
    fontWeight: "500",
    color: "#1b4144",
    textAlign: "center",
    // fontFamily: "Cabin",
    // fontFamily: "Questrial",
    fontFamily: "Oxygen",
    letterSpacing: "1px",
    fontSize: "1em"

  }
}));
function RowTransaction(props) {
  const classes = useStyles();
  return (
    <Fragment>
      <Grid item xs={2}>
        <Typography
          variant="subtitle1"
          className={classes.padding}
        >
          {props.date.slice(0, -6)}
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography
          variant="subtitle1"
          className={classes.padding}
        >
          {props.date.slice(16)}
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography
          variant="subtitle1"
          className={classes.padding}
        >
          {props.orderId}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography
          variant="subtitle1"
          className={classes.padding}
        >
          {props.nominal}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography
          variant="subtitle1"
          className={classes.padding}
        >
          {props.paymentStatus}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography
          variant="subtitle1"
          className={classes.padding}
        >
          {props.orderStatus}
        </Typography>
      </Grid>
    </Fragment>
  );
}

export default connect(
  "isLoggedIn, listTransactions, userId, displayName",
  actions
)(withRouter(RowTransaction));
