var Model = require('../DatabaseConnection');

function handle_request(message, callback){
    //console.log('Inside Kafka Method update-profile. message ', message);

    Model.Userdetails.findOne({
        'Email': message.session.user.Email
    }, (err, user) => {

        if (err) {
            console.log("Unable to fetch user details.", err);
            callback(err, null);
        }
        else {
            console.log('Userdetails', user);
            console.log(message.body);
            user.Name = message.body.name;
            user.Aboutme = message.body.aboutme;
            user.Email = message.body.email;
            user.City = message.body.city;
            user.Gender = message.body.gender;
            user.Phone = message.body.phone;
            user.Hometown = message.body.hometown;
            user.School = message.body.school;
            user.Company = message.body.company;
            user.Language = message.body.languages;
            user.Country = message.body.country;
            user.ProfileImage = message.body.profilepic;

            user.save().then((doc) => {
                console.log("User details saved successfully.", doc);
                callback(null, doc);

            }, (err) => {
                console.log("Unable to save user details.", err);
                callback(err, null);
            });
        }
    });
}

exports.handle_request = handle_request;

