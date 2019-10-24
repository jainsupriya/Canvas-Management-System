var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
var path = require('path');
var fs = require('fs-extra'); // import fs-extra package
var requireAuth = passport.authenticate('jwt', {session: false});
const { check, validationResult } = require('express-validator/check');
//Kafka
var kafka = require('../kafka/client');
const multer = require('multer');
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


 //get uploaded files
 router.get('/', function(req,res){
   kafka.make_request("showFiles", req, function(err, result){
      if(err){
         res.status(500).send("Error whiile fetching files");
      }
      else{
         res.writeHead(200, {'Content-Type':'text/plain'});
         res.end(JSON.stringify(result));    
      }
   });  
 });



 module.exports = router;