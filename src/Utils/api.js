import axios from "axios";
import { GAPI } from "../config.json";

export const getLatLng = (address) => {
  return axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GAPI.key}`
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
      &key=${GAPI.key}`
    )
    .then(({ data: { results } }) => {
      return results[0].formatted_address;
    })
    .catch((error) => {
      return error;
    });
};
