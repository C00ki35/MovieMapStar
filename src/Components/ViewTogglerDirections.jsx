import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

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
          id="movie-directions-search"
          onClick={this.handleClick}
        >
          {this.state.isVisible
            ? 'Hide text directions'
            : 'Show text directions'}
        </Button>
        {this.state.isVisible && this.props.children}
      </>
    );
  }
}

export default ViewTogglerDirections;
