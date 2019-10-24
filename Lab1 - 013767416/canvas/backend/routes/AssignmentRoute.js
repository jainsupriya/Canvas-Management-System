var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt-nodejs');
var conn = require('../model/Canvas');
var mysql = require('mysql');
const multer = require('multer');
const upload = multer({ dest: './uploads/' });

router.get('/getAssignments', function(req,res){    
    var select = "select * from assignmentdetails where courseid = " + mysql.escape(req.query.id) ;
    conn.query(select, function(err, result){
       if(err){
        console.log(err);
        res.status(500).send('Something went wrong...try again later...')
       }
       else{
          res.writeHead(200, {'Content-Type':'text/plain'});
          res.end(JSON.stringify(result));        
       }
    })
 });

router.get('/getassignmentInfo', function(req,res){
    var select = "select * from assignmentdetails where assignmentid = " + mysql.escape(req.query.id) ;
    conn.query(select, function(err, result){
       if(err){
        console.log(err);
        res.status(500).send('Something went wrong...try again later...')
       }
       else{
          res.writeHead(200, {'Content-Type':'text/plain'});
          res.end(JSON.stringify(result));        
       }
    })
 });

 router.post('/createAssignment', function(req,res){
    var insert = "Insert into assignmentdetails  (name , points, content, dueDate, courseid )  values ( " + mysql.escape(req.body.name) + " , " + mysql.escape(req.body.points)+ " , " + mysql.escape(req.body.html)+ " , "  + mysql.escape(req.body.dueDate) + " , "  + mysql.escape(req.body.courseid)+")";
    conn.query(insert, function(err, result){
       if(err){
        console.log(err);
        res.status(500).send('Something went wrong...try again later...')
       }
       else{
          res.writeHead(200, {'Content-Type':'text/plain'});
          res.end("Assignments Details Added successfully");        
       }
    })
 });
 
module.exports = router;
