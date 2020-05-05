import React from "react";
import { Auth } from "aws-amplify";
import ErrorHandler from "./ErrorHandler";

import "typeface-roboto";
import {
  Button,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
  CssBaseline,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const useStyles = (theme) => ({
  appBg: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(0.25turn, #f12b6a, #f2a041)",
    height: "200px",
  },
  form: {
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 8, 2),
  },
  submitbutton: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  account: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    backgroundColor: "white",
  },
});

class Login extends React.Component {
  state = {
    username: "",
    password: "",
    errors: {
      cognito: null,
    },
  };

  clearErrorState = () => {
    this.setState({
      errors: {
        cognito: null,
      },
    });
  };

  handleChange = (event) => {
    const key = event.target.name;
    const info = event.target.value;
    this.setState({ [key]: info });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.clearErrorState();
    try {
      const user = await Auth.signIn(this.state.username, this.state.password);
      this.props.auth.setAuthenticated(true);
      this.props.auth.userInfo(user);
      this.props.history.push("/profile");
    } catch (error) {
      let err = null;
      !error.message ? (err = { message: error }) : (err = error);
      this.setState({
        errors: {
          ...this.state.errors,
          cognito: err,
        },
      });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <main>
        <div className={classes.appBg}>
          <img
            src={require("./images/mapstar.png")}
            width="200px"
            alt="Mapstar logo"
          />
        </div>

        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div>
            <ErrorHandler formerrors={this.state.errors} />

            <form
              className={classes.form}
              onSubmit={this.handleSubmit}
              noValidate
            >
              <Typography color="primary" component="h6" variant="h2">
                Sign in ...
              </Typography>
              <TextField
                InputProps={{
                  className: classes.input,
                }}
                variant="outlined"
                margin="normal"
                name="username"
                required
                value={this.state.username}
                onChange={this.handleChange}
                fullWidth
                id="username"
                label="Username"
                autoComplete="email"
                autoFocus
              />

              <TextField
                variant="outlined"
                InputProps={{
                  className: classes.input,
                }}
                margin="normal"
                required
                fullWidth
                value={this.state.password}
                onChange={this.handleChange}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Grid item className={classes.submitbutton}>
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  type="submit"
                >
                  Login
                </Button>
              </Grid>
              <Grid item className={classes.account}>
                <Link href="/profile/genres" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </form>
          </div>
        </Container>
      </main>
    );
  }
}

export default withStyles(useStyles)(Login);
