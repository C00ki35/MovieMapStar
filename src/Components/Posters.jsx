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
            src={`https://www.pgcdigit.co.uk/movieappimages/${this.props.postergenre}.jpg`}
            width="80px"
            height="120px"
            onLoad={this.handleImageLoaded}
            onError={this.handleImageErrored}
            alt="Rambo Poster"
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