var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt-nodejs');
const multer = require('multer');
const upload = multer({ dest: './uploads/' });
var passport = require('passport');
var path = require('path');
var Model = require('../DatabaseConnection');
var fs = require('fs-extra'); // import fs-extra package
var requireAuth = passport.authenticate('jwt', {session: false});
const { check, validationResult } = require('express-validator/check');
var jwt = require('jsonwebtoken');
//Kafka
var kafka = require('../kafka/client');
const secret = "canvas273";

router.get('/people', function(req,res){  
    kafka.make_request("people", req, function(err, result){
      if(err){
          res.writeHead(500, {
              'Content-type': 'text/plain'
          });
          res.end('Error in fetching fetch!');
      }
      else{
          res.writeHead(200, {
              'Content-type': 'application/json'
          });
          res.end(JSON.stringify(result));
      }
    });
 });
//Signup
router.post('/register',
    check('name').isLength({ min:1 }).withMessage('Please enter username'),
    check('password').isLength({ min:8 }).withMessage('Password must be at least 8 characters in length.')
    .matches('[0-9]').withMessage('Password must contain at least 1 number.')
    .matches('[a-z]').withMessage('Password must contain at least 1 lowercase letter.')
    .matches('[A-Z]').withMessage('Password must contain at least 1 uppercase letter.'),
    check('email').isEmail().withMessage('Please Enter Valid Email')
    , function (req, res) {

        var errors = validationResult(req);
        const email = req.body.email
        const name = req.body.name
        const password = req.body.Password
        if (!errors.isEmpty()) 
        {
            console.log(errors.array());
            res.status(400).json(errors.array());
        }
        else
        {
            kafka.make_request('signup', req.body, function(err, result){
                console.log(result)
                if(result){            
                    console.log("User saved successfully.");
                    res.writeHead(201, {
                        'Content-type': 'text/plain'
                    });
                    res.end('Adding a user successful!');
                }
                else if(result == null){
                    res.writeHead(200, {
                        'Content-type': 'text/plain'
                    });
                    res.end('Dupplicate user!');
                }
         
                if(err){
                    res.writeHead(500, {
                        'Content-type': 'text/plain'
                    });
                    res.end('Error in fetching user details!');            
                }
            });
        }
});


router.post('/login', function(req, res){

    console.log('Inside login POST');
    kafka.make_request('login', req.body, function(err, result){
        if(err){
            console.log('Inside err login');
            res.writeHead(500, {
                'Content-type': 'text/plain'
            });
            res.end('Error in login!');
        }
        else{
            console.log('Inside results Login');
            if(result){
                req.session.user = result;
                // Create token if the password matched and no error was thrown
                var token = jwt.sign(result, secret, {
                    expiresIn: 10080 // in seconds
                });
                res.cookie('cookie', 'canvas', {maxAge:9000000, httpOnly: false , path :'/'});
                //res.json({success: true, token: 'JWT ' + token});
                res.writeHead(201, {
                    'Content-type': 'text/plain'
                });             
                console.log(result.id)
                //res.status(200).json({success: true, Authorization: 'Bearer ' + token});
                var Result = {
                    name : result.Name,
                    role : result.Role,
                    token : token,
                    userid: result.id,
                    email: result.Email,
                    phone: result.Phone
                }
               
                res.end(JSON.stringify(Result));    
            }
            else{
                res.writeHead(401,
                    {
                        'Content-type': 'text/plain'
                    })
                console.log('Invalid Credentials!');
                res.end('Invalid Credentials!');
            }            
        }
    });
 });
 

 router.get('/profile', function(req,res){
        kafka.make_request("profile", req, function(err, result){
            if(err){
                console.log("Unable to fetch user details.", err);
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('Error in fetching user details!');
            }
            else{
                console.log('Profile Data: ', result);
                res.writeHead(200, {
                    'Content-type': 'application/json'
                });
                res.end(JSON.stringify(result));
            }
        });        
 });
 
 router.get('/userinfo', function(req,res){
    if(req.session.user)
    {
       var select = "select * from users where userid = " + mysql.escape(req.query.id) ;
       conn.query(select, function(err, result){
          if(err){
           console.log(err);
           res.status(500).send('Something went wrong...try again later...')
          }
          else
          { 
            console.log(result)
            res.status(200).json({success: true, userdata:  result[0]}); 
          }
       })     
    }
 });
 
 router.put('/updateProf', function(req, res){
    kafka.make_request("updateProfile", req, function(err, result){
        if(err){
            console.log("Unable to fetch user details.", err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in fetching user details!');
        }
        else{
            console.log('Profile Data: ', result);
            res.writeHead(200, {
                'Content-type': 'application/json'
            });
            res.end("Profile Updated successfully");
        }
    });   
 });
 
 router.post('/uploadDP', upload.single('file'), (req, res) => {
  console.log(req.file);
  if (req.file) {
     var update = "UPDATE users SET profile_image="  + mysql.escape(req.file.originalname) + " ,image_path = " + mysql.escape(req.file.path) +  " where userid = " + mysql.escape(req.session.user.userid) ;
     conn.query(update, function(err, result){
        if(err){
         console.log(err);
         res.status(500).send('Something went wrong...try again later...')
        }
        else{
           res.writeHead(200, {'Content-Type':'text/plain'});
           res.end("File uploaded successfully");        
        }
     })
  } 
  else {
      res.end('No File Uploaded');
  }
 });
 

 

router.post('/pnr', function(req, res){
    for(var i=0; i<20; i++)
    {
       var random = Math.floor((Math.random() * 1000000) + 1);
       console.log('PNR: ' + random);
   
       Model.Coursedetails.findOne( { _id: req.body.id}, (err, course) => {
          if (err) {
              console.log("Unable to fetch course details.", err);
              //callback(err, null);
          }
          else {
                var pnr = new Model.PNRdetails(
                {
                  PNRCode: random,
                  Courseid:req.body.courseid
                }
            );
                console.log(course)
                pnr.save().then((pnr) => {
                course.PNRCodes.push(pnr);
                course.save().then((course) => {       
                }, (err) => {
                 console.log(err);
                });
                console.log(pnr);
            }, (err) => {
             console.log(err);
            });            
          }
      });
       
    }
 });

router.post('/logout', function (req, res) {
  res.clearCookie('cookie');
  req.session.user = undefined;
  res.writeHead(200, {
      'Content-type': 'text/plain'
  });
  res.end('Logged Out Successfully');
});

module.exports = router;
