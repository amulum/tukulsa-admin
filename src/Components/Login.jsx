import React from "react";
import Button from "@material-ui/core/Button";
import {
  CssBaseline,
  TextField,
  Container,
  Box,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter, Link } from "react-router-dom";
import "../App.css";
import { connect } from "unistore/react";
import { actions } from "../store/store";

function Copyright() {
  return (
    <Typography variant="subtitle1" align="center" style={{fontFamily: "Oxygen"}}>
      {"Copyright © "}
      <Link color="inherit" href="https://admin.tukulsa.site/">
        tukulsa.site
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    fontFamily: "Cabin",
    fontWeight: "600",
    fontSize: "1.4em"
  },
  admin: {
    color: "#2d6656",
    fontFamily: "antipasto_prodemibold"
  }
}));

function Login(props) {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img src={require("../images/tukulsalogo-bg-none.png")} alt="" />
        <form
          className={classes.form}
          onSubmit={event => props.handleSubmit(event)}
        >
          <TextField
            variant="outlined"
            margin="normal"
            color="secondary"
            required
            fullWidth
            name="security"
            label="SECURITY CODE"
            type="password"
            id="security"
            style={{fontFamily: "Cabin", fontWeight: "500"}}
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

export default connect("isLoggedIn", actions)(withRouter(Login));
