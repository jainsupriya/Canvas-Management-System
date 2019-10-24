var express = require('express');
var router = express.Router();
const multer = require('multer');
var passport = require('passport');
var config = require('../config/setting');
`var jwt = require('jsonwebtoken');`
var requireAuth = passport.authenticate('jwt', {session: false});
//Kafka
var kafka = require('../kafka/client');


router.post('/send', function(req, res){
    console.log('Request body', req.body);
    kafka.make_request("sendMessage", req, function(err, result){
        if(err){
            console.log('Unable to send message', err.message);
            res.writeHead(500, {
                'Content-type': 'text/plain'
            });
            res.end('Error in sending message');
        }   
        else{
            console.log('Sending mesasge successful.', result);
            res.writeHead(200,{
                'Content-type' : 'application/json'
            });
            res.end(JSON.stringify(result));
        } 
    });
});



router.post('/message/get', function(req, res){
    console.log('Inside GET messages');
    console.log('Request Body: ', req.body);
 
    kafka.make_request("getMessages", req, function(err, result){
        if(err){
            console.log('Unable to get messages.', err.message);
            res.writeHead(500, {
                'Content-type': 'text/plain'
            });
            res.end('Error in get messages');
        }
        else{
            console.log('Messages retrieval successful.', result);
            res.writeHead(200,{
                'Content-type' : 'application/json'
            });
            res.end(JSON.stringify(result));
        }
    });
 });

module.exports = router;