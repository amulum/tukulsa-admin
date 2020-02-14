import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography
} from "@material-ui/core";
import LoadingRow from "./Loop/LoadingRow"
import RowTransactions from "./Loop/RowTransaction"
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../store/store";

const useStyles = makeStyles({
  padding: {
    padding: "0.4em",
    borderBottom: "2px solid #306854",
    marginBottom: "0.4em",
    textAlign: "center",
    fontWeight: "700",
    color: "#1b4144",
    fontFamily: "Cabin",
    // fontFamily: "Questrial",
    // fontFamily: "Oxygen",
  }
});

const TableTransaction = props => {
  const classes = useStyles();
  const loopRow = props.listAllTransactions.map((item, key) => {
    return (
      <RowTransactions
        key={key}
        orderId={item.order_id}
        date={item.created_at}
        orderStatus={item.order_status}
        paymentStatus={item.payment_status}
        nominal= {item.label}
        handleChangeReport={props.handleChangeReport}
      />
    );
  });
  return (
    <Fragment>
      <Grid
        style={{ maxWidth: "100vw" }}
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={2}>
          <Typography
            variant="h6"
            className={classes.padding}
          >
            TANGGAL
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography
            variant="h6"
            className={classes.padding}
          >
            JAM
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography
            variant="h6"
            className={classes.padding}
          >
            ORDER ID
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography
            variant="h6"
            className={classes.padding}
          >
            NOMINAL
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography
            variant="h6"
            className={classes.padding}
          >
            PEMBAYARAN
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography
            variant="h6"
            className={classes.padding}
          >
            ORDER
          </Typography>
        </Grid>
        {props.isLoading ? (
          <Fragment>
            <LoadingRow listLoading={[2,1,3,2,2,2]} />
            <LoadingRow listLoading={[2,1,3,2,2,2]} />
            <LoadingRow listLoading={[2,1,3,2,2,2]} />
            <LoadingRow listLoading={[2,1,3,2,2,2]} />
            <LoadingRow listLoading={[2,1,3,2,2,2]} />
          </Fragment>
        ) : (
          loopRow
        )}
      </Grid>
    </Fragment>
  );
};

export default connect(
  "",
  actions
)(withRouter(TableTransaction));
