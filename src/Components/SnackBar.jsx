import React, { Fragment } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

export default function CustomSnackbar(props) {
  console.log('open di snack bar', props.open)
  console.log('props di snackbar', props)
  let listAlert = {
    error:
      <MuiAlert elevation={10} style={{alignItems: "center", textAlign: "center"}} variant="filled" onClose={props.handleClose} severity="error">
        {props.messageSnack}
      </MuiAlert>,
    warning: 
      <MuiAlert elevation={10} style={{alignItems: "center", textAlign: "center"}} variant="filled" onClose={props.handleClose} severity="warning">
        {props.messageSnack}
      </MuiAlert>,
    info: 
      <MuiAlert elevation={10} style={{alignItems: "center", textAlign: "center"}} variant="filled" onClose={props.handleClose} severity="info">
        {props.messageSnack}
      </MuiAlert>,
    success: 
      <MuiAlert elevation={10} style={{alignItems: "center", textAlign: "center"}} variant="filled" onClose={props.handleClose} severity="success">
        {props.messageSnack}
      </MuiAlert>,
  }
  return (
    <Fragment>
      <Snackbar open={props.open} autoHideDuration={3000} onClose={props.handleClose}>
      {listAlert[`${props.selectedSnack}`]}
      </Snackbar>
    </Fragment>
  );
}