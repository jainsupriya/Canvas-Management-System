var Model = require('../DatabaseConnection');

function handle_request(msg, callback) {
    Model.LatestSubmissionDetails.findOneAndUpdate({ 
        Assignmentid:msg.body.assignmentid,
        Userid: msg.body.studentid
    },
    {
        $set: {
        MarksObtained: msg.body.points
        }
    },
    function(err,submission) {
            if (err) {        
                console.log(err)            
                callback(null,err);

            } else 
            {
                console.log(submission)
                callback(null,submission);
            } 
        }
    );
}

exports.handle_request = handle_request;