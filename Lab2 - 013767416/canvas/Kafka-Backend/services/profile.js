//const User = require('../Model/User');
var Model = require('../DatabaseConnection');

function handle_request(message, callback){
    Model.Userdetails.findOne({
            'Email': message.session.user.Email
        }, (err, user) => {

            if (err) {
                console.log("Unable to fetch user details.", err);
                callback(err, null);
            }
            else {
            
                console.log('Profile Data: ', user);
                callback(null, user);
            }
        });
}
exports.handle_request = handle_request;