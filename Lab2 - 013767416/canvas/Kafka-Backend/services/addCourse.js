var Model = require('../DatabaseConnection');

function handle_request(msg, callback){
    var course =   new Model.Coursedetails({
        Name:msg.body.name,
        Dept:msg.body.dept,
        Nickname:msg.body.nickname,
        Dept:msg.body.dept,
        Desc:msg.body.desc,
        Room:msg.body.room,
        Capacity:msg.body.capacity,
        Waitlist:msg.body.waitlist,
        Term:msg.body.term,
       CreatedBy: msg.session.user.Name,
       //CreatedBy: "Prof Zang",
        Status:"Available"
    });
    
    course.save().then((doc) => {
        //callback(null, doc);
        Model.Userdetails.findOne({'Email':msg.session.user.Email}, (err, user) => {
            if (err) {
                //console.log("Unable to fetch user details.", err);
                callback(err, null);
            }
            else {
                user.Courses.push(doc.id);
                user.save().then((doc) => {
                    //console.log("User saved successfully.", doc);     
                    callback(err, "course added");   
                }, (err) => {
                    //console.log("Unable to save user details.", err);
                });
            }
        });  

    }, (err) => {
        //console.log("Unable to save course details.", err);
        callback(err, null);
    });
}
exports.handle_request = handle_request;