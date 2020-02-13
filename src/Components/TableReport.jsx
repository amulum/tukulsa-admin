import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {  Typography, Grid } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../store/store";
import RowReport from "./Loop/RowReport";
import LoadingRow from "./Loop/LoadingRow";

const useStyles = makeStyles({
  table: {
    width: "100%"
  },
  padding: {
    padding: "0.4em",
    borderBottom: "2px solid #306854",
    marginBottom: "0.4em",
  }
});

const TableReport = props => {
  const classes = useStyles();
  const loopRow = props.listAllReport.map((item, key) => {
    return (
      <RowReport
        key={key}
        id={item.id}
        orderId={item.order_id}
        report={item.text}
        date={item.created_at}
        status={item.status}
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
        component="box"
      >
        <Grid item xs={2}>
          <Typography
            variant="subtitle1"
            className={classes.padding}
            style={{ textAlign: "center", fontWeight: "600" }}
          >
            TANGGAL
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography
            variant="subtitle1"
            className={classes.padding}
            style={{ textAlign: "center", fontWeight: "600" }}
          >
            JAM
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography
            variant="subtitle1"
            className={classes.padding}
            style={{ textAlign: "center", fontWeight: "600" }}
          >
            ORDER ID
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography
            variant="subtitle1"
            className={classes.padding}
            style={{ textAlign: "center", fontWeight: "600" }}
          >
            KELUHAN
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography
            variant="subtitle1"
            className={classes.padding}
            style={{ textAlign: "center", fontWeight: "600" }}
          >
            STATUS
          </Typography>
        </Grid>
        {props.isLoading ? (
          <Fragment>
            <LoadingRow listLoading={[2,1,2,4,3]} />
            <LoadingRow listLoading={[2,1,2,4,3]} />
            <LoadingRow listLoading={[2,1,2,4,3]} />
          </Fragment>
        ) : (
          loopRow
        )}
      </Grid>
    </Fragment>
  );
};

export default connect("listAllReport", actions)(withRouter(TableReport));
