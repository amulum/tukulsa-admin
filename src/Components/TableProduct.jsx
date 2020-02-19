import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import LoadingRow from "./Loop/LoadingRow";
import RowProduct from "./Loop/RowProduct";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../store/store";

const useStyles = makeStyles({
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
 * Return TableProduct Component show header and row data of product
 * 
 * @param {listAllProduct} props list of object product that will use in row function loopRow for looping each data in list that will generate RowProduct Component  
 * @param {handleChangePrice} props from page that will handle change table product for spesific products price 
 * @param {isLoading} props boolean state from global state for animation loading in page before component loaded
 */
const TableProduct = props => {
  const classes = useStyles();
  const loopRow = props.listAllProduct.map((item, key) => {
    // console.log("key", key);
    return (
      <RowProduct
        no={key}
        id={item.id}
        operator={item.operator}
        code={item.code}
        nominal={item.nominal}
        price={item.price}
        valid={item.valid_to}
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
          <Typography variant="h6" className={classes.padding}>
            NO
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h6" className={classes.padding}>
            OPERATOR
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h6" className={classes.padding}>
            CODE
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h6" className={classes.padding}>
            NOMINAL
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h6" className={classes.padding}>
            MASA AKTIF
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h6" className={classes.padding}>
            HARGA
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography variant="h6" className={classes.padding}>
            &nbsp;
          </Typography>
        </Grid>
        {props.isLoading ? (
          <Fragment>
            <LoadingRow listLoading={[1, 2, 2, 2, 2, 2, 1]} />
            <LoadingRow listLoading={[1, 2, 2, 2, 2, 2, 1]} />
            <LoadingRow listLoading={[1, 2, 2, 2, 2, 2, 1]} />
            <LoadingRow listLoading={[1, 2, 2, 2, 2, 2, 1]} />
            <LoadingRow listLoading={[1, 2, 2, 2, 2, 2, 1]} />
          </Fragment>
        ) : (
          loopRow
        )}
      </Grid>
    </Fragment>
  );
};

export default connect("", actions)(withRouter(TableProduct));
