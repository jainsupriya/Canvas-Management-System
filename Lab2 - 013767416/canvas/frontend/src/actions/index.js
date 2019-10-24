import axios from "axios";

export const SIGNUP_CHECK = "signupCheck";
export const LOGIN_CHECK = "logincheck";
export const PROFILE = "getProfile";
export const  GET_PROFILE_DETAILS= "getProfile";
export const UPDATE_PROFILE_DETAILS = "updateProfile";
export const GET_ASSIGNMENTS = "getAssignments";
export const GET_FILES = "getFiles";
export const GET_QUIZZES= "getQuizzes";
export const GET_ANNOUNCEMENT = "getAnnouncements";
export const GET_PEOPLE = "getPeople";
export const GET_COURSES = "getCourses";
export const CREATE_ANNOUNCEMENT = "createAnnouncement";
export const CREATE_ASSIGNMENT = "createAssignment";
export const CREATE_FILE = "createFile";
export const CREATE_QUIZ = "createQuiz";
export const DELETE_ASSIGNMENT = "deleteAssignment";
export const DELETE_ANNOUNCEMENT = "deleteAnnouncement";
export const DELETE_FILE = "deleteFile";
export const DELETE_COURSE = "deleteCourse";
export const DUPLICATE_USER = "DUPLICATE_USER";
export const GET_SUBMISSIONS = "getSubmissions";


export function getProfile() {
  return async function (dispatch) {
      axios.defaults.withCredentials = true;
      var result = {
          data : {},
          imageData : ""
      }
      await axios.get('/users/profile')
          .then((response) => {
              result.data = response.data;
          })
      dispatch({
          type: GET_PROFILE_DETAILS,
          payload: result
      });            

  }
}

export function getAssignments() {
return async function (dispatch) {
    axios.defaults.withCredentials = true;
        var result;
        axios.get('/assignment', {params : {id :  localStorage.getItem("courseid")}}  ).then(
            res => {
            if(res.status ===200)
            {
                console.log(res)
                result = res.data;
            }
                dispatch({
                    type: GET_ASSIGNMENTS,
                    payload: result
                });                       
            }
        )      
    }
}

  export function getFiles() {
    return async function (dispatch) {
        axios.defaults.withCredentials = true;
        var result;
        console.log("here")
        axios.get('/file', {params : {id :  localStorage.getItem("courseid")}}  ).then(
          res => {
            if(res.status ===200)
            {
                console.log(res)
                result = res.data;
            }
                dispatch({
                    type: GET_FILES,
                    payload: result
                });                       
          }
        )      
    }
  }
  export function getAnnouncements() {
    return async function (dispatch) {
        axios.defaults.withCredentials = true;
        var result;
        axios.get('/announcement', {params : {id :  localStorage.getItem("courseid")}}  ).then(
          res => {
            if(res.status ===200)
            {
                console.log(res)
                var result = res.data;
                dispatch({
                    type: GET_ANNOUNCEMENT,
                    payload: result
                });   
            }                    
          }
        )      
    }
  }
  export function getQuizzes() {
    return async function (dispatch) {
        axios.defaults.withCredentials = true;
        var result;
        axios.get('/quiz', {params : {id :  localStorage.getItem("courseid")}}  ).then(
          res => {
            if(res.status ===200)
            {
                console.log(res)
                result = res.data;
            }
                dispatch({
                    type: GET_QUIZZES,
                    payload: result
                });                       
          }
        )      
    }
  }

export function getCourses() {
    return async function (dispatch) {
        axios.defaults.withCredentials = true;
        var result;
        axios.get('/course').then(
            res => 
            {
                if(res.status ===200)
                    result = res.data;    
                dispatch({
                    type: GET_COURSES,
                    payload: result
                });           
            }
            
        )
    }
}
export function getSubmissions(data) {
    return async function (dispatch) {
        axios.defaults.withCredentials = true;  
        axios.get('/submission/students-submissions',  {params : {id :  data}} ).then(
            res => 
            {
                if(res.status ===200)
                    var result = res.data;    
                dispatch({
                    type: GET_SUBMISSIONS,
                    payload: result
                });           
            }
            
        )
    }
}


