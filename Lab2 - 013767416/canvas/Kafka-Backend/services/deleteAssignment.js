var Model = require('../DatabaseConnection');
var dateTime = require('node-datetime');
function handle_request(msg, callback){
 
    Model.Assignmentdetails.deleteOne({
        _id: msg.assignmentid   
    }, (err, result) => {
        if(err){
            callback(err, null);
        }
        else{
            Model.Coursedetails.update(
                { _id: msg.courseid },
                { $pull: { 'Courses.Assignments': { _id: msg.assignmentid } } }
              );
            callback(null, result);
        }
    });

}


exports.handle_request = handle_request;