var express = require('express');
//var route = require('./route.js');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var app = express();
var mysql = require('mysql');
var cors = require('cors');
var dateTime = require('node-datetime');
var bcrypt = require('bcrypt-nodejs');
var path = require('path');
var fs = require('fs-extra'); // import fs-extra package
var conn = require('./model/Canvas');
var passport = require('passport');
var config = require('./config/setting')
var jwt = require('jsonwebtoken');
var crypt = require('./app/crypt');
var db = require('./app/db');
var requireAuth = passport.authenticate('jwt', {session: false});
var pool = require('./ConnectionPooling.js');
const { check, validationResult } = require('express-validator/check');
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(session({
   secret              : 'cmpe273_canvas',
   resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
   saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
   duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
   activeDuration      :  5 * 60 * 1000
}));

//Allow Access Control
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});
 app.use(passport.initialize());
 app.use(passport.session());
// Bring in defined Passport Strategy
require('./config/passport')(passport);

app.post('/register', 
      check('name').isLength({ min:1 }).withMessage('Please enter username'),
      check('password').isLength({ min:8 }).withMessage('Password must be at least 8 characters in length.')
      .matches('[0-9]').withMessage('Password must contain at least 1 number.')
      .matches('[a-z]').withMessage('Password must contain at least 1 lowercase letter.')
      .matches('[A-Z]').withMessage('Password must contain at least 1 uppercase letter.'),
      check('email').isEmail().withMessage('Please Enter Valid Email')
      ,function(req, res, next){
      var errors = validationResult(req);
      const email = req.body.email
      const name = req.body.name
      const password = req.body.Password
      if (!errors.isEmpty()) 
      {
         console.log(errors.array());
         res.status(400).json(errors.array());
      }
      else{
         const cryptedpassword = bcrypt.hashSync(password);
         var role=  req.body.teacherCheck ? "Teacher" : "Student"
         var select = "select * from users where  email = " + mysql.escape(email) ;
         
         conn.query(select, function(err, result){
            if(err){
            console.log(err);
            res.status(500).send('Something went wrong...try again later...')
            }
            else{
               if(result.length == 0 )
               {
                  var insert = "Insert into users  (name , email, password, role) values ( " + mysql.escape(name) + " , " + mysql.escape(email)+ " , " + mysql.escape(cryptedpassword) + " , " + mysql.escape(role)+")";
                  conn.query(insert, function(err, result){
                     if(err){
                        console.log(err);
                        res.status(500).send('Something went wrong...try again later...')
                     }
                     else
                        res.status(201).send('User Created Successfully')        
                  })
               }
               else{
                  res.status(400).send("Oh uh, something went wrong");
               }
            }
         })
      }
});
app.post('/login', function(req, res, next){
   console.log("hello")
   var email = req.body.email;
   var user = {
     userid: res.userid,
     username: res.name,
   };
   pool.getConnection(function (err, conn) {
      if (err) {
            console.log('Error in creating connection!');
            res.writeHead(400, { 
               'Content-type': 'text/plain'
            });
            res.end('Error in creating connection!');
      }
      else
      {
         var sql = "select * from users where email = " + mysql.escape(email) ;
         conn.query(sql, function(err, result){
            conn.release();
            if(err){
               res.status(500).send('Something went wrong...try again later...')
            }
            else{
               if(result.length == 1 && bcrypt.compareSync(req.body.password, result[0].password))
               {  
               var token = jwt.sign(user, config.secret, {
                   expiresIn: 10080 // in seconds
               });
               req.session.user = result[0];
               res.cookie('cookie', 'canvas', {maxAge:9000000, httpOnly: false , path :'/'});
               res.status(201).json({success: true, token: 'JWT ' + token, userdata:  result[0]});
               //res.status(201).send('Logged in Successfully')     
               }
               else
               res.status(400).send({success: true, message:  "Invalid Credentials"});     
            }
         })
         
      }
   }); 
});

app.get('/profile', function(req,res){
 var select = "select * from users where userid = " + mysql.escape(req.session.user.userid) ;
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
});

