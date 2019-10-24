var Model = require('../DatabaseConnection');


function handle_request(message, callback) {
    //console.log(message.id)
    Model.Quizdetails.find({
        Courseid: message.query.id     
    }, (err, quiz) => {
        if(err){
            callback(err, null);
        }
        else{
            callback(null, quiz);
        }
    });
}

exports.handle_request = handle_request;