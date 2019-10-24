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
      var assignment =   new Model.Assignmentdetails(
          {
            Name: msg.body.name,
            Content:msg.body.html,
            Points:msg.body.points,
            DueDate:createdDate,
            Courseid:msg.body.courseid
          }
      );
      assignment.save().then((assignment) => {
         console.log(assignment.id);
          course.Assignments.push(assignment.id);
          course.save().then((doc) => {       
          }, (err) => {
              callback(err, null);
          });
          callback(null, assignment);
      }, (err) => {
          callback(err, null);
      });            
    }
});
}


exports.handle_request = handle_request;