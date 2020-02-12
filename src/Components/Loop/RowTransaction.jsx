import React, { Fragment, useState } from "react";
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
    fontWeight: "400"
  }
}));
function RowTransaction(props) {
  console.log('id',props.id)
  console.log('report',props.report)
  const classes = useStyles();
  console.log('propsdi rowtable',props)
  return (
    <Fragment>
      <Grid item xs={2}>
        <Typography
          variant="body2"
          className={classes.padding}
          style={{ textAlign: "center", alignItems: "center" }}
        >
          {props.date.slice(0, -14)}
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography
          variant="body2"
          className={classes.padding}
          style={{ textAlign: "center", alignItems: "center" }}
        >
          {props.date.slice(-14, -6)}
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography
          variant="body2"
          className={classes.padding}
          style={{ textAlign: "center", alignItems: "center" }}
        >
          {props.orderId}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography
          variant="body2"
          className={classes.padding}
          style={{ textAlign: "center", alignItems: "center" }}
        >
          {props.nominal}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography
          variant="body2"
          className={classes.padding}
          style={{ textAlign: "center", alignItems: "center" }}
        >
          {props.paymentStatus}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography
          variant="body2"
          className={classes.padding}
          style={{ textAlign: "center", alignItems: "center" }}
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
