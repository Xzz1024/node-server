const axios = require('axios');
const config = require('../../config');

const axiosInstance = axios.create({
    baseURL: config.api.jitterbit.baseURL
    // "baseURL": "https://api.agilent.com/ncosx-dev/1.0/",
});
// "Basic Rm91bmRhdGlvbnNOb25wcm9kOkVEUFcjJm80NnpMYQ=="
// axiosInstance.defaults.headers.common['Authorization'] = config.api.jitterbit.basicAuth;
axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';

module.exports = axiosInstance;
