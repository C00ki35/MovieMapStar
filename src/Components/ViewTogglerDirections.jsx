import React, { Component } from "react";
import Button from "@material-ui/core/Button";

class ViewTogglerDirections extends Component {
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
          variant="contained"
          color="primary"
          fullwidth="true"
          id="movie-directions-search"
          onClick={this.handleClick}
        >
          {this.state.isVisible
            ? "Hide text directions"
            : "Show text directions"}
        </Button>
        {console.log(this.props.children)}
        {this.state.isVisible && this.props.children}
      </>
    );
  }
}

export default ViewTogglerDirections;
