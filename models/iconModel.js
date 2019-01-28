const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const iconSchema = new Schema({
    icon: String,
    title: String
})

const Icon = mongoose.model('icon',iconSchema)
module.exports = Icon; 