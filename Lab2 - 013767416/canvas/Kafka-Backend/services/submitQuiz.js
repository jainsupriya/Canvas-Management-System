var Model = require('../DatabaseConnection');

function handle_request(message, callback) {
    //console.log(message.body.quizid)
    Model.Quizdetails.findOne({
        _id: message.body.quizid     
    }, (err, quiz) => {
        if(err){
            callback(err, null);
        }
        else{
            var givenans = message.body.answers;
            var questions = quiz.Questions
            var correctans= []
            for(var i = 0; i < questions.length; i++) {
                correctans.push(questions[i].correctop);
              }
            var count= 0
            for(var i = 0; i< givenans.length;i++)
            {
               if(givenans[i] === correctans[i])
               count++;
            }
            var quizmarks= new Model.QuizMarks({
                Quizname : quiz.Title,
                Duedate :  quiz.Duedate,
                Totalmarks: quiz.Marks,
                MarksObtained: count,
                MarkedAns:  givenans,
                Courseid:quiz.Courseid
            })
            quizmarks.save().then((quizmarks) => {
                Model.Userdetails.findOneAndUpdate({ 
                    Email: message.session.user.Email
                },
                {
                    $push: {
                        Quizmarks: quizmarks
                    }
                },
                function(err,user) {
                        if (err) {        
                            console.log(err)            
                            callback(null,err);
            
                        } else 
                        {
                           // console.log(user)
                            callback(null,quizmarks);
                        } 
                    }
                );                
            }, (err) => {
                console.log("Unable to save quiz marks.", err);
            });


        }
    });
}

exports.handle_request = handle_request;