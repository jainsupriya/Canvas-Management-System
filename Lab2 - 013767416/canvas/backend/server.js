 // Imported required packages
 var express = require('express');
//var route = require('./route.js');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var app = express();
var cors = require('cors');
var dateTime = require('node-datetime');
var bcrypt = require('bcrypt-nodejs');
var path = require('path');
var fs = require('fs-extra'); // import fs-extra package
var conn = require('./model/Canvas');
const assignment = require('./routes/assignmentRoute');
const multer = require('multer');
const upload = multer({ dest: './uploads/' });

 var express = require('express')
 var conn = require('./model/Canvas');
 path = require('path'),
 bodyParser = require('body-parser'),
 cors = require('cors'),
 
 // All the express routes
 //const employeeRoutes = require('../Routes/Employee.route');
 
 // Conver incoming data to JSON format
 app.use(bodyParser.json());
 
 // Enabled CORS
 app.use(cors());
 
 // Setup for the server port number
 const port = 3001;
 
 // Routes Configuration
 //app.use('/employees', employeeRoutes);
 
 // Staring our express server
 const server = app.listen(port, function () {
 console.log('Server Lisening On Port : ' + port);
 });