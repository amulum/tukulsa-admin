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
    padding: "0.6em"
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
        status={item.status}
        handleChangeReport={props.handleChangeReport}
      />
    );
  });
  return (
    <Fragment>
      <Typography>Report</Typography>
      <Grid
        style={{ maxWidth: "100vw" }}
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={1}>
          <Typography
            variant="subtitle1"
            className={classes.padding}
            style={{ textAlign: "center", fontWeight: "600" }}
          >
            NO
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography
            variant="subtitle1"
            className={classes.padding}
            style={{ textAlign: "center", fontWeight: "600" }}
          >
            ORDER ID
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography
            variant="subtitle1"
            className={classes.padding}
            style={{ textAlign: "center", fontWeight: "600" }}
          >
            REPORT
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
            <LoadingRow />
            <LoadingRow />
            <LoadingRow />
          </Fragment>
        ) : (
          loopRow
        )}
      </Grid>
      {/* <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell >ID</StyledTableCell>
              <StyledTableCell >ORDER ID</StyledTableCell>
              <StyledTableCell >REPORT</StyledTableCell>
              <StyledTableCell >STATUS</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.listAllReport.map((item, key) => (
              <StyledTableRow key={key}>
                <StyledTableCell>{item.id}</StyledTableCell>
                <StyledTableCell >{item.order_id}</StyledTableCell>
                <StyledTableCell >{item.text}</StyledTableCell>
                <StyledTableCell className={classes.status} ><ClearIcon/> {item.status}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
    </Fragment>
  );
};

export default connect("listAllReport", actions)(withRouter(TableReport));
