import React, { Component } from "react";

class Loading extends Component {
  render() {
    return (
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContents: "center",
            paddingTop: "px",
          }}
        >
          {" "}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div className="lds-roller">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div
            style={{
              paddingTop: "20px",
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              color: "#e76a4a",
            }}
          >
            Just fetching the locations.... <br /> I'll be back..
          </div>
        </div>
      </>
    );
  }
}

export default Loading;
