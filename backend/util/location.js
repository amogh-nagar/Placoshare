const axios = require("axios");

const HttpError = require("../models/http-error");

// const API_KEY = '0e2fde51f1ba4bf308b0a9e0c615c8201141760d';
const API_KEY = process.env.locationurl;

async function getCoordsForAddress(address) {
  const response = await axios.get(
    `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
      address
    )}&key=${API_KEY}`
  );
  const data = response.data;
  if (data.status.code !== 200) {
    const error = new HttpError(
      "Could not find location for the specified address.",
      422
    );
    throw error;
  }
  const coordinates = {
    lat: data.results[0].geometry.lat,
    lng: data.results[0].geometry.lng,
  };
  return coordinates;
}

module.exports = getCoordsForAddress;
