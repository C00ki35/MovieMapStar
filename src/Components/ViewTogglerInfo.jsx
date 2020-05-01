import React, { Component } from "react";
import Button from "@material-ui/core/Button";

class ViewTogglerInfo extends Component {
  state = { isVisible: true };

  handleClick = (event) => {
    this.setState((currentState) => {
      return { isVisible: !currentState.isVisible };
    });
  };
  render() {
    return (
      <>
        <Button
          fullwidth
          color="primary"
          variant="contained"
          id="movie-info-search"
          onClick={this.handleClick}
        >
          {this.state.isVisible ? "Show movie info" : "Hide movie info"}
        </Button>
        {this.state.isVisible && this.props.children}
      </>
    );
  }
}

export default ViewTogglerInfo;
