
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

router.get('/assignments', function(req,res){
   kafka.make_request("assignmentGrades", req, function(err, result){
      if(err){
         res.status(500).send("Error whiile fetching assignment grades");
      }
      else{
         console.log(result);
         res.writeHead(200, {'Content-Type':'text/plain'});
         res.end(JSON.stringify(result));    
      }
   });  
 });
 
 router.get('/quizzes', function(req,res){
    console.log(req.query)
   kafka.make_request("quizGrades", req, function(err, result){
      if(err){
         res.status(500).send("Error whiile fetching quiz grades");
      }
      else{
         console.log(result);
         res.writeHead(200, {'Content-Type':'text/plain'});
         res.end(JSON.stringify(result));    
      }
   });  
 });


router.get('/totalgrades', function(req,res){
    var select = "SELECT courses.courseid, courses.name, courses.term, courses.nickname, courses.dept, grades.grades FROM courses INNER JOIN grades on courses.courseid = grades.courseid WHERE studentid = " +   mysql.escape(req.session.user.userid)  ;
            conn.query(select, function(err, result){
            if(err){
            console.log(err);
            res.status(500).send('Something went wrong...try again later...')
            }
            else{
            res.status(200).json({success: true, grades:  result, name : req.session.user.name});     
            }
        })
    });


module.exports = router;