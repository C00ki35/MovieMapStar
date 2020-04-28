import React, { Component } from "react";
import { Auth } from "aws-amplify";
import "typeface-roboto";
import { Button, TextField, Grid, Container } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
  verfiyBox: {
    display: "flex",
    justifyContent: "center",
  },
});

class Verify extends Component {
  state = {
    verifyNumber: "",
  };

  handleClick = (event) => {
    Auth.confirmSignUp(this.props.auth.username, this.state.verifyNumber)
      .then((data) => {
        this.props.history.push("/");
      })

      .catch((error) => {
        console.log(error);
      });
  };

  handleChange = (event) => {
    const key = event.target.name;
    const info = event.target.value;
    this.setState({ [key]: info });
  };

  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <Grid container className={classes.verfiyBox} xs={12}>
          <Grid item xs={12}>
            <h1>Welcome!</h1>
            <p>You have successfully registered a new account.</p>
            <p>
              We've sent you an email. Please check the verification code and
              enter below
            </p>
          </Grid>
          <Grid item xs={6}>
            <label>Enter Verify Code:</label>
            <TextField
              className={classes.root}
              InputProps={{
                className: classes.input,
              }}
              variant="outlined"
              margin="normal"
              name="verifyNumber"
              required
              value={this.state.verifyNumber}
              onChange={this.handleChange}
              fullWidth
              label="verification number"
              autoFocus
            />
          </Grid>
          <Button
            className={classes.submitButton}
            variant="contained"
            onClick={this.handleClick}
            fullWidth
            color="primary"
            type="submit"
          >
            Login
          </Button>
        </Grid>
      </Container>
    );
  }
}

export default withStyles(useStyles)(Verify);
