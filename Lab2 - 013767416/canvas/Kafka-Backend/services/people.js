var Model = require('../DatabaseConnection');
function handle_request(msg, callback){
    //console.log(msg.email)
    Model.Coursedetails.findOne({_id: msg.query.id }).populate('Students').then(course=>{
        if(!course)
        {
            console.log("Unable to fetch user details.", err);
            callback(err, null);
        }
        else{
            console.log('Course Data: ', course.Students);
            callback(null, course.Students);
        }
    }
    );
}
exports.handle_request = handle_request;
