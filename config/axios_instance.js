const axios = require('axios')

const { GITHUB_URL } = process.env

const axios_instance = axios.create({
    baseURL: GITHUB_URL,
});

module.exports = { axios_instance }