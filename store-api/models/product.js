const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'product name must be provided']
    },
    price: {
        type: Number,
        required: [true, 'product price must be provided']
    },
    company: {
        type: String,
        enum: {
            values: ['Workfleek', 'Bizup', 'Machini', 'Click2Sure', 'Hawi'],
            message: '{VALUE} is not supported',
        },
        required: true
    },
    rating: {
        type: Number,
        default: 4.5
    },
    featured: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Product", ProductSchema);