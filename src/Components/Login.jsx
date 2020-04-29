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
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(4),
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
    margin: theme.spacing(3, 8, 2),
  },
  submitbutton: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  account: {
    marginTop: theme.spacing(1),
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
    {
      console.log(process.env.REACT_APP_MYTOKEN);
    }
    return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <ErrorHandler formerrors={this.state.errors} />

          <img
            style={{ width: "150", height: "160px" }}
            src={require("./images/map.png")}
            alt="avatar"
          />
          <form
            className={classes.form}
            onSubmit={this.handleSubmit}
            noValidate
          >
            <Typography color="secondary" component="h6" variant="h2">
              Sign in ...
            </Typography>
            <TextField
              className={classes.root}
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
    );
  }
}

export default withStyles(useStyles)(Login);
