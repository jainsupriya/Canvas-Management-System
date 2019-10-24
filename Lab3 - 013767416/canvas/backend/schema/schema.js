
const graphql = require('graphql');
//const _ = require('lodash');
var Model = require('../DatabaseConnection');
var bcrypt = require('bcrypt-nodejs');
const graphqlisodate= require('graphql-iso-date');
var dateTime = require('node-datetime');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean,
    
} = graphql;


const{
    GraphQLDate,
    GraphQLTime,
    GraphQLDateTime
}=  graphqlisodate;


const CourseType = new GraphQLObjectType({
    name : 'CourseType',
    fields : ()=>({
        '_id': {
            type: GraphQLID
          },
        'Nickname' : {
            type: GraphQLString
        },
        'Name' : {
            type: GraphQLString
        },
        'Dept' : {
            type : GraphQLString
        },
        'Desc' :  {
            type : GraphQLString
        },
        'Room' : {
            type : GraphQLString
        },
        'Capacity' : { 
            type : GraphQLInt
        },
        'Waitlist' : {
            type : GraphQLInt
        },
        'Term' : {
            type : GraphQLString
        },
        'CreatedBy' : {
            type : GraphQLString
        },
        'Enrolled_Count' : {
            type : GraphQLInt
        },
        'Waitlist_Count' : {
            type : GraphQLInt
        },
        'Status' : {
            type : GraphQLString
        },
        'Assignments': {
            type: new GraphQLList(AssignmentType)
          },
        'Assignments': {
        type: new GraphQLList(AnnouncementType)
        },
        'Files':  {type: new GraphQLList(FileType)},
        'Quizzes':  {type: new GraphQLList(QuizType)},
        'Students':  {type: new GraphQLList(UserType)},
})
});

const UserType = new GraphQLObjectType({
    name: 'UserType',
    fields: () => ({
        'Password' : {
            type: GraphQLString
        },
        'Name' : {
            type: GraphQLString
        },
        'Email': {
            type : GraphQLString
        },
        'Role': {
            type : GraphQLString
        },    
        'Aboutme' :  {
            type : GraphQLString
        },
        'Phone':{
            type : GraphQLString
        },
        'Country' : {
            type : GraphQLString
        },
        'City' : { 
            type : GraphQLString
        },
        'Gender' : {
            type : GraphQLString
        },
        'Hometown' : {
            type : GraphQLString
        },
        'School' : {
            type : GraphQLString
        },
        'Company' : {
            type : GraphQLString
        },
        'Languages' : {
            type : GraphQLString
        },
        'ProfileImage' : {
            type : GraphQLString
        },
        'Courses': {
            type: new GraphQLList(CourseType)
          }
    })
});

const AssignmentType = new GraphQLObjectType({
    name: 'AssignmentType',
    fields: () => ({
        'Name' : {
            type: GraphQLString
        },
        'Content' : {
            type: GraphQLString
        },
        'Points' : {
            type : GraphQLInt
        },
        'Published' : {
            type : GraphQLBoolean
        },
        'Courseid': {
            type: GraphQLString
        },
        'DueDate':{
            type: GraphQLDateTime
        }
    })
});
const AnnouncementType = new GraphQLObjectType({
    name: 'AnnouncementType',
    fields: () => ({
        'Title' : {
            type: GraphQLString
        },
        'Content' : {
            type: GraphQLString
        },
        'CreatedBy' : {
            type : GraphQLString
        },
        'CreatedAt' :  {
            type : GraphQLDateTime
        },
        'Courseid': {
            type: GraphQLString
        }
        
    })
});

const FileType = new GraphQLObjectType({
    name: 'FileType',
    fields: () => ({
        'Name' : {
            type: GraphQLString
        },
        'Type' : {
            type: GraphQLString
        },
        'Path' : {
            type : GraphQLString
        },
        'Size' :  {
            type : GraphQLString
        },
        'Courseid': {
            type: GraphQLString
        },
        'CreatedBy' : {
            type : GraphQLString
        },
        'CreatedAt' :  {
            type : GraphQLDateTime
        }
        
    })
});

const QuizType = new GraphQLObjectType({
    name: 'QuizType',
    fields: () => ({
        'Title' : {
            type: GraphQLString
        },
        'Content' : {
            type: GraphQLString
        },
        'NoOfQuestions' : {
            type : GraphQLString
        },
        'Duedate' :  {
            type : GraphQLDateTime
        },
        'Courseid': {
            type: GraphQLString
        },
        'Marks' : {
            type : GraphQLInt
        },
        'Published' :{
            type:GraphQLString
        }
        
    })
});

const loginResult = new GraphQLObjectType({
    name: 'loginResult',
    fields: () => ({
        result: { type: GraphQLBoolean },
        userData: { type: UserType }
    })
});

