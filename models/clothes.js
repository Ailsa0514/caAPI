const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const clothesSchema = new Schema({
    images:String,
    title:String,
    price:Number
})

const Cloth = mongoose.model('cloth',clothesSchema)

module.exports = Cloth 