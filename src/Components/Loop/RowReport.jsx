import React, { Fragment } from 'react'
import { connect } from 'unistore/react'
import { actions } from '../../store/store'
import { withRouter } from 'react-router-dom'
import { makeStyles, Grid, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@material-ui/core'
import ButtonReport from './ButtonReport'
// ICONS

const useStyles = makeStyles(theme => ({
  status : {
    padding : '0.6em'
  },
  padding : {
    padding : '0.6em',
    fontWeight: '400'
  },
}));
function RowTable (props)  {
  const classes = useStyles();
  return (
    <Fragment>
        <Grid item xs={1} className={classes.status} style={{textAlign: "center"}} >
          {props.id}
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle2" className={classes.padding} style={{textAlign: "center", alignItems:"center"}}>
            {props.orderId}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography variant="subtitle2" className={classes.padding} style={{textAlign: "justify"}}>
            {props.report}
          </Typography>
      </Grid>
        <Grid item xs={3} className={classes.padding} style={{textAlign: "center"}}>
          <ButtonReport status={props.status} id={props.id} />
      </Grid>
    </Fragment>
  )
}

export default connect('isLoggedIn, listTransactions, userId, displayName', actions)(withRouter(RowTable))