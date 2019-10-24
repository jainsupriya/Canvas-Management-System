
 var Model = require('../DatabaseConnection');
 var dateTime = require('node-datetime');
 function handle_request(msg, callback){
  
   Model.Coursedetails.findOne( { _id: msg.body.courseid}, (err, course) => {
     if (err) {
         console.log("Unable to fetch course details.", err);
         callback(err, null);
     }
     else {
       var dt = dateTime.create();
       var createdDate = dt.format('Y-m-d H:M:S');
       var createdBy = msg.session.user.Name
       let announcement = new Model.Announcementdetails({
            Title: msg.body.topic,
            Content:msg.body.html,
            CreatedBy:createdBy,
            CreatedAt:createdDate,
            Courseid:msg.body.courseid
        });
        announcement.save().then((announcement) => {
           course.Announcements.push(announcement.id);
           course.save().then((doc) => {
               //callback(null, doc);           
           }, (err) => {
               callback(err, null);
           });
           callback(null, announcement);
       }, (err) => {
           callback(err, null);
       });            
     }
 });
 }
 
 
 exports.handle_request = handle_request;
