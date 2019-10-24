var Model = require('../DatabaseConnection');
var dateTime = require('node-datetime');

function handle_request(msg, callback){
 
  Model.Coursedetails.findOne( { _id: msg.body.courseid}, (err, course) => {
    if (err) {
        console.log("Unable to fetch course details.", err);
        callback(err, null);
    }
    else {
      var quiz =   new Model.Quizdetails(
          {
            Title: msg.body.title,
            Content:msg.body.html,
            NoOfQuestions:msg.body.noOfQuestions,
            DueDate:msg.body.dueDate,
            Marks:msg.body.points,
            Courseid:msg.body.courseid
          }
      );
      quiz.save().then((quiz) => {
          course.Quizzes.push(quiz.id);
          course.save().then((doc) => {       
          }, (err) => {
              callback(err, null);
          });
          callback(null, quiz.id);
      }, (err) => {
          callback(err, null);
      });            
    }
});
}


exports.handle_request = handle_request;