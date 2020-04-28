import React, { Component } from "react";

class Home extends Component {
  render() {
    return (
      <div>
        {this.props.auth.isAuthenticated && this.props.auth.user && (
          <p>Hello {this.props.auth.user.username}</p>
        )}
      </div>
    );
  }
}

export default Home;