export function deleteAssignment(data) {
    return async function (dispatch) {

        axios.defaults.withCredentials = true;

        axios.post('/assignment/delete', data ).then(
          res => {
            if(res.status ===200)
               {
                    dispatch({
                        type: DELETE_ASSIGNMENT,
                    });       
               }
          }
        )  
    }
  }
  export function deleteAnnouncement(data) {
    return async function (dispatch) {

        axios.defaults.withCredentials = true;

        axios.post('/announcement/delete', data ).then(
          res => {
            if(res.status ===200)
               {
                    dispatch({
                        type: DELETE_ANNOUNCEMENT,
                    });       
               }
          }
        )  
    }
  }
  export function deleteFile(data) {
    return async function (dispatch) {

        axios.defaults.withCredentials = true;

        axios.post('/file/delete', data ).then(
          res => {
            if(res.status ===200)
               {
                    dispatch({
                        type: DELETE_FILE,
                    });       
               }
          }
        )  
    }
  }
  export function deleteCourse(data) {
    return async function (dispatch) {

        axios.defaults.withCredentials = true;

        axios.post('/course/delete', data ).then(
          res => {
            if(res.status ===200)
               {
                    dispatch({
                        type: DELETE_COURSE,
                    });       
               }
          }
        )  
    }
  }
export function  createAssignment(data){
    return function(dispatch){
        console.log(data);
        axios.post('/assignment', data)
        .then(res=>{
            var result = res.data
            console.log(data);
            if(res.status === 200)
            {
            dispatch({
                type: CREATE_ASSIGNMENT,  
                payload: result              
            });
            }
        });
    }
}
export function  createAnnouncement(data){
    return function(dispatch){
        axios.post('/announcement', data)
        .then(res=>{       
            if(res.status === 200)
            {
                var result = res.data
                console.log(res.data);
                dispatch({
                    type: CREATE_ANNOUNCEMENT,     
                    payload: result      
                });
            }
        });
    }
}
export function  createFile(data){
    return function(dispatch){
        axios.post('/file', data)
        .then(res=>{
            console.log(res.status);
            if(res.status === 200)
            {
                var result = res.data
                dispatch({
                    type: CREATE_FILE, 
                    payload: result           
                });
            }
        });
    }
}
export function  createQuiz(data){
    return function(dispatch){
        axios.post('/quiz', data)
        .then(res=>{
            console.log(res.status);
            if(res.status === 200)
            {
            console.log(res.data);
            dispatch({
                type: CREATE_QUIZ,        
            });
            }
        });
    }
}
export function updateProfile(data){
  return function(dispatch){
      axios.defaults.withCredentials = true;
      axios.put('/users/updateProf', data)
          .then(response => {
              if (response.status === 200) {
                  dispatch({
                       type: UPDATE_PROFILE_DETAILS                         
                  });
              }
          })
  }
}
//target action
export function logincheck(data) {
    return async function (dispatch) {
        axios.defaults.withCredentials = true;
        await axios.post('/users/login', data).then(response => {
                console.log(response);
                if (response.status === 201) {
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("role", response.data.role);
                    var result = {
                        //userid : response.data.userid,
                        username : response.data.name,
                        role : response.data.role,
                        email: response.data.email,
                        isAuthenticated : true,    
                        contact :   response.data.phone                 
                    }
                     var result = response.data
                    console.log('Result in action.......: ', result)
                    dispatch({
                        type: LOGIN_CHECK,
                        payload: result
                    });

                }                               
            })
    }
}


export function signupCheck(data){
    return function (dispatch) {
        axios.defaults.withCredentials = true;
        axios.post('/users/register', data)
            .then(response => {
                if (response.status === 201) {
                    var result = {
                        isNewUserCreated: true
                    }
                    dispatch({
                        type: SIGNUP_CHECK,
                        payload: result
                    });
                }
                if(response.status === 200){
                    dispatch({
                        type:  DUPLICATE_USER                      
                    });
                } 
            })
            .catch((err) => {
                console.log("here")
                var result = {
                    errorRedirect: true
                }
                dispatch({
                    type: SIGNUP_CHECK,
                    payload: result
                });
            });

    }
}