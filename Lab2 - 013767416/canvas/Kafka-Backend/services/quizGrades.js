//const Course = require('../Model/Course');
//const User = require('../Model/User');
var Model = require('../DatabaseConnection');

function handle_request(msg, callback){
    Model.Userdetails.findOne({'Email':msg.session.user.Email}).populate('Quizmarks').then(user=>{
        if(!user)
        {
            console.log("Unable to fetch user details.");
            //callback(err, null);
        }
        else{
            let quizmarksArray= user.Quizmarks;
            let result=[];
            for(var i = 0; i< quizmarksArray.length;i++)
            {
               if(quizmarksArray[i].Courseid === msg.query.id)
               {
                   console.log(quizmarksArray[i] )
                   result.push(quizmarksArray[i])
               }
            }            
            console.log(result)
            callback(null, result);
        }
    }
    );
}
exports.handle_request = handle_request;