app.put('/updateProf', function(req, res){
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
 var profilepic = req.body.profilepic;
 var update = "UPDATE users SET name="  + mysql.escape(name) + " ,email = " + mysql.escape(email) + ", phone = " + mysql.escape(phone) + " , about_me = " + mysql.escape(aboutme) + ", city =" + mysql.escape(city) + ",country = " + mysql.escape(country) + " , company = " +mysql.escape(company) + ", school =" +mysql.escape(school) + ", hometown ="  + mysql.escape(hometown) + ", languages ="  +mysql.escape(languages)+ " , profile_image = " + mysql.escape(profilepic) + " where userid = " + mysql.escape(req.session.user.userid) ;
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

app.post('/uploadDP', upload.single('file'), (req, res) => {
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

app.post('/upload-file', upload.array('photos', 5), (req, res) => {
   console.log('req.body', req.body);
   res.end();
});
app.post('/download-file/:file(*)', (req, res) => {
   console.log('Inside DOwnload File');
   var file = req.params.file;
   console.log(file);
   var filelocation = path.join(__dirname + '/uploads', file);
   var img = fs.readFileSync(filelocation);
   var base64img = new Buffer(img).toString('base64');
   res.writeHead(200, {
       'Content--type': 'image/jpg'
   });
   res.end(base64img);
});

app.post('/logout', function (req, res) {
 res.clearCookie('cookie');
 req.session.user = undefined;
 res.writeHead(200, {
     'Content-type': 'text/plain'
 });
 res.end('Logged Out Successfully');
});

app.get('/assignments', function(req,res){    
   var select = "select * from assignmentdetails where courseid = " + mysql.escape(req.query.id) ;
   conn.query(select, function(err, result){ 
      if(err){
       console.log(err);
        res.status(500).send('Something went wrong...try again later...')
      }
      else{
         res.status(200).json(result);     
      }
   })
});


app.get('/assignmentnames', function(req,res){    
   var select = "select name from assignmentdetails where courseid = " + mysql.escape(req.query.id) ;
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

app.get('/assignmentinfo', function(req,res){
   var select = "select * from assignmentdetails where assignmentid = " + mysql.escape(req.query.id) ;
   conn.query(select, function(err, result){
      if(err){
       console.log(err);
        res.status(500).send('Something went wrong...try again later...')
      }
      else{
         res.status(200).json({success: true, assignmentdata:  result[0]}); 
      }
   })
});


app.get('/submissiondetails', function(req,res){
   var select = "select * from submission where assignmentid = " + mysql.escape(req.query.id) + " order BY submissiontime DESC ";
   
   conn.query(select, function(err, result){
      if(err){
       console.log(err);
        res.status(500).send('Something went wrong...try again later...')
      }
      else 
      {  
         console.log(result);
         console.log(result[0]);
         if(result.length > 1)
            res.status(200).json({success: true, submissiondata:  result[0]}); 
         else  
            res.status(200).json({success: true, submissiondata:  "No Submission"}); 
      }
   })
});

// define a route to download a file 
app.get('/downloadsubmission',(req, res) => {
   console.log(req.query.id);
   var select = "select filename,type from submission where submissionid = " + mysql.escape(req.query.id) ;
   conn.query(select, function(err, result){
      if(err){
       console.log(err);
        res.status(500).send('Something went wrong...try again later...')
      }
      else
      {
         var file = result[0].filename;
         var filelocation = path.join(__dirname + '/uploads', file);
         var img = fs.readFileSync(filelocation);
         var base64img = new Buffer(img).toString('base64');
         res.writeHead(200, {
             'Content--type':  result[0].type
         });
         res.end(base64img);
      }
   })

 });

app.get('/studentsubmissions', function(req,res){
   var select = "SELECT users.name, submission.studentId, submission.courseid, users.userid , submission.submissionid, submission.filename, submission.Graded, MAX(submissiontime) as submissiontime FROM Submission INNER JOIN users where submission.studentId= users.userid and submission.assignmentid= "  + mysql.escape(req.query.id) + "GROUP BY 2,3 ORDER BY submissiontime";
      console.log(select);
   conn.query(select, function(err, result){
      if(err){
       console.log(err);
        res.status(500).send('Something went wrong...try again later...')
      }
      else 
      {  
         res.end(JSON.stringify(result));     
      }
   })
});
app.post('/assignment', function(req,res){
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

app.post('/deleteAssignments', function(req,res){
   console.log(req.body.assignmentid)
   var deleteq = "Delete from assignmentdetails where assignmentid = "  + mysql.escape(req.body.assignmentid) ;
   console.log(deleteq);
       conn.query(deleteq, function(err, result){
      if(err){
       console.log(err);
        res.status(500).send('Something went wrong...try again later...')
      }
      else{
         res.writeHead(200, {'Content-Type':'text/plain'});
         res.end("Assignment deleted successfully");        
      }
   })
});

app.post('/submitAssignment', upload.single('myFile'), (req, res) => {
   var dt = dateTime.create();
   var createdDate = dt.format('Y-m-d H:M:S');
   console.log(req.file);
   if (req.file) {
      var insert = "Insert into submission  (studentid, assignmentid, courseid, submissiontime, filename ,fileservername,  filepath, type )  values ( " + mysql.escape(req.session.user.userid) + " , "  + mysql.escape(req.body.assignmentid) + " , "  + mysql.escape(req.body.courseid) + " , "  +mysql.escape(createdDate) +" , "+mysql.escape(req.file.originalname) + " , " + mysql.escape(req.file.filename) +" , "+ mysql.escape(req.file.path)+" , "  + mysql.escape(req.file.mimetype) +")";
      conn.query(insert, function(err, result){
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
   else 
      res.end('No file for uploading');
});


app.get('/coursedetails', function(req,res){
   var select = "select * from courses where courseid = " + mysql.escape(req.query.id) ;
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

app.post('/announcement', function(req,res){
   var createdBy = "Supriya Jain";
   var dt = dateTime.create();
   var createdDate = dt.format('Y-m-d H:M:S');

   var insert = "Insert into announcement  (title , content, createdBy, createdAt, courseid )  values ( " + mysql.escape(req.body.topic) + " , " + mysql.escape(req.body.html)+ " , "   + mysql.escape(req.session.user.userid)+ " , "+ mysql.escape(createdDate) + " , "  + mysql.escape(req.body.courseid)+")";
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

app.post('/deleteAnnouncement', function(req,res){
   pool.getConnection(function (err, conn) {
      if (err) {
          console.log('Error in creating connection!');
          res.status(500).send('Something went wrong...try again later...')
      }
      else {
               var deleteq = "Delete from announcement where announcementid = "  + mysql.escape(req.body.announcementid) ;
               conn.query(deleteq, function(err, result){
               if(err){
               console.log(err);
               res.status(500).send('Something went wrong...try again later...')
               }
               else{
                  res.writeHead(200, {'Content-Type':'text/plain'});
                  res.end("Announcement deleted successfully");        
               }
            })
         }
      });
         
});

app.get('/announcements', function(req,res){
   pool.getConnection(function (err, conn) {
   if (err) {
      console.log('Error in creating connection!');
      res.status(500).send('Something went wrong...try again later...')
  }
  else {

      var select = "select * from announcement where courseid = " + mysql.escape(req.query.id) ;
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
   }
});
});
app.get('/announcementinfo', function(req,res){
   var select = "select announcement.title, announcement.content, announcement.createdBy, announcement.createdAt, users.name from announcement inner join users on announcement.createdby = users.userid where announcementid = " + mysql.escape(req.query.id) ;
   console.log(select)
   conn.query(select, function(err, result){
      if(err){
       console.log(err);
        res.status(500).send('Something went wrong...try again later...')
      }
      else{
        console.log(result[0])
         res.status(200).json({success: true, announcementdata:  result[0]});    
      }
   })
});

//Protected authenticated route with JWT
app.get('/protectedRoute', requireAuth, function (request, response) {
   console.log('hi');
   console.log(requireAuth);
   response.send('Your User id is: ' + request.user.id + ', username is: ' + request.user.username + '.');
});

// Home route. We'll end up changing this to our main front end index later.
app.get('/', function (req, res) {
   res.send('This Route is not yet defined.');
});

app.get('/courses', function(req,res){
   var username= req.session.user.name;
   if(req.session.user.role==='Teacher')
      var select = "select * from courses where createdBy = " + mysql.escape(username) ;
   else
      var select = "select * from courses inner join enrollement_status on courses.courseid=enrollement_status.courseid where enrollement_status.student_id = " + mysql.escape(req.session.user.userid) ;

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
app.post('/addcourse', function(req, res, next){
   var insert = "Insert into courses  ( nickname , name, dept, description, room, capacity, waitlist, term, createdBy )  values ( " + mysql.escape(req.body.nickname) + " , " + mysql.escape(req.body.name)+ " , " + mysql.escape(req.body.dept)+ " , "  + mysql.escape(req.body.desc) + " , "  + mysql.escape(req.body.room) + " , " + mysql.escape(req.body.capacity) + " , " + mysql.escape(req.body.waitlist)+" , " + mysql.escape(req.body.term)+ " , " + mysql.escape(req.session.user.name)+ ")";
   conn.query(insert, function(err, result){
      if(err){
       console.log(err);
        res.status(500).send('Something went wrong...try again later...')
      }
      else
        res.end('Details added successfully');
   })
});
app.post('/enroll', function(req, res, next){
   //var userid = session.user.userid;
   conn.query("select capacity, waitlist, enrolled_count, waitlist_count , status from courses where courseid = "+ mysql.escape(req.body.courseid), function(err, result)
   {
      if(err){
         res.status(500).send('Something went wrong...try again later...')
      }
      else
        { 
           if(result[0].status === 'Available')
           {
              var course_status = 'Enrolled';
               var insert = "Insert into enrollement_status  ( student_id , courseid, enrollement_status)  values ( " + mysql.escape(req.session.user.userid) + " , " + mysql.escape(req.body.courseid)+ " , " + mysql.escape(course_status) + ")";
               conn.query(insert, function(err, insert_result)
               { 
                  if(err)
                  {
                     console.log(err);
                     res.status(500).send('Something went wrong...try again later...')
                  }
                  else
                  {
                     var course_status = result[0].capacity > (result[0].enrolled_count+1) ? "Available" : "Waitlisted";
                     var update =  "UPDATE courses SET enrolled_count= "  + mysql.escape(result[0].enrolled_count+1) + " , status = " + mysql.escape(course_status) + " where courseid = " + mysql.escape(req.body.courseid)
                     console.log(update);
                     conn.query(update, function(err, result){
                        if(err)
                        {
                           console.log(err);
                           res.status(500).send('Something went wrong...try again later...')
                        }
                        else
                           res.end('Enrolled');
                     })      
                  }
               
               });           
           }
           else if(result[0].status === 'Waitlisted')
           {
               if(result[0].waitlist_count < result[0].waitlist)
               {
                  var course_status = 'Waitlisted';
                  var insert = "Insert into enrollement_status  ( student_id , courseid, enrollement_status)  values ( " + mysql.escape(userid) + " , " + mysql.escape(req.body.courseid)+ " , " + mysql.escape(course_status) + ")";
                  conn.query(insert, function(err, insert_result)
                  { 
                     if(err)
                     {
                        console.log(err);
                        res.status(500).send('Something went wrong...try again later...')
                     }
                     else
                     {
                        var course_status = result[0].waitlist > (result[0].waitlist_count+1) ? "Waitlisted" : "Full";
                        var update =  "UPDATE courses SET waitlist_count= "  + mysql.escape(result[0].waitlist_count+1) + " , status = " + mysql.escape(course_status) + " where courseid = " + mysql.escape(req.body.courseid);
                        conn.query(update, function(err, result){
                           if(err)
                           {
                              console.log(err);
                              res.status(500).send('Something went wrong...try again later...')
                           }
                           else
                              res.end('Waitlisted');
                        })      
                     }        
                  });    
               }      
           }
           else if(result[0].status === 'Full')
           {
            res.end('Sorry..The course is full and not available to enroll');
           }
        }
   });
});
app.post('/searchCourse', function(req, res, next){
   if(req.body.cname && req.body.cterm)
      var select = "select * from courses where dept like '%" + req.body.cdept + "%' and nickname " + req.body.value + req.body.cnumber + " and name like '%" + req.body.cname + "%' and term like '%" + req.body.cterm + "%' "
   else
      var select = "select * from courses where dept like '%" + req.body.cdept + "%' and nickname " + req.body.value + req.body.cnumber + " and courseid not in ( select courseid from enrollement_status where student_id = " + mysql.escape(req.session.user.userid) + ")"; 
   conn.query(select, function(err, result){
      if(err){
       console.log(err);
        res.status(500).send('Something went wrong...try again later...')
      }
      else
      {
         res.writeHead(200, {'Content-Type':'text/plain'})
         res.end(JSON.stringify(result));
      }
   })
});
app.post('/dropcourse', function(req, res, next)
{
   var studentid = req.body.studentid ?  req.body.studentid : req.session.user.userid;
   var deleteq = "Delete from enrollement_status where courseid = " + mysql.escape(req.body.courseid) + " and student_id = " +  mysql.escape(studentid);
   console.log(deleteq)
   conn.query(deleteq, function(err, result){
      if(err){
       console.log(err);
       res.status(500).send('Something went wrong...try again later...')
      }
      else
      {
         console.log('Student with student id : '+ studentid +'Successfully removed from the course');
         res.end('Student with student id : '+ studentid +'Successfully removed from the course');
      }
         
      conn.query("select capacity, waitlist, enrolled_count, waitlist_count , status from courses where courseid = "+ mysql.escape(req.body.courseid), function(err, selectresult)
      {
         if(err){
            console.log(err);
            res.status(500).send('Something went wrong...try again later...')
         }
         else 
         {
            if(selectresult[0].status === 'Full')
            {
               var course_status = "Waitlisted" ;
               var update =  "UPDATE courses SET waitlist_count= "  + mysql.escape(selectresult[0].waitlist_count-1) + " , status = " + mysql.escape(course_status) + " where courseid = " + mysql.escape(req.body.courseid);
               conn.query(update, function(err, result){
                  if(err)
                  {
                     console.log(err);
                     res.status(500).send('Something went wrong...try again later...')
                  }
               })                
            }
            else if(selectresult[0].status === 'Waitlisted')
            {
               if(selectresult[0].waitlist_count  > 0)
               {
                  var course_status = "Waitlisted";
                  var update =  "UPDATE courses SET waitlist_count= "  + mysql.escape(selectresult[0].waitlist_count-1) + " , status = " + mysql.escape(course_status) + " where courseid = " + mysql.escape(req.body.courseid);
                  
               }
               else if(selectresult[0].waitlist_count  ===  0)
               {
                  var course_status = "Available";
                  var update =  "UPDATE courses SET enrolled_count= "  + mysql.escape(selectresult[0].enrolled_count-1) + " , status = " + mysql.escape(course_status) + " where courseid = " + mysql.escape(req.body.courseid);
                  
               }
               conn.query(update, function(err, result){
                  if(err)
                  {
                     console.log(err);
                     res.status(500).send('Something went wrong...try again later...')
                  }
               })                
            }
            else if(selectresult[0].status === 'Available' && selectresult[0].enrolled_count>0)
            {
               var course_status =  "Available";                 
               var update =  "UPDATE courses SET enrolled_count= "  + mysql.escape(selectresult[0].enrolled_count-1) + " , status = " + mysql.escape(course_status) + " where courseid = " + mysql.escape(req.body.courseid);
               conn.query(update, function(err, result)
               {
                  if(err)
                  {
                     console.log(err);
                     res.status(500).send('Something went wrong...try again later...')
                  }
               })                
            }              
         }
      });
       
   })



});
app.post('/upload', upload.single('myFile'), (req, res) => {
   var createdBy = req.session.user.name;
   var dt = dateTime.create();
   var createdDate = dt.format('Y-m-d H:M:S');
   console.log(req.file);
   if (req.file) {
      var insert = "Insert into files  (name, dbname, type, size, path , courseid, createdAt, createdBy )  values ( " + mysql.escape(req.file.originalname) + " , " + mysql.escape(req.file.filename) +" , "+ mysql.escape(req.file.mimetype)+ " , " + mysql.escape(req.file.size)+ " , "+ mysql.escape(req.file.path)+" , "  + mysql.escape(req.body.courseid) + " , "  + mysql.escape(createdDate) + " , " + mysql.escape(createdBy)+")";
      conn.query(insert, function(err, result){
         console.log( result[0])
         if(err){
          console.log(err);
        res.status(500).send('Something went wrong...try again later...')
         }
         else 
            res.status(200).json({success: true, file:  result[0]}); 

      })
   } 
   else {
       console.log('No File Uploaded');
       var filename = 'FILE NOT UPLOADED';
       var uploadStatus = 'File Upload Failed';
   }
});

app.get('/files', function(req,res){
   
   var select = "select fileid , name , createdAt, createdBy , size from files where courseid = " + mysql.escape(req.query.id) ;
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



// define a route to download a file 
app.get('/downloadfile',(req, res) => {
   console.log(req.query.id);
   var select = "select * from files where fileid = " + mysql.escape(req.query.id) ;
   conn.query(select, function(err, result){
      if(err){
       console.log(err);
        res.status(500).send('Something went wrong...try again later...')
      }
      else
      {
         var file = result[0].name;
         var filelocation = path.join(__dirname + '/uploads', file);
         console.log(filelocation);
         var img = fs.readFileSync(filelocation);
         var base64img = new Buffer(img).toString('base64');
         res.writeHead(200, {
             'Content--type':  result[0].type
         });
         res.end(base64img);
      }
   })

 });


app.post('/deleteFile', function(req,res){
   var deleteq = "Delete from files where fileid = "  + mysql.escape(req.body.fileid) ;
       conn.query(deleteq, function(err, result){
      if(err){
       console.log(err);
        res.status(500).send('Something went wrong...try again later...')
      }
      else{
         res.writeHead(200, {'Content-Type':'text/plain'});
         res.end("File deleted successfully");        
      }
   })
});

app.post('/quiz', function(req, res, next){
   var insert = "Insert into quiz  ( title , content, noOfQuestions ,dueDate,courseId,marks, activeflag)  values ( " + mysql.escape(req.body.name) + " , " + mysql.escape(req.body.html)+  " , "  + mysql.escape(req.body.noofquestions) + " , "  + mysql.escape(req.body.dueDate) +" , "+ mysql.escape(req.body.courseid)+ ", "  + mysql.escape(req.body.points) + " , "   + mysql.escape(1)+")";
   conn.query(insert, function(err, result){
      if(err){
       console.log(err);
        res.status(500).send('Something went wrong...try again later...')
      }
      else
        res.end('Quiz details added successfully');
   })
});
app.get('/showquizzes', function(req,res){
   var select = "select * from quiz where courseid = " + mysql.escape(req.query.id) + " and  activeflag = 1"  ;
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
app.get('/quizinfo', function(req,res){
   var select = "select * from quiz where quizid = " + mysql.escape(req.query.id) ;
   conn.query(select, function(err, result){
      if(err){
       console.log(err);
        res.status(500).send('Something went wrong...try again later...')
      }
      else 
         res.status(200).json({success: true, quizdata:  result[0]}); 
   })
});
app.get('/quizquestions', function(req,res){
   console.log(req.query.id)
   var select = "select * from quiz_questions where quizid = " + mysql.escape(req.query.id) ;
   conn.query(select, function(err, result){
      if(err){
       console.log(err);
        res.status(500).send('Something went wrong...try again later...')
      }
      else{
         res.writeHead(200, {'Content-Type':'text/plain'});
         console.log(result)
         res.end(JSON.stringify(result));        
      }
   })
});
app.get('/showquestions', function(req,res){
   var select = "select * from quiz_questions where quizid = " + mysql.escape(req.query.id) ;
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
app.post('/generateQuiz', function(req,res){
   var insert = "Insert into quiz  ( courseId)  values ( "   + mysql.escape(req.body.courseid) +  ")";
   conn.query(insert, function(err, result){
      if(err){
       console.log(err);
        res.status(500).send('Something went wrong...try again later...')
      }
      else{
         res.writeHead(201, {'Content-Type':'text/plain'});
         res.end(JSON.stringify(result));        
      }
   })
});
app.post('/updateQuestion', function(req,res){
   var insert = "Insert into quiz_questions  (quizid, question, option1, option2, option3, option4, answer, courseid )  values ( "+ mysql.escape(req.body.quizid) + " , " + mysql.escape(req.body.editorHtml) + " , " + mysql.escape(req.body.op1)+ " , " + mysql.escape(req.body.op2)+ " , "  + mysql.escape(req.body.op3) + " , "  + mysql.escape(req.body.op4)  + " , " + mysql.escape(req.body.correctop)+ " , " + mysql.escape(req.body.courseid)+")";
   conn.query(insert, function(err, result){
      if(err){
       console.log(err);
        res.status(500).send('Something went wrong...try again later...')
      }
      else
        res.end('Quiz details added successfully');
   })
});
app.delete('/deleteCourse/:id', function(req, res, next){

   var sql ="Delete from courses where courseid = " + mysql.escape(req.param.id);
   conn.query(sql, function(err, result){
      if(err){
       console.log(err);
        res.status(500).send('Something went wrong...try again later...')
      }
      else
        res.end('Course deleted successfully');
   })
});

app.post('/submitMarks', function(req,res){

   console.log(req.body.studentid)
   var select = "select * from assignment_marks where course_id = " + mysql.escape(req.body.courseid)+ " and student_id = " + mysql.escape(req.body.studentid)+ "  and assignment_id = " + mysql.escape(req.body.assignmentid);
   conn.query(select, function(err, result){
      if(err){
       console.log(err);
        res.status(500).send('Something went wrong...try again later...')
      }
      else{
         console.log(result)
         console.log(result.length );
         if(result.length == 1)
         {
            console.log(result[0].id)
            var update = "update assignment_marks set marks_obtained = "+ mysql.escape(req.body.points)+ " where id = " + result[0].id;
            conn.query(update, function(err, result){
               if(err){
                console.log(err);
                 res.status(500).send('Something went wrong...try again later...')
               }
               else
                 res.end('Quiz details added successfully');
            })
         }
         else{
            var insert = "Insert into assignment_marks  (course_id, assignment_id, student_id, marks_obtained )  values ( "+ mysql.escape(req.body.courseid) + " , " + mysql.escape(req.body.assignmentid) + " , " + mysql.escape(req.body.studentid)+ " , " + mysql.escape(req.body.points)+ ")";
            conn.query(insert, function(err, result){
               if(err){
                console.log(err);
                 res.status(500).send('Something went wrong...try again later...')
               }
               else
                 res.end('Quiz details added successfully');
            })
         }
      }
   })
});

app.get('/assignmentgrades', function(req,res){
var studentid = req.session.user.userid;
console.log(req.session.user.name)
var select = "SELECT assignmentdetails.name,assignmentdetails.dueDate, assignmentdetails.points , assignment_marks.marks_obtained FROM assignmentdetails INNER JOIN assignment_marks ON assignmentdetails.assignmentid = assignment_marks.assignment_id WHERE assignment_marks.student_id =" +  mysql.escape(studentid) + " and assignmentdetails.courseid = " +  mysql.escape(req.query.id)  ;
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

app.get('/quizgrades', function(req,res){
   var studentid = req.session.user.userid;
   console.log(req.session.user.name)
   var select = "SELECT quiz.title,quiz.dueDate, quiz.marks , quiz_marks.marks_obtained FROM quiz INNER JOIN quiz_marks ON quiz.quizid = quiz_marks.quiz_id WHERE quiz_marks.student_id =" +  mysql.escape(studentid) + " and quiz.courseid = " +  mysql.escape(req.query.id)  ;
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
app.get('/totalgrades', function(req,res){
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

app.post('/people', function(req,res){

   var select = "SELECT users.userid , users.name , users.role , users.email,  users.userid from users INNER JOIN enrollement_status on users.userid = enrollement_status.student_id WHERE enrollement_status.courseid = " +  mysql.escape(req.body.courseid);
         conn.query(select, function(err, result){
         if(err){
         console.log(err);
         res.status(500).send('Something went wrong...try again later...')
         }
         else{
            console.log(result);
            res.writeHead(200, {'Content-Type':'text/plain'});
            res.end(JSON.stringify(result));        
         }
      })
   });

app.get('/pnr', function(req, res, next){
   for(var i=0; i<20; i++)
   {
      var random = Math.floor((Math.random() * 1000000) + 1);
      console.log('PNR: ' + random);
      var insert = "Insert into pnr_code  ( course_id , pnr_num)  values ( " + mysql.escape(req.query.id) + " , " + mysql.escape(random)+")";
      conn.query(insert, function(err, result){
         if(err){
            console.log(err);
            res.status(500).send('Something went wrong...try again later...')
         }
      })
   }
   res.end('Permission Number Code generated successfully');
});
app.listen(3001);
module.exports = app
