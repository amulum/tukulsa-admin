import React, { Fragment } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions } from "../store/store";


const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#cde5ee',
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    width: '100%',
  },
});

const TableTransaction = (props) => {
  const classes = useStyles();

  return (
    <Fragment>
      <Typography>
        Transactions
      </Typography>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell >ID</StyledTableCell>
              <StyledTableCell >ORDER ID</StyledTableCell>
              <StyledTableCell >NOMOR</StyledTableCell>
              <StyledTableCell >PEMBAYARAN</StyledTableCell>
              <StyledTableCell >ORDER</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.listAllTransactions.map((item, key) => (
              <StyledTableRow key={key}>
                <StyledTableCell>{item.id}</StyledTableCell>
                <StyledTableCell >{item.order_id}</StyledTableCell>
                <StyledTableCell >{item.phone_number}</StyledTableCell>
                <StyledTableCell >{item.payment_status}</StyledTableCell>
                <StyledTableCell >{item.order_status}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
}

export default connect('listAllTransactions', actions) (withRouter(TableTransaction))