const axios = require('axios')

const instance = axios.create({
    baseURL: 'https://api.adviceslip.com/'
  });

module.exports = instance

