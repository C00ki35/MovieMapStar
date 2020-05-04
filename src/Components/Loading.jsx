import React, { Component } from "react";

class Loading extends Component {
  render() {
    return (
      <>
        <div
          style={{
            backgroundColor: "red",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContents: "center",
          }}
        >
          {" "}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div className="lds-ripple">
              <div></div>
              <div></div>
            </div>
          </div>
          <div
            style={{
              paddingTop: "20px",
              display: "flex",
              justifyContent: "center",
              color: "white",
            }}
          >
            Just fetching data. I'll be back..
          </div>
        </div>
      </>
    );
  }
}

export default Loading;
