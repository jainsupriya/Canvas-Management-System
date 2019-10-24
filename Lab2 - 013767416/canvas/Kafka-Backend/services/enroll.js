//const Course = require('../Model/Course');
//const User = require('../Model/User');
var Model = require('../DatabaseConnection');

function handle_request(msg, callback){
    Model.Coursedetails.findOne( { _id: msg.body.courseid}, (err, course) => {
    if (err) {
        console.log("Unable to fetch course details.", err);
        callback(err, null);
    }
    else {
        if(course.Status==="Available")
        {
            Model.Userdetails.findOne({'Email':  msg.session.user.Email}, (err, user) => {
                if (err) {
                    console.log("Unable to fetch user details.", err);
                    callback(err, null);
                }
                else {
                    user.Courses.push(msg.body.courseid);
                    user.save().then((user) => {
                        console.log("User saved successfully.", user);     
                        course.Students.push(user.id);
                        //callback(null, doc); 
                        course.save().then((course) => {       
                        }, (err) => {
                            callback(err, null);
                        });          
                    }, (err) => {
                        console.log("Unable to save user details.", err);
                        callback(err, null);
                    });
                }
            });              
        }
    }
});
}
exports.handle_request = handle_request;