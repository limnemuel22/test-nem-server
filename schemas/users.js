const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    password: String,
    type: {
        default: "owner",
        enum: ["owner", "admin"],
        type: String,
    },

});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;