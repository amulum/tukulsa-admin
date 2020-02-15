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
    padding: "0.4em"
  },
  padding: {
    padding: "0.4em",
    fontWeight: "500",
    textAlign: "center", 
    alignItems: "center",
    color: "#1b4144",
    // fontFamily: "Cabin",
    // fontFamily: "Questrial",
    fontFamily: "Oxygen",
    letterSpacing: "1px",
    fontSize: "1.1em"
  }
}));
let variantButton, colorButton;
function RowTable(props) {
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
    changeReport(reportId)
    setOpen(false)
  }
  if (props.status === "BELUM DISELESAIKAN") {
    variantButton = "contained";
    colorButton = "secondary";
  } else {
    variantButton = "disabled";
    colorButton = "secondary";
  }
  return (
    <Fragment>
      <Grid item xs={3}>
        <Typography
          variant="h6"
          className={classes.padding}
        >
          {props.orderId}
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography
          variant="h6"
          className={classes.padding}
          style={{wordWrap:"break-word"}}
        >
          {props.email}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography
          variant="h6"
          className={classes.padding}
          style={{ textAlign: "justify" }}
        >
          {props.report}
        </Typography>
      </Grid>
      <Grid
        item
        xs={2}
        className={classes.padding}
        style={{ textAlign: "center" }}
      >
        <Button
        variant={variantButton}
        color={colorButton}
        onClick={handleClickOpen}
      >
        <Typography variant="body1" style={{fontFamily: "Cabin", fontWeight: "700"}}>{props.status}</Typography>
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
