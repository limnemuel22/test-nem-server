const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moviesSchema = new Schema({
    title: {
        type: String,
        unique: true
    },
    director: String,
    quantity: Number,
    genre: String
});

const Users = mongoose.model('Movies', moviesSchema)
module.exports = Users;