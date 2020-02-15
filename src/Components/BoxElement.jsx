import React from "react";
import { Paper, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  wrapper: {
    padding: "1em",
    marginBottom: "1em",
    marginTop: "1em",
    borderRadius: "20px",
    border: "1.5px solid #306854",
    boxShadow: "1px 0px 6px 3px rgba(224,234,236,0.74)"
  }
}));
const BoxElement = props => {
  const classes = useStyles();
  return (
    <Paper elevation={2} className={classes.wrapper}>
      {props.value}
    </Paper>
  );
};

export default BoxElement;
