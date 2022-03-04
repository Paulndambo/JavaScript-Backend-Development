const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/jwt-db";

const connectDB = () => {
    mongoose.connect(url)
}

module.exports = connectDB;