import React from "react";
import { Auth } from "aws-amplify";
import axios from "axios";
import config from "../config.json";
import ErrorHandler from "./ErrorHandler";

import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  submitButton: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    backgroundColor: "white",
  },
});

class Register extends React.Component {
  state = {
    username: "",
    name: "",
    password: "",
    email: "",
    errors: {
      cognito: null,
      passwordmatch: false,
    },
  };

  clearErrorState = () => {
    this.setState({
      errors: {
        cognito: null,

        passwordmatch: false,
      },
    });
  };
  handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    this.setState({ [key]: value });
  };

  addUser = async (username, email, name, genre1, genre2, genre3) => {
    const id = Math.floor(Math.random() * 10000000000).toString();
    try {
      const params = {
        id: id,
        name: name,
        username: username.toLowerCase(),
        email: email,
        genre1: genre1,
        genre2: genre2,
        genre3: genre3,
      };
      await axios.post(`${config.api.invokeURL}/user`, params);
      this.props.auth.verifyUsername(username);
    } catch (error) {
      let err = null;
      console.dir(error);
      !error.message ? (err = { message: error }) : (err = error);
      this.setState({
        error: {
          ...this.state.errors,
          cognito: err,
        },
      });
    }
  };

  addProfile = async (username) => {
    const profile_id = Math.floor(Math.random() * 10000).toString();

    try {
      const params = {
        profile_id: profile_id,
        username: username,
      };
      await axios.post(`${config.api.invokeURL}/profile/`, params);
    } catch (error) {
      let err = null;
      console.dir(error);
      !error.message ? (err = { message: error }) : (err = error);
      this.setState({
        error: {
          ...this.state.errors,
          cognito: err,
        },
      });
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.clearErrorState();
    const { username, email, password, name } = this.state;

    const genre1 = this.props.auth.genres[0];
    const genre2 = this.props.auth.genres[1];
    const genre3 = this.props.auth.genres[2];
    try {
      await Auth.signUp({
        username,
        password,
        name,
        attributes: {
          email: email,
        },
      }).then((data) => {
        this.addUser(username, email, name, genre1, genre2, genre3);
        this.props.history.push("/verify");
      });
    } catch (error) {
      let err = null;
      !error.message ? (err = { message: error }) : (err = error);
      this.setState({
        error: {
          ...this.state.errors,
          cognito: err,
        },
      });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <ErrorHandler formerrors={this.state.errors} />

          <Typography color="secondary" component="h6" variant="h2">
            Sign up ...
          </Typography>
          <form onSubmit={this.handleSubmit} className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  InputProps={{
                    className: classes.input,
                  }}
                  autoComplete="username"
                  name="username"
                  variant="outlined"
                  value={this.state.username}
                  onChange={this.handleChange}
                  required
                  fullWidth
                  id="username"
                  label="username"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  InputProps={{
                    className: classes.input,
                  }}
                  value={this.state.email}
                  onChange={this.handleChange}
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="email"
                  type="email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  InputProps={{
                    className: classes.input,
                  }}
                  value={this.state.password}
                  onChange={this.handleChange}
                  variant="outlined"
                  required
                  fullWidth
                  id="password"
                  type="password"
                  label="password"
                  name="password"
                  autoComplete="password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  InputProps={{
                    className: classes.input,
                  }}
                  value={this.state.name}
                  onChange={this.handleChange}
                  variant="outlined"
                  required
                  fullWidth
                  name="name"
                  label="your name"
                  type="name"
                  id="name"
                  autoComplete="your name"
                />
              </Grid>
              <Grid className={classes.submitButton} item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Next
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

export default withStyles(useStyles)(Register);
