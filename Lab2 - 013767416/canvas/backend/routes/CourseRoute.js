var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
var Model = require('../DatabaseConnection');
var requireAuth = passport.authenticate('jwt', {session: false});
//Kafka
var kafka = require('../kafka/client');

router.get('/', function(req,res){  
   //console.log(requireAuth)
    kafka.make_request("showCourses", req, function(err, result){
      if(err){
          console.log("Unable to fetch user details.", err);
          res.writeHead(500, {
              'Content-type': 'text/plain'
          });
          res.end('Error in fetching user details!');
      }
      else{
          res.writeHead(200, {
              'Content-type': 'application/json'
          });
          res.end(JSON.stringify(result));
      }
    });
 });
 router.post('/', function(req, res){
      kafka.make_request("addCourse", req, function(err, result){
        if(err){
            console.log("Unable to fetch user details.", err);
            res.status(500).send('Error while creating course')
        }
        else
        {
            res.status(200).send("Course added successfully");
        }
    });
 });


 router.get('/coursedetail/', function(req,res){
    kafka.make_request("course-details", req, function(err, result){
        if(err){
          console.log(err);
          res.status(500).send('Something went wrong...try again later...')
        }
        else {
            res.writeHead(200, {'Content-Type':'text/plain'});
            res.end(JSON.stringify(result));    
        }
      });
 });
 
 router.post('/search', function(req, res){
        kafka.make_request("searchCourse", req, function(err, result){
        if(err){
            console.log("Unable to fetch user details.", err);
            res.status(500).send('Error while creating course')
        }
        else
        {
            res.writeHead(200, {'Content-Type':'text/plain'})
            res.end(JSON.stringify(result));
        }
    });

 });

 router.post('/drop', function(req, res){
   kafka.make_request("dropCourse", req, function(err, result){
   if(err){
       res.status(500).send('Error while dropping a course')
   }
   else
      res.status(200).send('Course droppped Successfully')
});

});
router.post('/enroll', function(req,res){
  kafka.make_request("enroll", req, function(err, result){
    if(err)
      res.status(200).send('Erro while enrolling for the course')
    else 
      res.status(200).send('Successfully Enrolled for the course')
});   
});

 module.exports = router;


 /*



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
 
*/ 