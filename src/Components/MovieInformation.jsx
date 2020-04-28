import React, { Component } from 'react';
import { getMovieLocationsInfo } from '../Utils/movies';
import MovieCard from './MovieCard';

class MovieInformation extends Component {
  state = { movieInfo: [], error: false };

  componentDidMount() {
    getMovieLocationsInfo(this.props.movieId)
      .then((movieInfo) => {
        this.setState({ movieInfo });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }
  render() {
    if (this.state.error)
      return <p>No film selected, please select a film on the map page.</p>;
    return (
      <div>
        {this.state.movieInfo ? (
          this.state.movieInfo.map((info) => {
            return <MovieCard key={info.movieLocation} {...info} />;
          })
        ) : (
          <p>No movie selected, please select a movie on the map page </p>
        )}
      </div>
    );
  }
}

export default MovieInformation;
