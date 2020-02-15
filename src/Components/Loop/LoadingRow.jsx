import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { Skeleton } from "@material-ui/lab";
import { Grid, makeStyles } from "@material-ui/core";

const LoadingRow = props => {
  const useStyles = makeStyles({
    cell: {
      display: "flex",
      justifyContent: "center"
    },
    skeleton: {
      width: "85%"
    }
  });
  const classes = useStyles();
  const loopLoadingRow = props.listLoading.map((item, key)=>{
    return (
      <Grid item xs={item} className={classes.cell}>
        <Skeleton animation="wave" height={70} className={classes.skeleton} />
      </Grid>
    )
  })
  return (
    <Fragment>
      {loopLoadingRow}
    </Fragment>
  );
};
export default withRouter(LoadingRow);
