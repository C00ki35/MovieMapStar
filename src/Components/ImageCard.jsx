import React, { Component } from "react";
import ErrorHandler from "./ErrorHandler";
import aws from "aws-sdk";
import { SRLWrapper } from "simple-react-lightbox";

class ImageCard extends Component {
  state = {
    isLoading: true,
    img: "",
    error: null,
  };

  getImage = () => {
    const s3 = new aws.S3();
    const params = {
      Bucket: process.env.REACT_APP_aws_bucketname,
      Key: this.props.imageKey,
    };

    s3.getObject(params)
      .promise()
      .then((response) => {
        this.setState({ isLoading: false, img: response.Body.toString() });
      })
      .catch((error) => {
        const message =
          "We have not being able to load your image, please go back to your profile and try again";
        this.setState({
          error: { message },
        });
      });
  };

  componentDidMount() {
    this.getImage();
  }

  render() {
    if (this.state.isLoading) return "Loading ....";
    const image = new Image();
    image.src = this.state.img;
    if (!this.state.isLoading) {
      return (
        <div>
          <ErrorHandler apierrors={this.state.error} />
          <div
            style={{
              backgroundColor: "#E7E5DF",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            <SRLWrapper style={{ borderRadius: "10px" }}>
              <img
                src={`${image.src}`}
                style={{ width: "100%" }}
                alt="userPhoto"
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: "4px",
                }}
              >
                <span class="material-icons">thumb_up_alt</span>
                <span class="material-icons">share</span>
              </div>
            </SRLWrapper>
          </div>
        </div>
      );
    }
  }
}

export default ImageCard;
