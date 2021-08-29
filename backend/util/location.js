const axios = require('axios');

const HttpError = require('../models/http-error');

const API_KEY = '0e2fde51f1ba4bf308b0a9e0c615c8201141760d';

async function getCoordsForAddress(address) {
  // return {
  //   lat: 40.7484474,
  //   lng: -73.9871516
  // };

  const response = await axios.get(
    `https://api.geocodify.com/v2/geocode?api_key=${API_KEY}&q=${address}`
  );
  const data = response.data;

  if (data.meta.code !== 200) {
    const error = new HttpError(
      'Could not find location for the specified address.',
      422
    );
    throw error;
  }
  const coordinates = {
    lat: data.response.features[0].geometry.coordinates[0],
    lng: data.response.features[0].geometry.coordinates[1],
  };
  return coordinates;
}

module.exports = getCoordsForAddress;
