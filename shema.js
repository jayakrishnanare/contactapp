const mongoose = require('mongoose');
const { Module } = require('vm');


const ContactDetails = mongoose.Schema({
    firstname : {
        type : String,
        required : true
    },
    surname : {
        type : String,
    },
    company : {
        type : String,
    },
    phone : {
        type : Number,
        required : true,
        minlength : 10,
        maxlength : 10
    },
    phoneNumberType : {
        type : String,
        enum : ["mobile","work", "home","main", "custom","other"],
        required : true
    },
    email : {
        type : String
    },
    isFav : {
        type : Boolean,
        default : false
    }
});

module.exports = mongoose.model('ContactDetails',ContactDetails)