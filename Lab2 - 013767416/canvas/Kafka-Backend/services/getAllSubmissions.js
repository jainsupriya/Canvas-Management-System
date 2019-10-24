//const Course = require('../Model/Course');
//const User = require('../Model/User');
var Model = require('../DatabaseConnection');

function handle_request(msg, callback){
    //console.log(msg.email)
    Model.Userdetails.findOne({'Email': msg.session.user.Email}).populate('Submissions').then(user=>{
        if(!user)
        {
            console.log("Unable to fetch user details.", err);
            callback(err, null);
        }
        else{
            console.log('Submission data Data: ', user.Submissions);
            let submissions =  user.Submissions.filter(submission => {
                return submission.Assignmentid === msg.query.id });
            console.log('Submission data Data: ', submissions);
            callback(null, submissions);
        }
    }
    );
}
exports.handle_request = handle_request;
