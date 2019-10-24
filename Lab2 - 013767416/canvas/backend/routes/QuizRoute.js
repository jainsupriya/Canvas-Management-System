var express = require('express');
var router = express.Router();
var passport = require('passport');
//var requireAuth = passport.authenticate('jwt', {session: false});
var jwt = require('jsonwebtoken');
var requireAuth = passport.authenticate('jwt', {session: false});
//let Announcement = require('../Models/AnnouncementModel');
const { check, validationResult } = require('express-validator/check');
//Kafka
var kafka = require('../kafka/client');


 router.post('/', function(req,res){
   kafka.make_request("addQuiz", req, function(err, result){
      if(err){
         res.status(400).send("Error whiile creating quiz");
      }
      else{
         console.log(result);
         res.status(201).send(JSON.stringify(result));
      }
 });   
 });
 router.post('/update', function(req,res){
   kafka.make_request("updateQuiz", req, function(err, result){
      if(err){
         res.status(400).send("Error whiile creating quiz");
      }
      else{
         console.log(result);
         res.status(201).send(JSON.stringify(result));
      }
 });   
 });

 router.post('/saveQuizQues', function(req,res){
   kafka.make_request("saveQuizQuestions", req, function(err, result){
      if(err){
         res.status(400).send("Error whiile creating quiz");
      }
      else{
         console.log(result);
         res.status(201).send("Quiz saved successfully")
      }
 });   
 });
 router.get('/', function(req,res){
   kafka.make_request("showQuizzes", req, function(err, result){
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
 
 router.post('/submit', function(req,res){
   //console.log(req.body.answers);
   kafka.make_request("submitQuiz", req, function(err, result){
      if(err){
         res.status(500).send("Error whiile submitting quiz");
      }
      else{
         console.log(result);
         res.status(201).send("Quiz submitted successfully")
      }
 });   
 });
 module.exports = router;