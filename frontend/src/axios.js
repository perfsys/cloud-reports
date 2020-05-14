let axios = require('axios');

module.exports = axios.create({
    baseURL: process.env.VUE_APP_BASE_API_URL,
});
