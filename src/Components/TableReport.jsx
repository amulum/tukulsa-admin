import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";
import { withRouter } from "react-router-dom";
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
    textAlign: "center",
    fontWeight: "500",
    fontSize: "1.4em",
    color: "#1b4144",
    fontFamily: "Cabin"
    // fontFamily: "Questrial",
    // fontFamily: "Oxygen",
  }
});

/**
 * Return TableReport Component show header and row data of report
 * 
 * @param {listAllReport} props list of object transactions that will use in row function loopRow for looping each data in list that will generate RowTransactions Component  
 * @param {handleChangeReport} props from page that will handle change table report component such as report status and 
 * @param {isLoading} props boolean state from global state for animation loading in page before component loaded
 */
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
        email={item.email}
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
        <Grid item xs={3}>
          <Typography variant="h6" className={classes.padding}>
            ORDER ID
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6" className={classes.padding}>
            EMAIL
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6" className={classes.padding}>
            KELUHAN
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h6" className={classes.padding}>
            STATUS
          </Typography>
        </Grid>
        {props.isLoading ? (
          <Fragment>
            <LoadingRow listLoading={[3, 3, 4, 2]} />
            <LoadingRow listLoading={[3, 3, 4, 2]} />
            <LoadingRow listLoading={[3, 3, 4, 2]} />
            <LoadingRow listLoading={[3, 3, 4, 2]} />
            <LoadingRow listLoading={[3, 3, 4, 2]} />
          </Fragment>
        ) : (
          loopRow
        )}
      </Grid>
    </Fragment>
  );
};

export default withRouter(TableReport);
