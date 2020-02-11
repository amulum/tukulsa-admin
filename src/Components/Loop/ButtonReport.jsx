import React, { Fragment } from 'react'
import { connect } from 'unistore/react'
import { actions } from '../../store/store'
import { withRouter } from 'react-router-dom'
import { makeStyles, Grid, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@material-ui/core'
// ICONS

let variantButton, colorButton
function ButtonReport (props) {
  console.log('props button',props)
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChangeReport = () => {
    console.log(props)
    setOpen(false)
    props.handleChangeReport(props.id, "SELESAI")
    props.history.push('/report')
  }
  if (props.status === 'BELUM DISELESAIKAN') {
    variantButton = "contained"
    colorButton = "secondary"
  } else {
    variantButton = "contained"
    colorButton = "disabled"
  }
  return (
    <Fragment >
      <Button variant={variantButton} color={colorButton} onClick={handleClickOpen}>
        <Typography variant="subtitle2" >
          {props.status}
        </Typography>
      </Button>
      <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Ubah status laporan menjadi Selesai?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Cek lagi laporan apakah benar sudah terselesaikan?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Tidak
        </Button>
        <Button onClick={(props)=> handleChangeReport(props)} color="primary" autoFocus>
          Ya
        </Button>
      </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default connect('isLoggedIn, listTransactions, userId, displayName', actions)(withRouter(ButtonReport))