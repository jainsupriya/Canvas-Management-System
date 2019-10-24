var Model = require('../DatabaseConnection');


function handle_request(message, callback) {
    Model.Filedetails.find({
       courseid: message.query.courseid     
    }, (err, result) => {
        if(err){
            callback(err, null);
        }
        else{
            callback(null, result);
        }
    });
}

exports.handle_request = handle_request;