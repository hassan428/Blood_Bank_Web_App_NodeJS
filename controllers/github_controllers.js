const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');
const fs = require('fs');
const { axios_instance } = require('../config/axios_instance');


const github_details = async (req, res) => {
    const { username } = req.params;
    const { baseURL } = axios_instance.defaults;
    try {
        const githubDetails = await axios.get(`${baseURL}${username}`);
        const { login, name, avatar_url, followers, public_repos, updated_at, created_at } = githubDetails.data
        // console.log(githubDetails.data);
        const file_path = path.join(__dirname, '../public/template.html');
        // console.log(file_path);
        const read_file = fs.readFileSync(file_path, "utf-8");
        // console.log(read_file);
        const $ = cheerio.load(read_file);

        $('#username').text(login);
        $('#id').text(name);
        $('#followers').text(followers);
        $('#public_repos').text(public_repos);
        $('#updated_at').text(updated_at);
        $('#created_at').text(created_at);
        $('#avatar').attr('src', avatar_url);

        return res.send($.html());

    } catch (error) {
        return res.status(500).send("Something went wrong!");
    };
};



module.exports = { github_details };