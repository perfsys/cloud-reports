let axios = require('axios');

let params = process.env.NODE_ENV === 'development' ?
    {
        baseURL: 'http://localhost:3000/dev'
    } :
    {}
module.exports = axios.create(params)
