const { model, Schema, Types } = require('mongoose');

const userSchema = new Schema({
    displayName: {
        type: String,
        require: true
    },

    password: {
        type: String,
        require: true
    },


   email: {
        type: String,
        require: true
    },



}, { timestamps: true })



module.exports = model('User', userSchema);