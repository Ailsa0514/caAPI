const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const carSchema = new Schema({
    make: String,
    mode: String,
    year: Number,
    image: String
})

const Car = mongoose.model('car',carSchema)

module.exports = Car