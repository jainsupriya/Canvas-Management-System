var bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//const User = require('../Model/User');
var Model = require('../DatabaseConnection');

function handle_request(message, callback){

    Model.Userdetails.findOne({
        'Email': message.email
    }, (err, user) => {

        if (err) {
            console.log("Unable to fetch user details.", err);
            callback(err, null);            
        }
        else {
            if (user) {
                console.log('Duplicate user'+ user);
                callback(null, null);

            }
            else {
                //Hashing Password!
                const hashedPassword = bcrypt.hashSync(message.password);
                var role=  message.teacherCheck ? "Teacher" : "Student";
                var user = new Model.Userdetails ({
                    Name:message.name,
                    Email:message.email,
                    Password:hashedPassword,
                    Role: role,
                    Aboutme: '',
                    Country: '',
                    City: '',
                    Gender: '',
                    Hometown: '',
                    School: '',
                    Company: '',
                    Language: '',
                    PhoneNumber: '',
                    ProfileImage: 'unnamed.png',
                });
            user.save().then((doc) => {
                console.log("User added successfully.", doc);
                callback(null, doc);

            }, (err) => {
                console.log("Unable to save user details.", err);
                callback(err, null);
            });
        }

        }

    });
    
}

exports.handle_request = handle_request;