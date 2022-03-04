const mongoose = require("mongoose");
const uri = "mongodb://localhost:27017/taskmanagerdb";


const connectDB = () => {
    return mongoose.connect(uri);
}

module.exports = connectDB