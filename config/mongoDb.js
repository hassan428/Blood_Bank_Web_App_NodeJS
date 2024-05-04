const { default: mongoose } = require("mongoose")
const { MONGODB_URI } = process.env;

const connect_to_database = async () => {

    mongoose.connect(MONGODB_URI);

    mongoose.connection.on('connected', () => {
        console.log("connected to database");
    });
    mongoose.connection.on('error', (err) => {
        console.log(err);
    });
};


module.exports = connect_to_database;