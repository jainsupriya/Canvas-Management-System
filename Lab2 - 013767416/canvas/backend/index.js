var express = require('express');
//var route = require('./route.js');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var app = express();
var cors = require('cors');
var path = require('path');
var fs = require('fs-extra'); // import fs-extra package
//var conn = require('./model/Canvas');
var passport = require('passport');
const multer = require('multer');
var kafka = require('./');
//mongo db connection
mongoose = require('mongoose');
const mongodb = require('./db');
mongoose.Promise = global.Promise;
mongoose.connect(mongodb.DB, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

//Storing documents/Images
const storage = multer.diskStorage({
   destination: (req, file, cb) => {
       cb(null, './uploads');
   }
   , filename: (req, file, cb) => {
       cb(null, file.originalname);
   },
});

const upload = multer({ storage });

//routes
const userRoute = require('./routes/UserRoute');
const courseRoute = require('./routes/CourseRoute');
const announcementRoute = require('./routes/AnnouncementRoute');
const assignmentRoute = require('./routes/AssignmentRoute');
const fileRoute = require('./routes/FileRoute');
const quizRoute = require('./routes/QuizRoute');
const messageRoute = require('./routes/MessageRoute');
const submissionRoute = require('./routes/SubmissionRoute');
const gradesRoute = require('./routes/GradesRoute');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(session({
   secret              : 'cmpe273_canvas',
   resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
   saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
   duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
   activeDuration      :  5 * 60 * 1000
}));

const EventEmitter = require('events');
const emitter = new EventEmitter()
emitter.setMaxListeners(100)

//Allow Access Control
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});
 app.use(passport.initialize());
 app.use(passport.session());
// Bring in defined Passport Strategy
require('./config/passport')(passport);

 // define a route to download a file 
 app.get('/submission/download',(req, res) => {
  console.log(req.query.filename)
  var file = req.query.filename;
  var filelocation = path.join(__dirname + '/uploads', file);
  var img = fs.readFileSync(filelocation);
  var base64img = new Buffer(img).toString('base64');
  res.writeHead(200, {
     'Content--type':  "image/png"
  });
  res.end(base64img);

 });

//upload a file
app.post('/file',  upload.single('myFile'), function(req,res){
   if (req.file) {
         file ={
            name:req.file.originalname,
            type: req.file.mimetype,
            size:req.file.size,
            path:req.file.path,
            courseid:req.body.courseid
         }
      kafka.make_request("addFile", req, function(err, result){
         if(err){
            res.status(400).send("Error whiile creating file");
         }
         else{
            res.status(200).send(JSON.stringify(result));    
         }
      });   
   }
 });

// define a route to download a file 
app.get('/file/downloadfile',(req, res) => {
   var file = req.query.name;
   console.log(file);
   var filelocation = path.join(__dirname + '/uploads', file);
   console.log(filelocation);
   var img = fs.readFileSync(filelocation);
   var base64img = new Buffer(img).toString('base64');
   res.writeHead(200, {
         'Content--type':  req.query.type
   });
   res.end(base64img);  
});  

app.post('/users/upload-file', upload.array('photos', 5), (req, res) => {
   console.log('req.body', req.body);
   res.end();
});
app.post('/users/download-file/:file(*)', (req, res) => {
  console.log('Inside DOwnload File');
  var file = req.params.file;
  console.log(file);
  var filelocation = path.join(__dirname + '/uploads', file);
  var img = fs.readFileSync(filelocation);
  var base64img = new Buffer(img).toString('base64');
  res.writeHead(200, {
      'Content--type': 'image/jpg'
  });
  res.end(base64img);
});


app.use('/users', userRoute);
app.use('/course', courseRoute);
//app.use('/announcement', announcementRoute);
app.use('/assignment', assignmentRoute);
app.use('/quiz', quizRoute);
app.use('/file', fileRoute);
app.use('/message', messageRoute);
app.use('/submission', submissionRoute);
app.use('/grades', gradesRoute);




app.listen(3001);
module.exports = app
