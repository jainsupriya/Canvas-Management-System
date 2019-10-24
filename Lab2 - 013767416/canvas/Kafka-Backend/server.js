var connection = require('./kafka/Connection');
var signup = require('./services/signup');
var login = require('./services/login');
var enroll = require('./services/enroll');
var profile = require('./services/profile');
var updateProfile = require('./services/updateProfile');
var assignmentGrades =  require('./services/assignmentGrades');
var quizGrades =  require('./services/quizGrades');
var submitQuiz =  require('./services/submitQuiz');
var addCourse = require('./services/addCourse');
var showAssignments = require('./services/showAssignments');
var showCourses = require('./services/showCourses');
var submitAssignment= require('./services/submitAssignment');
var getSubmissions= require('./services/getSubmissions');
var searchCourse = require('./services/searchCourse');
var showQuizzes = require('./services/showQuizzes');
var addQuiz = require('./services/addQuiz');
var saveQuizQuestions = require('./services/saveQuizQuestions');
var updateQuiz = require('./services/updateQuiz');
var getMessages= require('./services/getMessages');
var sendMessage= require('./services/sendMessage');
var getAllSubmissions= require('./services/getAllSubmissions');
var latestSubmissions=  require('./services/latestSubmissions');
var addAssignment = require('./services/addAssignment');
var gradeSubmission = require('./services/gradeSubmission');
var course = require('./services/course-details');
var addAnnouncement = require('./services/addAnnouncement');
var addFile = require('./services/addFile');
var searchCourse = require('./services/searchCourse');
var showAnnouncements = require('./services/showAnnouncements');
var showFiles = require('./services/showFiles');
var downloadFile= require('./services/downloadFile');
var people= require('./services/people');
var deleteAssignment= require('./services/deleteAssignment');


function handleTopicRequest(topic_name, function_name){

    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();

    //console.log('server is running');
    consumer.on('message', function(message){
        //console.log('message recieved for ' + topic_name + " " + function_name);
        //console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);

        function_name.handle_request(data.data, function(err, res){
            //console.log('After request handling: ', res);
            var payload = [{
                topic: data.replyTo,
                messages: JSON.stringify({
                    correlationId : data.correlationId,
                    data : res
                }),
                partition: 0
            }];

            producer.send(payload, function(err, data){
               //console.log('Data: ', data);
            });
            return;

        });
    });
}

handleTopicRequest("showCourses", showCourses);
handleTopicRequest("addCourse", addCourse);
handleTopicRequest("login", login);
handleTopicRequest("getMessages", getMessages);
handleTopicRequest("sendMessage", sendMessage);
handleTopicRequest("signup", signup);
handleTopicRequest("profile", profile);
handleTopicRequest("searchCourse", searchCourse);
handleTopicRequest("enroll", enroll);
handleTopicRequest("addQuiz", addQuiz);
handleTopicRequest("saveQuizQuestions", saveQuizQuestions);
handleTopicRequest("updateQuiz", updateQuiz);
handleTopicRequest("updateProfile", updateProfile);
handleTopicRequest("showQuizzes", showQuizzes);
handleTopicRequest("latestSubmissions", latestSubmissions);
handleTopicRequest("addAssignment", addAssignment);
handleTopicRequest("course-details", course);
handleTopicRequest("addAnnouncement", addAnnouncement);
handleTopicRequest("addFile", addFile);
handleTopicRequest("searchCourse", searchCourse);
handleTopicRequest("showAnnouncements", showAnnouncements);
handleTopicRequest("showAssignments", showAssignments);
handleTopicRequest("showFiles", showFiles);
handleTopicRequest("downloadFile", downloadFile);
handleTopicRequest("people", people);
handleTopicRequest("deleteAssignment", deleteAssignment);
handleTopicRequest("submitAssignment", submitAssignment);
handleTopicRequest("getSubmissions", getSubmissions);
handleTopicRequest("getAllSubmissions", getAllSubmissions);
handleTopicRequest("gradeSubmission", gradeSubmission);
handleTopicRequest("submitQuiz", submitQuiz);
handleTopicRequest("quizGrades", quizGrades);
handleTopicRequest("assignmentGrades", assignmentGrades);