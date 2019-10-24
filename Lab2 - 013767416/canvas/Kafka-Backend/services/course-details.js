//const Course = require('../Model/Course');
//const User = require('../Model/User');
var Model = require('../DatabaseConnection');

function handle_request(msg, callback){
    Model.Coursedetails.findOne({_id: msg.query.id }).then(course=>{
        if(!course)
        {
            console.log("Unable to fetch user details.", err);
            callback(err, null);
        }
        else{
            console.log('Profile Data: ', course);
            callback(null, course);
        }
    }
    );
}
exports.handle_request = handle_request;
