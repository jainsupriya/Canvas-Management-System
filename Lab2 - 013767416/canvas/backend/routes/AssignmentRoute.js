var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
var requireAuth = passport.authenticate('jwt', {session: false});
//Kafka
const multer = require('multer');
//const upload = multer({ dest: './uploads/' });
var kafka = require('../kafka/client');
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

router.get('/', function(req,res){
   kafka.make_request("showAssignments", req, function(err, result){
      if(err){
         res.status(500).send("Error whiile fetching assignment");
      }
      else{
         res.writeHead(200, {'Content-Type':'text/plain'});
         res.end(JSON.stringify(result));    
      }
   });  
 });


router.post('/', function(req,res){
   kafka.make_request("addAssignment", req, function(err, result){
      if(err){
         res.status(400).send("Error whiile creating assignment");
      }
      else{
         res.status(200).end(JSON.stringify(result))
      }
 });   
 
 });
router.post('/delete', function(req,res){
   kafka.make_request("deleteAssignment", req.body, function(err, result){
      if(err){
         res.status(400).send("Error whiile deleting assignment");
      }
      else{
         res.status(200).send("Assignment deleted successfully");
      }
 });   
});


router.post('/submit', upload.single('myFile'), (req, res) => {
   if (req.file) {
      data ={
         name:req.file.originalname,
         type: req.file.mimetype,
         id:req.body.assignmentid
      }
   }
   kafka.make_request("submitAssignment", req, function(err, result){
      if(err){
         res.status(400).send("Error whiile submitting assignment");
      }
      else{
         res.status(200).send("Assignment submitted successfully");
      }
 });   
});

module.exports = router;
