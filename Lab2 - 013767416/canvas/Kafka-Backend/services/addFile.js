var Model = require('../DatabaseConnection');
var dateTime = require('node-datetime');

function handle_request(msg, callback){
 
  Model.Coursedetails.findOne( { _id: msg.body.courseid}, (err, course) => {
    console.log(msg.body.courseid);
    if (err) {
        console.log("Unable to fetch course details.", err);
        callback(err, null);
    }

    else {
      var dt = dateTime.create();
      var createdDate = dt.format('Y-m-d H:M:S');
      var file =   new Model.Filedetails(
          {
            Name: msg.file.originalname,
            Type:msg.file.mimetype,
            Path:msg.file.path,
            Size: msg.file.size,
            CreatedAt:createdDate,
            CreatedBy: msg.session.user.Name,
            Courseid:msg.body.courseid
          }
      );
      file.save().then((file) => {
         console.log(file.id);
          course.Files.push(file.id);
          course.save().then((doc) => {
              //callback(null, doc);           
          }, (err) => {
              callback(err, null);
          });
          callback(null, file);
      }, (err) => {
          callback(err, null);
      });            
    }
});
}


exports.handle_request = handle_request;