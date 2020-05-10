import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { BrowserRouter as useHistory } from "react-router-dom";
import "typeface-roboto";
import { Link, Container, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(1),
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
  root: {
    color: "white",
  },
  input: {
    color: "white",
  },
  menugrid: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: "1.2em",
    lineHeight: "1.5em",
  },
});

class Navbar extends Component {
  handleLogOut = async (event) => {
    const history = useHistory();
    event.preventDefault();
    try {
      Auth.signOut();
      this.props.auth.setAuthenticated(false);
      this.props.auth.userInfo(null);

      history.push("/");
    } catch (error) {}
  };

  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Grid className={classes.menugrid} item xs={12}>
            <Link
              color="secondary"
              style={{ textDecoration: "none" }}
              variant="button"
              href="/maps"
            >
              MAP
            </Link>

            <Link
              color="secondary"
              style={{ textDecoration: "none" }}
              variant="button"
              href="/userCamera"
            >
              CAMERA
            </Link>
            <Link
              color="secondary"
              style={{ textDecoration: "none" }}
              variant="button"
              href="/gallery"
            >
              GALLERY
            </Link>
            <Link
              color="secondary"
              style={{ textDecoration: "none" }}
              variant="button"
              href="/profile"
            >
              PROFILE
            </Link>
            <Link
              color="secondary"
              variant="button"
              href="/"
              onClick={this.handleLogOut}
            >
              Log Out
            </Link>
          </Grid>
        </div>
      </Container>
    );
  }
}
export default withStyles(useStyles)(Navbar);
