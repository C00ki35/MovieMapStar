import React, { Component } from "react";
import {
  getMovieId,
  getMovieLocations,
  getMovieLocationsInfo,
} from "../Utils/movies";
import * as api from "../Utils/api";
import NewWrappedMap from "./NewMovieMap";
//import { GAPI } from "../config.json";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import { withStyles } from "@material-ui/core/styles";

const useStyles = (theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(2),
  },
  searchBox: {
    margin: theme.spacing(1),
    width: "30ch",
  },
});

class SearchMovie extends Component {
  state = {
    movieTitle: "",
    coordinates: [],
    movieId: "",
    movieInfo: [],
    error: null,
    isLoading: false,
    fieldError: false,
  };

  handleClick = (event) => {
    getMovieLocationsInfo(this.state.movieId)
      .then((movieInfo) => {
        this.setState({ movieInfo });
      })
      .catch((error) => {
        this.setState({ error });
      });
  };

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ movieTitle: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.state.movieTitle.length) {
      this.setState({ fieldError: true });
    } else {
      this.setState({ isLoading: true, fieldError: false, error: false });

      getMovieId(this.state.movieTitle)
        .then((movieId) => {
          this.setState({ movieId });
          getMovieLocations(movieId)
            .then((addresses) => {
              return Promise.all(
                addresses.map((address) => api.getLatLng(address))
              )
                .then((coords) => {
                  this.setState({ coordinates: coords, isLoading: false });
                })
                .catch((error) => {
                  this.setState({ error }, () => {
                    console.log(this.state.error);
                  });
                });
            })
            .catch((error) => {
              this.setState({ error }, () => {
                console.log(this.state.error);
              });
            });
        })
        .catch((error) => {
          this.setState({ error }, () => {
            console.log(this.state.error);
          });
        });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <Typography variant="body2" color="text" align="center">
          <form onSubmit={this.handleSubmit} required={true}>
            <TextField
              id="movie-search"
              className={classes.searchBox}
              label="Search for a movie"
              variant="outlined"
              onChange={this.handleChange}
              required={true}
              error={this.state.fieldError}
            />

            <Button
              variant="contained"
              id="movie-search"
              onClick={this.handleSubmit}
            >
              Find
            </Button>
            {this.state.movieId && !this.state.error && (
              <Button
                color="secondary"
                variant="contained"
                id="movie-info"
                onClick={this.handleClick}
              >
                View Movie Info
              </Button>
            )}
          </form>{" "}
          {this.state.isLoading && !this.state.error && (
            <>Please wait while your film locations load</>
          )}
          {this.state.error && (
            <>Houston, we have a problem. Please try again...</>
          )}
        </Typography>

        <div
          style={{
            width: "100%",
            height: "80vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <NewWrappedMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${GAPI.key}`}
            loadingElement={<div style={{ height: "100%" }} />}
            containerElement={<div style={{ height: "100%" }} />}
            mapElement={<div style={{ height: "100%" }} />}
            coordinates={this.state.coordinates}
            movieInfo={this.state.movieInfo}
          />
        </div>
      </>
    );
  }
}

export default withStyles(useStyles)(SearchMovie);
