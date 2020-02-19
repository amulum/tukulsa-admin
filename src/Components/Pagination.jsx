import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Pagination } from "@material-ui/lab";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2)
    },
    display: "flex",
    justifyContent: "flex-end"
  }
}));


/**
 * Return Component Pagination with circle style 
 * @param {handlePagination} props function that set state in page for handle selected page
 * @param {lengthPages} props number variable describe length of pagination will show in page
 */
export default function PaginationControlled(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(1);
  const handlePagination = props.handlePagination;
  const handleChange = async (event, value) => {
    await setPage(value);
    await handlePagination(value);
  };

  return (
    <div className={classes.root}>
      <Pagination
        count={props.lengthPages}
        page={page}
        onChange={handleChange}
      />
    </div>
  );
}