const signupResult = new GraphQLObjectType({
    name: 'signupResult',
    fields: () => ({
        success: { type: GraphQLBoolean },
        duplicateUser: { type: GraphQLBoolean }
    })
});
const updateProfileResult = new GraphQLObjectType({
    name: 'updateProfileResult',
    fields:()=>({
        success: {type:GraphQLBoolean}
    })
})
const addAssignmentResult = new GraphQLObjectType({
    name : 'addAssignmentResult',
    fields: ()=>({
        success : {type: GraphQLBoolean}
    })
});
const addAnnouncementResult = new GraphQLObjectType({
    name : 'addAnnouncementResult',
    fields: ()=>({
        success : {type: GraphQLBoolean}
    })
});
const addCourseResult = new GraphQLObjectType({
    name : 'addCourseResult',
    fields: ()=>({
        success : {type: GraphQLBoolean}
    })
});
const addFileResult = new GraphQLObjectType({
    name : 'addFileResult',
    fields: ()=>({
        success : {type: GraphQLBoolean}
    })
});
const addQuizResult = new GraphQLObjectType({
    name : 'addQuizResult',
    fields: ()=>({
        success : {type: GraphQLBoolean}
    })
});

const courseResult = new GraphQLObjectType({
    name: 'courseResult',
    fields: ()=>({
        courses : {type: new GraphQLList(CourseType)}
    })
})

const assignmentResult = new GraphQLObjectType({
    name: 'assignmentResult',
    fields: ()=>({
        assignments : {type: new GraphQLList(AssignmentType)}
    })
})
const announcementResult = new GraphQLObjectType({
    name: 'announcementResult',
    fields: ()=>({
        announcements : {type: new GraphQLList(AnnouncementType)}
    })
})
const fileResult = new GraphQLObjectType({
    name: 'fileResult',
    fields: ()=>({
        files : {type: new GraphQLList(FileType)}
    })
})
const quizResult = new GraphQLObjectType({
    name: 'quizResult',
    fields: ()=>({
        quizzes : {type: new GraphQLList(QuizType)}
    })
})



