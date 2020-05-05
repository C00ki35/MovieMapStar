import React, { Component } from "react";
import { Button, Container, Grid } from "@material-ui/core";
import MenuOutlinedIcon from "@material-ui/icons/MenuOutlined";
import CloseIcon from "@material-ui/icons/Close";
import "../index.css";
class ViewToggler extends Component {
  state = { isVisible: false };

  handleClick = (event) => {
    this.setState((currentState) => {
      return { isVisible: !currentState.isVisible };
    });
  };

  render() {
    return (
      <div
        style={{
          background: "linear-gradient(0.25turn, #f12b6a, #f2a041)",
          width: "100%",
          height: "30%",
        }}
      >
        <Container component="main" maxWidth="md">
          <Grid container xs={12} sm={12} md={12}>
            <Grid
              item
              xs={2}
              sm={2}
              md={2}
              style={{
                display: "flex",
              }}
            >
              <Button onClick={this.handleClick}>
                {this.state.isVisible ? (
                  <CloseIcon fontSize="large" color="secondary" />
                ) : (
                  <MenuOutlinedIcon color="secondary" fontSize="large" />
                )}
              </Button>
            </Grid>
            <Grid
              item
              xs={8}
              sm={8}
              md={8}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                color: "white",
                width: "50px",
                height: "80px",
                alignItems: "center",
              }}
            >
              <img src={require("./images/mapstar.png")} width="150px" />
            </Grid>
            <Grid
              item
              xs={2}
              sm={2}
              md={2}
              style={{
                textAlign: "center",
                paddingTop: "20px",
              }}
            >
              <span class="material-icons md-light  md-36">account_circle</span>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            {this.state.isVisible && this.props.children}
          </Grid>
        </Container>
      </div>
    );
  }
}

export default ViewToggler;
