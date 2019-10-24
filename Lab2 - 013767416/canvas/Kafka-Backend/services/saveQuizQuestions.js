var Model = require('../DatabaseConnection');
var dateTime = require('node-datetime');
function handle_request(msg, callback){
    console.log(msg)
    Model.Quizdetails.findOneAndUpdate({ _id: msg.body.quizid},
    {
      $set: {
        Questions: msg.body.quizquestions,
      }},
    function(err, quiz) {
    if (err) {        
        console.log(err)            
        callback(null,err);

    } else {
        console.log(quiz)
        callback(null,quiz);
    } 
        }
    );
}


exports.handle_request = handle_request;