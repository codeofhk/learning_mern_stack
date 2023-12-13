const mongoose = require('mongoose')

const phoneBookSchema = new mongoose.Schema({
    name: String,
    number: Number,
})

const phoneBook = mongoose.model('phonebook',phoneBookSchema)

module.exports = phoneBook