const {nasaKey} = require('./config.js');
const axios = require('axios');

const functions = {
  nasaAPI: async (date)=>{
      const nasaEndPoint = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos';
      const params = {earth_date: date, api_key: nasaKey}
      const response = await axios.get(nasaEndPoint, {params})
      return response.data
  }
}

module.exports = functions;