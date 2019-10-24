var Model = require('../DatabaseConnection');


function handle_request(message, callback) {
    Model.LatestSubmissionDetails.find({
        Userid:message.session.user._id,
        Assignmentid:message.query.id
    }, (err, latestsubmission) => {
        if(err){
            callback(err, null);
        }
        else{
            console.log(latestsubmission)
            callback(null, latestsubmission);
        }
    });
}

exports.handle_request = handle_request;