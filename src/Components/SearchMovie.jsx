import React, { Component } from "react";
import {
  getMovieId,
  getMovieLocations,
  getMovieLocationsInfo,
} from "../Utils/movies";
import * as api from "../Utils/api";
import NewWrappedMap from "./NewMovieMap";
import { Button, TextField, Container, Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Loading from "./Loading";
import Posters from "./Posters";

const useStyles = (theme) => ({
  searchBox: {
    margin: theme.spacing(1),
    width: "40ch",
  },
  searchBar: {
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing(1),
  },
  movieInfo: {
    marginBottom: theme.spacing(1),
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f12b6a",
  },
  poster: {
    display: "flex",
    justifyContent: "center",
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
    profileSearch: false,
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

  searchByMovieId = (profileMovieId) => {
    getMovieLocations(profileMovieId)
      .then((addresses) => {
        return Promise.all(addresses.map((address) => api.getLatLng(address)))
          .then((coords) => {
            this.setState({
              coordinates: coords,
              isLoading: false,
              profileSearch: false,
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
  };

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ movieTitle: value });
  };

  setFilmInfo = (film) => {
    this.setState({ movieInformation: film });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.state.movieTitle.length) {
      this.setState({ fieldError: true });
    } else {
      this.setState({ isLoading: true, fieldError: false, error: false });

      getMovieId(this.state.movieTitle, this.setFilmInfo)
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

  componentDidMount() {
    if (this.props.match !== undefined) {
      let { filmId } = this.props.match.params;
      filmId = filmId.split("-")[1];

      this.searchByMovieId(filmId);
    }
  }

  render() {
    const { classes } = this.props;
    const API_KEY = process.env.REACT_APP_API_KEY;

    return (
      <Container component="main" maxWidth="xs">
        <Grid container className={classes.searchBar} xs={12}>
          <Typography variant="body2" color="text" align="center">
            <form onSubmit={this.handleSubmit} required={true}>
              <Grid item xs={12}>
                <TextField
                  id="movie-search"
                  className={classes.searchBox}
                  label="Search for a movie"
                  variant="outlined"
                  onChange={this.handleChange}
                  required={true}
                  error={this.state.fieldError}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  color="primary"
                  variant="contained"
                  id="movie-search"
                  onClick={this.handleSubmit}
                  fullWidth
                >
                  Find Film Locations
                </Button>
              </Grid>
            </form>
            {this.state.error && (
              <div>Houston, we have a problem. Please try again...</div>
            )}
          </Typography>
        </Grid>

        <div
          style={{
            width: "100%",
            height: "80vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {this.state.isLoading && !this.state.error ? (
            <div>
              <Loading />
            </div>
          ) : (
            <>
              {this.state.movieId && !this.state.error && (
                <Container
                  className={classes.movieInfo}
                  component="main"
                  maxWidth="xs"
                >
                  <Grid
                    item
                    xs={6}
                    style={{ display: "flex", flexWrap: "wrap" }}
                  >
                    <Typography color="secondary" component="h6" variant="h4">
                      {this.state.movieInformation.title}
                    </Typography>
                  </Grid>
                  <Grid className={classes.poster} item xs={6}>
                    <Posters
                      postergenre={this.state.movieInformation.image.url}
                    />
                  </Grid>
                </Container>
              )}
              <NewWrappedMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${API_KEY}`}
                loadingElement={<div style={{ height: "100%" }} />}
                containerElement={<div style={{ height: "100%" }} />}
                mapElement={<div style={{ height: "100%" }} />}
                coordinates={this.state.coordinates}
                movieInfo={this.state.movieInfo}
              />
            </>
          )}
        </div>
      </Container>
    );
  }
}

export default withStyles(useStyles)(SearchMovie);
