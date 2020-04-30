import React, { Component } from "react";
import SearchMovie from "./SearchMovie";

class Dashboard extends Component {
  componentDidMount() {
    this.props.auth.menuToggle(true);
  }
  render() {
    return (
      <>
        <SearchMovie />
      </>
    );
  }
}

export default Dashboard;
