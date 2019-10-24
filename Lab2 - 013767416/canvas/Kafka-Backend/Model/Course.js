// business.model.jsconst mongoose = require('mongoose');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var courseSchema =  Schema( {

    'Nickname' : {
        type: String
    },
    'Name' : {
        type: String
    },
    'Dept' : {
        type : String
    },
    'Desc' :  {
        type : String
    },
    'Room' : {
        type : String
    },
    'Capacity' : { 
        type : Number
    },
    'Waitlist' : {
        type : Number
    },
    'Term' : {
        type : String
    },
    'CreatedBy' : {
        type : String
    },
    'Enrolled_Count' : {
        type : Number
    },
    'Waitlist_Count' : {
        type : Number
    },
    'Status' : {
        type : String
    },
    
});

module.exports = Course = mongoose.model('courses', courseSchema);