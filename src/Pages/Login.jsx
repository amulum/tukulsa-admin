import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { withRouter, Redirect } from 'react-router-dom';
import '../App.css'
import { connect } from 'unistore/react';
import { actions, store } from '../store/store'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        tukulsa.site
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  admin : {
    color: '#2d6656',
    fontFamily: 'antipasto_prodemibold'
  }
}));


function Login(props) {
  const classes = useStyles();
  const handleSubmitForm = async (event) => {
    event.preventDefault();
    console.log(event.target.security.value)
    let security = event.target.security.value
    console.log('summary', props)
    await props.handleLogin(security)
    await props.history.replace('/dashboard')
  }
  if (localStorage.getItem('token')) {
    return (
      <Redirect to="/dashboard"/>
    )
  } else {
      return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <img src={require("../images/tukulsalogo-bg-none.png")} alt=""/>
            <form className={classes.form} onSubmit={handleSubmitForm}>
              <TextField
                variant="outlined"
                margin="normal"
                color="secondary"
                required
                fullWidth
                name="security"
                label="Security Code"
                type="password"
                id="security"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
              >
                Sign In as admin
              </Button>
            </form>
          </div>
          <Box mt={2}>
            <Copyright />
          </Box>
        </Container>
      );
    }
  }

export default connect('isLoggedIn', actions) (withRouter(Login))