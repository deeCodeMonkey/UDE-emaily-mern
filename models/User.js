﻿const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    credits: {
        type: Number,
        default: 0
    } 

});

//instance of User record in 'users' collection with userSchema
var User = mongoose.model('users', userSchema);

module.exports = User;