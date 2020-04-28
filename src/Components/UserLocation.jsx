import React, { Component } from 'react';
import { Marker } from 'react-google-maps';
import RouteCalculator from './RouteCalculator';

class UserLocation extends Component {
  constructor(props) {
    super(props);
    this.state = { lat: 0, lng: 0 };
    this.getCoords = this.getCoords.bind(this);
    // this.watchPos = this.watchPos.bind(this);
  }

  getCoords(position) {
    // console.log(position.coords.latitude);
    this.setState(
      {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
      // () => {
      //   console.log(this.state);
      //}
    );
  }

  // In order to track user location, change initial user location manually?
  // what we get from getCoords
  // {lat: 53.802705599999996, lng: -1.5648755}
  // a slightly close location, to mimic movement (Hanover Square)
  // {lat: 53.801863, lng: -1.559748}

  componentDidMount() {
    // console.log(">>>>", this.props);
    // Check if geolocation is avaliable - allow or block location
    // if ("geolocation" in navigator) {
    //   console.log("Available");
    // } else {
    //   console.log("Not Available");
    // }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getCoords);
    }

    // navigator.geolocation.watchPosition(this.watchPos);
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      // console.log("are the props changing?", this.props);
    }
  }

  render() {
    return (
      <div>
        {
          <Marker
            position={this.state}
            icon={{
              url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
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
