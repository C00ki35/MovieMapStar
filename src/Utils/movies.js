const { extractTitleId } = require("./moviemanipulation");

export const getMovieId = (movieTitle, setFilmFunction) => {
  return fetch(`https://imdb8.p.rapidapi.com/title/find?q=${movieTitle}`, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "imdb8.p.rapidapi.com",
      "x-rapidapi-key": process.env.REACT_APP_rapi,
    },
  })
    .then((response) => response.json())
    .then((response) => {
      setFilmFunction(response.results[0]);
      return extractTitleId(response.results[0].id);
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const getMovieLocations = (movieId) => {
  return fetch(
    `https://imdb8.p.rapidapi.com/title/get-filming-locations?tconst=${movieId}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "imdb8.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_rapi,
      },
    }
  )
    .then((response) => response.json())
    .then((response) => {
      const addressArray = [];
      response.locations.forEach((location) => {
        addressArray.push(location.location);
      });

      return addressArray;
    })
    .catch((err) => {
      return err;
    });
};

export const getMovieLocationsInfo = (movieId) => {
  return fetch(
    `https://imdb8.p.rapidapi.com/title/get-filming-locations?tconst=${movieId}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "imdb8.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_rapi,
      },
    }
  )
    .then((response) => response.json())
    .then((response) => {
      const locationInfo = response.locations.map((location) => {
        if (location.extras) {
          return {
            movieLocation: location.location,
            locationExtras: location.extras[0],
          };
        } else {
          return {
            movieLocation: location.location,
            locationExtras: "Sorry, no available location information",
          };
        }
      });
      return locationInfo;
    })
    .catch((err) => {
      return err;
    });
};
