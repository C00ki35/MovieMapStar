import React, { Component } from "react";
import {
  Grid,
  Container,
  Typography,
  Divider,
  Button,
} from "@material-ui/core";
import Loading from "./Loading";
import Posters from "./Posters";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

class MovieInfo extends Component {
  state = { movieInfo: "", movieInfoLoading: true };
  getMovieInfo = () => {
    const filmIds = [
      "tt0073195",
      "tt8079248",
      "tt0088763",
      "tt4154756",
      "tt7131622",
      "tt8946378",
      "tt7286456",
      "tt8772262",
      "tt1950186",
      "tt3794354",
      "tt0468569",
      "tt1375666",
      "tt0077651",
      "tt1206885",
      "tt8936646",
      "tt0089218",
      "tt7349950",
    ];

    const filmToShow = Math.floor(Math.random() * filmIds.length);
    return fetch(
      `https://imdb8.p.rapidapi.com/title/get-overview-details?currentCountry=GB&tconst=${filmIds[filmToShow]}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "imdb8.p.rapidapi.com",
          "x-rapidapi-key": process.env.REACT_APP_rapi,
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        this.setState({ movieInfo: response, movieInfoLoading: false });
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  };

  componentDidMount() {
    this.getMovieInfo();
  }
  render() {
    return (
      <>
        {this.state.movieInfoLoading ? (
          <Loading />
        ) : (
          <Container component="main" maxWidth="md">
            <Grid container xs={12}>
              <Grid
                item
                xs={4}
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Posters postergenre={this.state.movieInfo.title.image.url} />
              </Grid>
              <Grid container xs={8}>
                <Grid style={{ paddingTop: "20px" }} item xs={12}>
                  <Typography variant="h5">
                    {this.state.movieInfo.title.title}
                  </Typography>
                  <Divider />
                  <Typography variant="body2" gutterBottom>
                    {`${this.state.movieInfo.plotOutline.text} (${this.state.movieInfo.title.year})`}
                  </Typography>
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`title-${this.state.movieInfo.id
                      .replace("title", "")
                      .replace(/[/]/g, "")}`}
                  >
                    <Button variant="contained" fullWidth color="primary">
                      SEE FILMING LOCATIONS
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        )}
      </>
    );
  }
}

export default MovieInfo;
