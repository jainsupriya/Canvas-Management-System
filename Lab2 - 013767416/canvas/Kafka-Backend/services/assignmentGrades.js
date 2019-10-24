var Model = require('../DatabaseConnection');

function handle_request(message, callback) {
    Model.LatestSubmissionDetails.find({
        Courseid:message.query.id,
        Userid:  message.session.user._id
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