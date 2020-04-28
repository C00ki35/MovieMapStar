import axios from "axios";

export const getLatLng = (address) => {
  return axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.gapi}`
    )
    .then(({ data: { results } }) => {
      return results[0].geometry.location;
    })
    .catch((error) => {
      return error;
    });
};

export const getAddress = (coordinate) => {
  return axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinate.lat}, ${coordinate.lng}
      &key=${process.env.gapi}`
    )
    .then(({ data: { results } }) => {
      return results[0].formatted_address;
    })
    .catch((error) => {
      return error;
    });
};
