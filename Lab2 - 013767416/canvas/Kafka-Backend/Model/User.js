// business.model.jsconst mongoose = require('mongoose');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
const UserSchema= new Schema({

    'Password' : {
        type: String
    },
    'Name' : {
        type: String
    },
    'Email' : {
        type : String
    },
    'Aboutme' :  {
        type : String
    },
    'Country' : {
        type : String
    },
    'City' : { 
        type : String
    },
    'Gender' : {
        type : String
    },
    'Hometown' : {
        type : String
    },
    'School' : {
        type : String
    },
    'Company' : {
        type : String
    },
    'Language' : {
        type : String
    },
    'ProfileImage' : {
        type : String
    },
    'PhoneNumber' : {
        type : String
    }
},
);

module.exports = User = mongoose.model('users', UserSchema);

