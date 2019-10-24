var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/HomeAway');
const mongodb = require('./db');
Schema = mongoose.Schema;  
mongoose.connect(mongodb.DB, { useNewUrlParser: true }).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
  );


var PersonSchema = new Schema({
  name    : String,
  age     : Number,
  stories : [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});
    
var userSchema =new Schema( {
    'Password' : {
        type: String
    },
    'Name' : {
        type: String
    },
    'Email': {
        type : String
    },
    'Role': {
        type : String
    },    
    'Aboutme' :  {
        type : String
    },
    'Phone':{
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
    'Languages' : {
        type : String
    },
    'ProfileImage' : {
        type : String
    },

    'Courses': [ { type: Schema.Types.ObjectId, ref: 'courses' }],
    'Submissions' : Array ,
    'Latestsubmission' : Array,

});


// Define collection and schema for Business
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

    'Assignments': [ { type: Schema.Types.ObjectId, ref: 'assignments' }],
    'Announcements': [ { type: Schema.Types.ObjectId, ref: 'announcement' }],
    'Files': [ { type: Schema.Types.ObjectId, ref: 'files' }],
    'Quizzes': [ { type: Schema.Types.ObjectId, ref: 'quizzes' }],
    'Students': [ { type: Schema.Types.ObjectId, ref: 'users' }],
    'PNRCodes': [ { type: Schema.Types.ObjectId, ref: 'pnrcodes' }],
});


// Define collection and schema for Business
var assignmentSchema = new Schema({
    'Name' : {
        type: String
    },
    'Content' : {
        type: String
    },
    'Points' : {
        type : Number
    },
    'DueDate' :  {
        type : Date
    },
    'Published' : {
        type : Boolean
    },
    'Courseid': {
        type: String
    }
});


var messageSchema = new Schema({
    senderEmailId: {
        type: String
    },
    receiverEmailId: {
        type: String
    },
    messageThread: {
        type: Array
    }
});

var pnrSchema = new Schema({
    'PNRCode':{
        tyep:String
    },
    'Courseid': {
        type: String
    }
})

var announcementSchema = new Schema({
    'Title' : {
        type: String
    },
    'Content' : {
        type: String
    },
    'CreatedBy' : {
        type : String
    },
    'CreatedAt' :  {
        type : Date
    },
    'Courseid': {
        type: String
    }
    
});

// Define collection and schema for Business
var fileSchema = new Schema({
    'Name' : {
        type: String
    },
    'Type' : {
        type: String
    },
    'Path' : {
        type : String
    },
    'Size' :  {
        type : String
    },
    'Coursesid': {
        type: String
    },
    'CreatedBy' : {
        type : String
    },
    'CreatedAt' :  {
        type : Date
    }
});



// Define collection and schema for Business
var quizSchema = new Schema({
    'Title' : {
        type: String
    },
    'Content' : {
        type: String
    },
    'NoOfQuestions' : {
        type : String
    },
    'Duedate' :  {
        type : Date
    },
    'Courseid': {
        type: String
    },
    'Marks' : {
        type : Number
    },
    'Questions':{
        type:Array
    },
    'Published' :{
        type:String
    }
});


// Define collection and schema for Business
var submissionSchema = new Schema({
    'Filename' :  {
        type : String
    },
    'Type' : {
        type : String
    },
    'Graded' : {
        type : String
    },
    'Assignment' : assignmentSchema

});


var Userdetails = mongoose.model('users', userSchema);
var Coursedetails = mongoose.model('courses', courseSchema);
var Assignmentdetails = mongoose.model('assignments', assignmentSchema);
var Announcementdetails = mongoose.model('announcement', announcementSchema);
var Filedetails = mongoose.model('files', fileSchema);
var Quizdetails = mongoose.model('quizzes', quizSchema);
var Submissiondetails = mongoose.model('submissions', submissionSchema);
let Messagedetails = mongoose.model("messages",messageSchema);  
let PNRdetails = mongoose.model("pnrcodes",pnrSchema);  
//var Gradedetails = mongoose.model('grades', assignmentSchema);
module.exports = {
    Userdetails,
    Coursedetails,
    Assignmentdetails,
    Announcementdetails,
    Quizdetails,
    Filedetails,
    Submissiondetails,
    Messagedetails,
    PNRdetails
    
};
