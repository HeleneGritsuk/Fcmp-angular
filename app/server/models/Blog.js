const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// установка схемы
const blogScheme = new Schema({
    id: String,
    text: String,
    title: String,
    date: String
});

module.exports = mongoose.model('Blog', blogScheme);
