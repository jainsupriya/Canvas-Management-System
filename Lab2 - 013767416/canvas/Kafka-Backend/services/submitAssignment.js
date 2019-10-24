var Model = require('../DatabaseConnection');
var dateTime = require('node-datetime');

function handle_request(message, callback) {
    Model.Assignmentdetails.find({
        _id: message.body.assignmentid   
    }, (err, assignment) => {
        if(err){
            callback(err, null);
        }
        else{
            var dt = dateTime.create();
            //console.log(assignment)
            var createdDate = dt.format('Y-m-d H:M:S');
            var submission =   new Model.Submissiondetails(
                {
                  Filename: message.file.originalname,
                  Type:message.file.mimetype,
                  Graded: "No",
                  Submissiontime:createdDate,
                  AssignmentName: assignment[0].Name,
                  Points:assignment[0].Points,
                  Courseid: assignment[0].Courseid,
                  Assignmentid: assignment[0]._id,
                 
                }
            );
  

            submission.save().then((submission) => {

                //console.log(submission)
                Model.Userdetails.findOneAndUpdate({ Email: message.session.user.Email},
                {
                  $push: {
                    Submissions: submission,
                  }},
                function(err, user) 
                {
                        if (err) {        
                            console.log(err)            
                            callback(null,err);

                        } else {
                           // console.log(user)
                            Model.LatestSubmissionDetails.findOne({
                                'Userid': user._id
                            }, (err, submission) => {
                        
                                if (err) {
                                    console.log("Unable to fetch user details.", err);
                                    callback(err, null);
                                }
                                else {
                                    if(submission)
                                    {
                                        submission.AssignmentName= assignment[0].Name,
                                        submission.Points= assignment[0].Points,
                                        submission.Courseid = assignment[0].Courseid,
                                        submission.Submissiontime= createdDate,
                                        submission.Filename= message.file.originalname,
                                        submission.Type= message.file.mimetype,
                                        submission.Graded = "No",
                                        submission.Userid= user._id,
                                        submission.Assignmentid= assignment[0]._id,
                                        submission.MarksObtained= 0,
                                        submission.Username=user.Name,
                                        submission.Duedate= assignment[0].DueDate

                                        submission.save().then((submission) => {

                                            console.log("Submission details saved successfully.", submission);
                                            callback(null, submission);
                            
                                        }, (err) => {
                                            console.log("Unable to save submission details.", err);
                                            callback(err, null);
                                        });
                                    }
                                    else{
                                        var latestsubmission =   new Model.LatestSubmissionDetails(
                                            {
                                                AssignmentName: assignment[0].Name,
                                                Points: assignment[0].Points,
                                                Courseid : assignment[0].Courseid,
                                                Submissiontime: createdDate,
                                                Filename:message.file.originalname,
                                                Type: message.file.mimetype,
                                                Graded : "No",
                                                Userid: user._id,
                                                Assignmentid: assignment[0]._id,
                                                MarksObtained: 0,
                                                Username: user.Name,
                                                Duedate: assignment[0].DueDate
                                            }
                                        );
                                        latestsubmission.save().then((submission) => {

                                            console.log("Latest submission saved successfully.", submission);
                                            callback(null, submission);
                            
                                        }, (err) => {
                                            console.log("Unable to save submission details.", err);
                                            callback(err, null);
                                        });

                                    }
                                }
                            });                          

                        } 
                    }
                );
             }, (err) => {
                console.log(err)
                 callback(err, null);
             });             
        }
    });
}

exports.handle_request = handle_request;


