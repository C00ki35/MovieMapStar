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
      <div style={{ backgroundColor: "#041B15", width: "100%", height: "30%" }}>
        <Container component="main" maxWidth="xs">
          <Grid container xs={12}>
            <Grid
              item
              xs={2}
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
              <div>
                <img
                  style={{
                    borderRadius: "55px",
                    width: "30px",
                    height: "30px",
                  }}
                  src={require("./images/map.png")}
                  alt="Map"
                />
              </div>
              <div>
                <img
                  style={{
                    borderRadius: "55px",
                    height: "30px",
                  }}
                  src={require("./images/mapstar.png")}
                  alt="Logo"
                />
              </div>
            </Grid>
            <Grid
              item
              xs={2}
              style={{
                textAlign: "center",
                paddingTop: "15px",
              }}
            >
              <span class="material-icons md-light  md-36">account_circle</span>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            {this.state.isVisible && this.props.children}
          </Grid>
        </Container>
      </div>
    );
  }
}

export default ViewToggler;
