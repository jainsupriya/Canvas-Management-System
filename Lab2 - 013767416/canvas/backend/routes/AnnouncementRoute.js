var express = require('express');
var router = express.Router();
const multer = require('multer');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var requireAuth = passport.authenticate('jwt', {session: false});
//Kafka
var kafka = require('../kafka/client');

 router.post('/', function(req,res){
   kafka.make_request("addAnnouncement", req, function(err, result){
      if(err){
         res.status(400).send("Error whiile creating announcement");
      }
      else{
         console.log("Announcement Created successgully")
         res.status(200).end(JSON.stringify(result))
      }
 });   
 });

 router.post('/delete', function(req,res){
   kafka.make_request("deleteAnnouncement", req, function(err, result){
      if(err){
         res.status(400).send("Error whiile deleting announcement");
      }
      else{
         res.status(200).send("Announcement deleted successfully");
      }
 });   
});

 router.get('/', function(req,res){
   kafka.make_request("showAnnouncements", req, function(err, result){
      if(err){
         res.status(500).send("Error whiile fetching announcement");
      }
      else{
         res.writeHead(200, {'Content-Type':'text/plain'});
         res.end(JSON.stringify(result));    
      }
   });  
 });

 module.exports = router;
