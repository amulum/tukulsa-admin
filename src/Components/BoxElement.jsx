import React from 'react'
import { Paper, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  wrapper : {
    padding: '1em',
    marginBottom: '1em'
  }
}))
const BoxElement = (props) => {
  const classes = useStyles()
  return (
    <Paper elevation={1} className={classes.wrapper}>
      {props.value}
    </Paper>
  )
}

export default BoxElement