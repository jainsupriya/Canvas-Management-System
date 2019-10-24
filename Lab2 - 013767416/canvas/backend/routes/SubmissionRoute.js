var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt-nodejs');

var path = require('path');
var fs = require('fs-extra'); // import fs-extra package
const multer = require('multer');
const upload = multer({ dest: './uploads/' });
var passport = require('passport');
var config = require('../config/setting');

`var jwt = require('jsonwebtoken');`
var requireAuth = passport.authenticate('jwt', {session: false});

const { check, validationResult } = require('express-validator/check');
//Kafka
var kafka = require('../kafka/client');


  router.get('/', function(req,res){
    kafka.make_request("getSubmissions", req, function(err, result){
       if(err){
          res.status(500).send("Error whiile fetching assignment");
       }
       else{
          console.log(result);
          if(result.length)
            res.status(200).send(JSON.stringify(result));    
          else 
           res.status(200).send("No Submissions");  
       }
    });  
 });
  
 router.get('/getAllSubmissions', function(req,res){
    console.log("here");
   kafka.make_request("getAllSubmissions", req, function(err, result){
      if(err){
         res.status(500).send("Error whiile fetching assignment");
      }
      else{
         console.log(result);
         res.writeHead(200, {'Content-Type':'text/plain'});
         res.end(JSON.stringify(result));    
      }
   });  
});


 router.get('/students-submissions', function(req,res){
    console.log(req.query)
   kafka.make_request("latestSubmissions", req, function(err, result){
      if(err){
         res.status(500).send("Error whiile fetching assignment");
      }
      else{
         console.log(result);
         res.writeHead(200, {'Content-Type':'text/plain'});
         res.end(JSON.stringify(result));    
      }
   });  
 });
 
 router.post('/gradeSubmission', function(req,res){
   kafka.make_request("gradeSubmission", req, function(err, result){
      if(err){
         res.status(500).send("Error whiile grading assignment");
      }
      else
         res.status(200).send("Assignment graded successfully");  
   });  
});
 module.exports = router;