const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        login: {
            type: loginResult,
            args: {
                Email: {
                    type: GraphQLString
                },
                Password: {
                    type: GraphQLString
                }
            },

            async resolve(parent, args) {

                console.log('args: ', args);
                var isAuthenticated = false;
                var profileData = {};
                var courseData={};

                
                await Model.Userdetails.findOne({'Email':args.Email}).populate('Courses').then(user=>{
                    if(!user)
                    {
                        isAuthenticated = false;
                    }
                    else{
                        if (!bcrypt.compareSync(args.Password, user.Password)) {
                            console.log('Invalid Credentials!');
                            //callback(null, null);                
                            isAuthenticated = false;
                        }
                        else {
                            console.log('Corect creds!')
                            isAuthenticated = true;
                            console.log(user.Courses)
                            profileData = user
                            courseData = user.Courses

                        }
                    }
                }
                );


                console.log('isauth', isAuthenticated);
                console.log('Profile Data', profileData);
                if (isAuthenticated == true) {
                    var result = {
                        result: true,
                        userData: profileData,
                        Courses: courseData
                    }
                    console.log('UserData', result.userData);
                }
                else {
                    var result = {
                        result: false
                    }
                }
                return result
            }
        },
        profile:{
            type: UserType,
            args: {
                Email : {
                    type: GraphQLString
                }
            },
            async resolve(parent, args){
                console.log('args: ', args);
                var profileData = {};
                await Model.Userdetails.findOne({
                    "Email" : args.Email
                }, (err, user)=>{
                    if(err){

                    }
                    else{
                        console.log('User details: ', user);
                        profileData = user;
                    }
                });

                return profileData;
            }
        },
        course:{
            type: courseResult,
            args: {
                Email : {
                    type: GraphQLString
                }
            },
      
            async resolve(parent, args){
                var courseData = {};
                await Model.Userdetails.findOne({'Email':args.Email}).populate('Courses').then(user=>{
                    if(!user)
                    {
                        console.log("User Not found" + err);
                    }
                    else{
                        //console.log("User details" + user);
                        courseData=user.Courses
                        console.log("Course Data" + courseData);
                    }
                }
                );
                var resultData = {
                    courses : courseData
                }
                return resultData;
            }
        },
        assignment:{
            type: assignmentResult,
            args: {
                Courseid : {
                    type: GraphQLString
                }
            },
            async resolve(parent, args){
                console.log(args);
                var assignmentData = [];
                await Model.Assignmentdetails.find({
                    "Courseid" : args.Courseid
                }, (err, result)=>{
                    if(err){
                    }
                    else{                      
                        assignmentData = result.concat();
                        console.log('Assignment Data', assignmentData);
                    }                   
                });
                var resultData = {
                    assignments : assignmentData
                }
                return resultData;
            }
        },
        announcement:{
            type: announcementResult,
            args: {
                Courseid : {
                    type: GraphQLString
                }
            },
            async resolve(parent, args){
                console.log(args);
                var announcementData = [];
                await Model.Announcementdetails.find({
                    "Courseid" : args.Courseid
                }, (err, result)=>{
                    if(err){
                    }
                    else{                      
                        announcementData = result.concat();
                        console.log('Announcement Data', announcementData);
                    }                   
                });
                var resultData = {
                    announcements : announcementData
                }
                return resultData;
            }
        },
        file:{
            type: fileResult,
            args: {
                Courseid : {
                    type: GraphQLString
                }
            },
            async resolve(parent, args){
                console.log(args);
                var fileData = [];
                await Model.Filedetails.find({
                    "Courseid" : args.Courseid
                }, (err, result)=>{
                    if(err){
                    }
                    else{                      
                        fileData = result.concat();
                        console.log('File Data', fileData);
                    }                   
                });
                var resultData = {
                    files : fileData
                }
                return resultData;
            }
        },
        quiz:{
            type: quizResult,
            args: {
                Courseid : {
                    type: GraphQLString
                }
            },
            async resolve(parent, args){
                console.log(args);
                var quizData = [];
                await Model.Quizdetails.find({
                    "Courseid" : args.Courseid
                }, (err, result)=>{
                    if(err){
                    }
                    else{                      
                        quizData = result.concat();
                        console.log('Quiz Data', quizData);
                    }                   
                });
                var resultData = {
                    quizzes : quizData
                }
                return resultData;
            }
        },
    })
});


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        signup: {
            type: signupResult,
            args: {
                Name: {
                    type: GraphQLString
                },
                Email: {
                    type: GraphQLString
                },
                Password: {
                    type: GraphQLString
                },
                TeacherCheck:{
                    type:GraphQLBoolean
                }
            },
            
            resolve: (parent, args) => {
                return new Promise(async (resolve, reject) => {
                    var successResult = false;
                var duplicateUserResult = false;
                    await Model.Userdetails.findOne({
                        "Email": args.Email
                    }, (err, user) => {
                        if (err) {

                        }
                        else {
                            if (user) {
                                console.log('User Exists!', user);

                                    console.log('Duplicate user');
                                    duplicateUserResult = true;
                                    
                                    var resultData = {
                                        success: successResult,
                                        duplicateUser: duplicateUserResult
                                    }
                                    resolve(resultData);

                            }
                            else {
                                var user = new Model.Userdetails({
                                    Name: args.Name,
                                    Password: args.Password,
                                    Email: args.Email,
                                    Role: args.TeacherCheck? "Teacher":"Student"
                                });
                                console.log('Use saving..');
                                user.save().then((doc) => {
                                    console.log("User saved successfully.", doc);
                                    successResult = true;
                                    console.log('EOF');
                                    var resultData = {
                                        success: successResult,
                                        duplicateUser: duplicateUserResult
                                    }
                                resolve(resultData);
                                });

                            }
                            
                        }
                    });
                });
            }
        },
        updateProfile: {
            type: updateProfileResult,
            args:{
                'Name' : {
                    type: GraphQLString
                },
                'Email': {
                    type : GraphQLString
                },
                'Role': {
                    type : GraphQLString
                },    
                'Aboutme' :  {
                    type : GraphQLString
                },
                'Phone':{
                    type : GraphQLString
                },
                'Country' : {
                    type : GraphQLString
                },
                'City' : { 
                    type : GraphQLString
                },
                'Gender' : {
                    type : GraphQLString
                },
                'Hometown' : {
                    type : GraphQLString
                },
                'School' : {
                    type : GraphQLString
                },
                'Company' : {
                    type : GraphQLString
                },
                'Languages' : {
                    type : GraphQLString
                },
            },
           async resolve(parent,args){
                await Model.Userdetails.findOne({
                    'Email': args.Email
                }, (err, user) => {
            
                    if (err) {
                        console.log("Unable to fetch user details.", err);
                    }
                    else {
                        user.Name =args.Name;
                        user.Aboutme =args.Aboutme;
                        user.Email =args.Email;
                        user.City =args.City;
                        user.Gender =args.Gender;
                        user.Phone =args.Phone;
                        user.Hometown =args.Hometown;
                        user.School =args.School;
                        user.Company =args.Company;
                        user.Language =args.Languages;
                        user.Country =args.Country;
                        user.save().then((doc) => {
                            console.log("User details saved successfully.", doc);       
                        }, (err) => {
                            console.log("Unable to save user details.", err);
                        });
                    }
                });

                var resultData = {
                    success: true
                }

                return resultData;
            }
        },
        addAssignment: {
            type: addAssignmentResult,
            args: {
                'Name' : {
                    type: GraphQLString
                },
                'Content' : {
                    type: GraphQLString
                },
                'Points' : {
                    type : GraphQLInt
                },
                'DueDate' :  {
                    type : GraphQLDateTime
                },
                'Published' : {
                    type : GraphQLBoolean
                },
                'Courseid': {
                    type: GraphQLString
                }
            },
            resolve: (parent, args) => {
                console.log(args);
                //var success = true;
                Model.Coursedetails.findOne({
                    _id: args.Courseid
                }, function (err, course) {
                    if (err) {
                        console.log("Unable to get Course details.", err);
                    }
                    else {                  
                        var assignment = new Model.Assignmentdetails({
                            Name :args.Name,
                            Content : args.Content,
                            Points :args.Points,
                            DueDate : args.DueDate,
                            Courseid : args.Courseid,
                        });

                        assignment.save().then((assignment) => {
                            console.log(assignment.id);
                             course.Assignments.push(assignment.id);
                             course.save().then((doc) => {       
                             }, (err) => {
                                console.log('err' + err);
                             });
                             console.log('Assignment Saved Successfully', assignment);
                         }, (err) => {
                            console.log('err' + err);
                         });               
                    }
                });

                var assignmentResult = {
                    success : true
                }

                return assignmentResult;

            }
        },
       addAnnouncement: {
            type: addAnnouncementResult,
            args: {
                'Title' : {
                    type: GraphQLString
                },
                'Content' : {
                    type: GraphQLString
                },
                'CreatedBy' : {
                    type : GraphQLString
                },
                'CreatedAt' :  {
                    type : GraphQLDateTime
                },
                'Courseid': {
                    type: GraphQLString
                }
            },
            resolve: (parent, args) => {
                console.log(args);
                //var success = true;
                Model.Coursedetails.findOne({
                    _id: args.Courseid
                }, function (err, course) {
                    if (err) {
                        console.log("Unable to get Course details.", err);
                    }
                    else {        
                        var dt = dateTime.create();
                        var createdDate = dt.format('Y-m-d H:M:S');
                        var createdBy = "Supriya Jain"

                        var announcement = new Model.Announcementdetails({
                            Title: args.Topic,
                            Content:args.Content,
                            CreatedBy:createdBy,
                            CreatedAt:createdDate,
                            Courseid:args.Courseid
                        });

                        announcement.save().then((announcement) => {
                            console.log(announcement.id);
                             course.Announcements.push(announcement.id);
                             course.save().then((doc) => {       
                             }, (err) => {
                                console.log('err' + err);
                             });
                             console.log('Announcement Saved Successfully', announcement);
                         }, (err) => {
                            console.log('err' + err);
                         });               
                    }
                });

                var announcementResult = {
                    success : true
                }
                return announcementResult;
            }
        },

        addCourse: {
            type: addCourseResult,
            args: {

                'Nickname' : {
                    type: GraphQLString
                },
                'Name' : {
                    type: GraphQLString
                },
                'Dept' : {
                    type : GraphQLString
                },
                'Desc' :  {
                    type : GraphQLString
                },
                'Room' : {
                    type : GraphQLString
                },
                'Capacity' : { 
                    type : GraphQLInt
                },
                'Waitlist' : {
                    type : GraphQLInt
                },
                'Term' : {
                    type : GraphQLString
                },
                'CreatedBy' : {
                    type : GraphQLString
                },
                'Enrolled_Count' : {
                    type : GraphQLInt
                },
                'Waitlist_Count' : {
                    type : GraphQLInt
                },
                'Status' : {
                    type : GraphQLString
                },
                'Email':{
                    type : GraphQLString
                }
            },
            resolve: (parent, args) => {
                var createdBy = "Supriya Jain"
                var course =   new Model.Coursedetails({
                    Name: args.Name,
                    Dept: args.Dept,
                    Nickname:args.Nickname,
                    Desc:args.Desc,
                    Room:args.Room,
                    Capacity:args.Capacity,
                    Waitlist:args.Waitlist,
                    Term:args.Term,
                    CreatedBy: createdBy,
                    Status:"Available"
                });
                
                course.save().then((course) => {
                    console.log('Course Saved Successfully', course);
                    Model.Userdetails.findOne({'Email': args.Email}, (err, user) => {
                        if (err) {
                            console.log("Unable to get User details.", err);
                        }
                        else {
                            user.Courses.push(course.id);
                            user.save().then((user) => {
                                console.log('User Saved Successfully', user);
                            }, (err) => {
                                console.log("Unable to save user.", err);
                            });
                        }
                    });  
            
                }, (err) => {
                    console.log("Unable to save course.", err);
                });
                var courseResult = {
                    success : true
                }
                return courseResult;
            }
        },
    })
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});