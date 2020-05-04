import React, { Component } from "react";
import "../index.css";
class ImageLoader extends Component {
  render() {
    return (
      <div className="lds-ripple-image">
        <div></div>
        <div></div>
      </div>
    );
  }
}

export default ImageLoader;
