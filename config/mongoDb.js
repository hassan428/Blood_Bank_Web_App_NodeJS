const mongoose = require("mongoose");
const { MONGODB_URI } = process.env;

const connect_to_database = () =>
  mongoose
    .connect(MONGODB_URI)
    .then((res) => console.log("MongoDb is Connected"))
    .catch((err) => console.log(err));

module.exports = connect_to_database;
