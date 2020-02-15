import React, { Fragment } from 'react';
import { Snackbar, Slide, Fade, Grow } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}
function GrowTransition(props) {
  return <Grow {...props} />;
}
function FadeTransition(props) {
  return <Fade {...props} />;
}

export default function CustomSnackbar(props) {
  console.log('open di snack bar', props.open)
  console.log('props di snackbar', props)
  let transition = {
    slide: SlideTransition,
    grow: GrowTransition,
    fade: FadeTransition
  }
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
      <Snackbar 
      open={props.open} 
      autoHideDuration={3000} 
      onClose={props.handleClose}
      TransitionComponent={transition[`${props.transition}`]}
      >
        {listAlert[`${props.selectedSnack}`]}
      </Snackbar>
    </Fragment>
  );
}