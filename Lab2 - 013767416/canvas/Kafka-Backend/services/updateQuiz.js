var Model = require('../DatabaseConnection');


function handle_request(msg, callback) {
    Model.Quizdetails.findOneAndUpdate({ _id:msg.body.quizid},
    {
      $set: {
        Title: msg.body.name,
        Duedate: msg.body.dueDate,
        NoOfQuestions :msg.body.noofquestions,
        Marks: msg.body.points,
        Content:msg.body.html
      }},
    function(err, quiz) {
            if (err) {        
                console.log(err)            
                callback(null,err);

            } else 
            {
                console.log(quiz)
                callback(null,quiz);
            } 
        }
    );
}

exports.handle_request = handle_request;