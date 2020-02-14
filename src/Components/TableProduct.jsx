import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography
} from "@material-ui/core";
import LoadingRow from "./Loop/LoadingRow"
import RowProduct from "./Loop/RowProduct"
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../store/store";

const useStyles = makeStyles({
  padding: {
    padding: "0.4em",
    borderBottom: "2px solid #306854",
    marginBottom: "0.4em"
  }
});

const TableProduct = props => {
  const classes = useStyles();
  const loopRow = props.listAllProduct.map((item, key) => {
    return (
      <RowProduct
        key={key}
        id={item.id}
        operator={item.operator}
        code={item.code}
        nominal={item.nominal}
        price={item.price}
        valid= {item.valid_to}
        handleChangePrice={props.handleChangePrice}
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
        <Grid item xs={1}>
          <Typography
            variant="subtitle1"
            className={classes.padding}
            style={{ textAlign: "center", fontWeight: "600" }}
          >
            NO
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography
            variant="subtitle1"
            className={classes.padding}
            style={{ textAlign: "center", fontWeight: "600" }}
          >
            OPERATOR
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography
            variant="subtitle1"
            className={classes.padding}
            style={{ textAlign: "center", fontWeight: "600" }}
          >
            CODE
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography
            variant="subtitle1"
            className={classes.padding}
            style={{ textAlign: "center", fontWeight: "600" }}
          >
            NOMINAL
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography
            variant="subtitle1"
            className={classes.padding}
            style={{ textAlign: "center", fontWeight: "600" }}
          >
            MASA AKTIF
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography
            variant="subtitle1"
            className={classes.padding}
            style={{ textAlign: "center", fontWeight: "600" }}
          >
            HARGA
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography
            variant="subtitle1"
            className={classes.padding}
            style={{ textAlign: "center", fontWeight: "600" }}
          >
            &nbsp;
          </Typography>
        </Grid>
        {props.isLoading ? (
          <Fragment>
            <LoadingRow listLoading={[1,2,2,2,2,2,1]} />
            <LoadingRow listLoading={[1,2,2,2,2,2,1]} />
            <LoadingRow listLoading={[1,2,2,2,2,2,1]} />
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
)(withRouter(TableProduct));
