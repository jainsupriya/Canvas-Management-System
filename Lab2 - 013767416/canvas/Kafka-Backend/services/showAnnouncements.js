var Model = require('../DatabaseConnection');
function handle_request(message, callback) {
    console.log(message);
    Model.Announcementdetails.find({
        Courseid: message.query.id     
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