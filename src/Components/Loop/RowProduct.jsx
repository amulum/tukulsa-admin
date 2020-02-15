import React, { Fragment, useState } from "react";
import { connect } from "unistore/react";
import { actions } from "../../store/store";
import { withRouter } from "react-router-dom";
import CreateIcon from '@material-ui/icons/Create';
import {
  makeStyles,
  Grid,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField
} from "@material-ui/core";
// ICONS

const useStyles = makeStyles(theme => ({
  status: {
    padding: "0.4em"
  },
  padding: {
    padding: "0.4em",
    fontWeight: "500",
    color: "#1b4144",
    // fontFamily: "Cabin",
    // fontFamily: "Questrial",
    fontFamily: "Oxygen",
    letterSpacing: "1px",
    fontSize: "1.1em"
  }
}));
function RowProduct(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false)
  const [price, newPrice] = useState(0)
  const [isDisabled, setDisabled] = useState(false)
  const handleSetPrice = async (event, oldPrice) => {
    console.log('price : ',price)
    console.log('oldprice : ',oldPrice)
    newPrice(event.target.value)
    let  diffPrice = await Math.abs(event.target.value - oldPrice)
    if (diffPrice > 500) {
      console.log('masuk if')
      setDisabled(true)
    } else {
      console.log('masuk else')
      setDisabled(false)
    }
    console.log('price update di change', price)
  }
  const handleClickOpen = async (price) => {
    console.log('price di handle open', price)
    await setOpen(true);
    await newPrice(price)
  };
  const handleClose = () => {
    setOpen(false);
  };
  const changePrice = props.handleChangePrice
  const changeButton = async (productId) => {
    console.log('price di submit',price)
    console.log('product id di submit', productId)
    await changePrice(productId, price)
    await setOpen(false)
  }
  console.log('props key', props)
  return (
    <Fragment>
      <Grid item xs={1}>
        <Typography
          variant="h6"
          className={classes.padding}
          style={{ textAlign: "center", alignItems: "center" }}
        >
          {props.no+1}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography
          variant="h6"
          className={classes.padding}
          style={{ textAlign: "center", alignItems: "center" }}
        >
          {props.operator}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography
          variant="h6"
          className={classes.padding}
          style={{ textAlign: "center", alignItems: "center" }}
        >
          {props.code}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography
          variant="h6"
          className={classes.padding}
          style={{ textAlign: "center", alignItems: "center" }}
        >
          {props.nominal}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography
          variant="h6"
          className={classes.padding}
          style={{ textAlign: "center", alignItems: "center" }}
        >
          {props.valid}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography
          variant="h6"
          className={classes.padding}
          style={{ textAlign: "center", alignItems: "center" }}
        >
          Rp {props.price.toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={(price)=>handleClickOpen(props.price)}
            color="inherit"
        >
          <CreateIcon />
        </IconButton>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"

        >
          <DialogTitle id="alert-dialog-title">
            Ubah Harga
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {props.operator} nominal {props.nominal}
            </DialogContentText>
              <TextField
              autoFocus
              margin="dense"
              id="harga"
              label="Harga Baru"
              type="number"
              onChange={(event, oldPrice)=>handleSetPrice(event, props.price)}
              value={price}
              fullWidth
              />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Tidak
            </Button>
            <Button
              onClick={(productId)=>changeButton(props.id)}
              color="primary"
              disabled={isDisabled}
              autoFocus
            >
              Ya
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Fragment>
  );
}

export default connect(
  "isLoggedIn, listTransactions, userId, displayName",
  actions
)(withRouter(RowProduct));
