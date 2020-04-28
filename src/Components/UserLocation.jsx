import React, { Component } from "react";
import { Marker } from "react-google-maps";
import RouteCalculator from "./RouteCalculator";

class UserLocation extends Component {
  constructor(props) {
    super(props);
    this.state = { lat: 0, lng: 0 };
    this.getCoords = this.getCoords.bind(this);
  }

  getCoords(position) {
    this.setState({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getCoords);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
    }
  }

  render() {
    return (
      <div>
        {
          <Marker
            position={this.state}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            }}
          />
        }
        <RouteCalculator
          userLocation={this.state}
          movieLocations={this.props.coordinates}
          destination={this.props.destination}
          stops={this.props.stops}
          movieInfo={this.props.movieInfo}
        />
      </div>
    );
  }
}

export default UserLocation;
