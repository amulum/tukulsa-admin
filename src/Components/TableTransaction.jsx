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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

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
              <StyledTableCell >OPERATOR</StyledTableCell>
              <StyledTableCell >STATUS PEMBAYARAN</StyledTableCell>
              <StyledTableCell >STATUS ORDER</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.listAllTransactions.map((item, key) => (
              <StyledTableRow key={key}>
                <StyledTableCell>{item.id}</StyledTableCell>
                <StyledTableCell >{item.order_id}</StyledTableCell>
                <StyledTableCell >{item.operator}</StyledTableCell>
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