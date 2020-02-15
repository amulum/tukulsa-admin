import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Pagination } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2)
    },
    display: "flex",
    justifyContent: "flex-end"
  },
}));

export default function PaginationControlled(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(1);
  const handlePagination = props.handlePagination
  const handleChange = async (event, value) => {
    await setPage(value)
    await handlePagination(value)
    console.log('page di component', page)
    console.log('value di component', value)
  }

  return (
    <div className={classes.root}>
      <Pagination count={props.lengthPages} page={page} onChange={handleChange} />
    </div>
  );
}