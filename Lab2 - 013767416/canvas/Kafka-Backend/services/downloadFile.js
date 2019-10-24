var Model = require('../DatabaseConnection');


function handle_request(message, callback) {
    console.log(message.id)
    Model.Filedetails.find({
       _id: message.id    
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