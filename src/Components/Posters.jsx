import React, { Component } from "react";
import ImageLoader from "./ImageLoader";
import "../index.css";

class Posters extends Component {
  state = { imageStatus: true };

  handleImageLoaded = () => {
    this.setState({ imageStatus: false });
  };

  handleImageErrored = () => {
    this.setState({ imageStatus: "failed to load" });
  };

  render() {
    let loadingClass = "";
    {
      this.state.imageStatus
        ? (loadingClass = "loading")
        : (loadingClass = "loading-fadeOut");
    }

    return (
      <div className={"imagebox"}>
        <div className={"poster-image"}>
          <img
            src={this.props.postergenre}
            width="100px"
            height="140px"
            onLoad={this.handleImageLoaded}
            onError={this.handleImageErrored}
            alt={`this.props.postergenre ${this.props.postergenre}`}
          />
        </div>
        <div className={loadingClass}>
          {this.state.imageStatus && <ImageLoader />}
        </div>
      </div>
    );
  }
}
export default Posters;
