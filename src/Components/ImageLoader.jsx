import React, { Component } from "react";
import "../index.css";
class ImageLoader extends Component {
  render() {
    return (
      <div class="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
}

export default ImageLoader;
