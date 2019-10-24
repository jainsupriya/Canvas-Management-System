'use strict';
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
//var db = require('../app/db');
var Model = require('../DatabaseConnection');
//var config = require('./settings');
const secret = "canvas273";

// Setup work and export for the JWT passport strategy
module.exports = function (passport) {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: secret
    };
    passport.use(new JwtStrategy(opts, function (jwt_payload, callback) {
        console.log(jwt_payload)
        Model.Userdetails.findOne({ 
            'Email': jwt_payload.email 
        }, (err, res) => {
           
                if (res) {
                    var user = res;
                    delete user.Password;
                    console.log(user)
                    callback(null, user);
                }
                else {
                    callback(err, false);
                }
            });
    }));
};
