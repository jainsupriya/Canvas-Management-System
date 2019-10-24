var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt-nodejs');
var conn = require('../model/Canvas');
var mysql = require('mysql');
const multer = require('multer');
const upload = multer({ dest: './uploads/' });
var passport = require('passport');
var config = require('../config/setting');
//var requireAuth = passport.authenticate('jwt', {session: false});
var jwt = require('jsonwebtoken');
var requireAuth = passport.authenticate('jwt', {session: false});

router.post('/login', function(req, res, next){
    var email = req.body.email;
    var user = {
      userid: res.userid,
      username: res.name,
  };
    var sql = "select * from users where email = " + mysql.escape(email) ;
    conn.query(sql, function(err, result){
       if(err){
         res.status(500).send('Something went wrong...try again later...')
         res.end('Invalid Credentials');
       }
       else{
          if(result.length == 1 && bcrypt.compareSync(req.body.password, result[0].password))
          {      
            var token = jwt.sign(user, config.secret, {
               expiresIn: 10080 // in seconds
            });
            res.cookie('cookie', 'canvas', {maxAge:9000000, httpOnly: false , path :'/'});
            res.status(201).json({success: true, token: 'JWT ' + token});
          }
          else
          {
            res.writeHead(200, {'Content-Type':'text/plain'});
            res.end('Invalid Credentials');
          }    
       }
    })
 });

 router.get('/getProfile', requireAuth, function(req,res){
  var select = "select * from users where userid = " + mysql.escape(req.session.user.userid) ;
  conn.query(select, function(err, result){
     if(err){
      console.log(err);
      res.status(500).send('Something went wrong...try again later...')
     }
     else{
        res.writeHead(200, {'Content-Type':'text/plain'});
        res.end(JSON.stringify(result[0]));        
     }
  })
});

router.put('/updateProf', function(req, res){
  var name = req.body.name;
  var email = req.body.email;
  var phone = req.body.phone;
  var aboutme = req.body.aboutme;
  var city = req.body.city;
  var country = req.body.country;
  var company = req.body.company;
  var school = req.body.school;
  var hometown = req.body.hometown;
  var languages = req.body.languages;
  var update = "UPDATE users SET name="  + mysql.escape(name) + " ,email = " + mysql.escape(email) + ", phone = " + mysql.escape(phone) + " , about_me = " + mysql.escape(aboutme) + ", city =" + mysql.escape(city) + ",country = " + mysql.escape(country) + " , company = " +mysql.escape(company) + ", school =" +mysql.escape(school) + ", hometown ="  + mysql.escape(hometown) + ", languages ="  +mysql.escape(languages) + " where userid = " + mysql.escape(req.session.user.userid) ;
 
  conn.query(update, function(err, result){
     if(err){
      console.log(err);
      res.status(500).send('Something went wrong...try again later...')
     }
     else{
        res.writeHead(200, {'Content-Type':'text/plain'});
        res.end('Details updated successfully');           
     }
  })
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

router.post('/logout', function (req, res) {
  res.clearCookie('cookie');
  req.session.user = undefined;
  res.writeHead(200, {
      'Content-type': 'text/plain'
  });
  res.end('Logged Out Successfully');
});

module.exports = router;
