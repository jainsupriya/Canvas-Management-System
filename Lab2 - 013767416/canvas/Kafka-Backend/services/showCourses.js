//const Course = require('../Model/Course');
//const User = require('../Model/User');
var Model = require('../DatabaseConnection');

function handle_request(msg, callback){
    //console.log(msg.email)
    Model.Userdetails.findOne({'Email':msg.session.user.Email}).populate('Courses').then(user=>{
        if(!user)
        {
           console.log("Unable to fetch user details.");
            //callback(err, null);
        }
        else{
           // console.log('Course Data: ', user.Courses);
            callback(null, user.Courses);
        }
    }
    );
}
exports.handle_request = handle_request;
