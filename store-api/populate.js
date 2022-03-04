const connectDB = require("./db/connect");
const Product = require("./models/product");
const jsonProducts = require("./products.json");
const mongoose = require("mongoose");

const start = async () => {
    try {
        await connectDB()
        //clear the database
        await Product.deleteMany();
        //insert new products
        await Product.create(jsonProducts);
        console.log("Products Added Successfully...")
        //exit after adding products
        process.exit(0);
    } catch (error) {
        console.log(error)
        process.exit(1);
    }
}

start()