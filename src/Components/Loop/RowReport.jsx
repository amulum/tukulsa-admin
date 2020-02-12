import React, { Fragment, useState } from "react";
import { connect } from "unistore/react";
import { actions } from "../../store/store";
import { withRouter } from "react-router-dom";
import {
  makeStyles,
  Grid,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText
} from "@material-ui/core";
// ICONS

const useStyles = makeStyles(theme => ({
  status: {
    padding: "0.6em"
  },
  padding: {
    padding: "0.6em",
    fontWeight: "400"
  }
}));
let variantButton, colorButton;
function RowTable(props) {
  console.log('id',props.id)
  console.log('report',props.report)
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();
  const changeReport = props.handleChangeReport
  const changeButton = async (reportId) => {
    console.log('test changereport', changeReport)
    changeReport(reportId)
    setOpen(false)
  }
  console.log('propsdi rowtable',props)
  if (props.status === "BELUM DISELESAIKAN") {
    variantButton = "contained";
    colorButton = "secondary";
  } else {
    variantButton = "contained";
    colorButton = "disabled";
  }
  return (
    <Fragment>
      <Grid
        item
        xs={1}
        className={classes.status}
        style={{ textAlign: "center" }}
      >
        {props.id}
      </Grid>
      <Grid item xs={3}>
        <Typography
          variant="subtitle2"
          className={classes.padding}
          style={{ textAlign: "center", alignItems: "center" }}
        >
          {props.orderId}
        </Typography>
      </Grid>
      <Grid item xs={5}>
        <Typography
          variant="subtitle2"
          className={classes.padding}
          style={{ textAlign: "justify" }}
        >
          {props.report}
        </Typography>
      </Grid>
      <Grid
        item
        xs={3}
        className={classes.padding}
        style={{ textAlign: "center" }}
      >
        <Button
        variant={variantButton}
        color={colorButton}
        onClick={handleClickOpen}
      >
        <Typography variant="subtitle2">{props.status}</Typography>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Ubah status laporan menjadi Selesai?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Cek lagi laporan apakah benar sudah terselesaikan?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Tidak
          </Button>
          <Button
            onClick={(reportId)=>changeButton(props.id)}
            color="primary"
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
)(withRouter(RowTable));
