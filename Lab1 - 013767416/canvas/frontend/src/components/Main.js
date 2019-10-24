import React, { Component } from 'react';
import '../css/Login.css';
import Home from './Home/home.js';
import Login from './Login/Login.js'
import SignUp from './SignUp/SignUp.js'
import {Switch, Route} from 'react-router-dom';
import Profile from './Profile/profile.js';
import Courses from './Courses/Courses';
import Assignments from './CourseDetails/Assignment/Assignments';
import AssignmentSubmission from './CourseDetails/Assignment/AssignmentSubmission';
import MainDashboard from './Dashboard/MainDashboard';
import { createStore, applyMiddleware, compose } from "redux";
import {Provider} from 'react-redux'
import promise from "redux-promise";
import RootReducer from "../reducer/index";
import CourseHome from './CourseDetails/Home/CourseHome';
import Announcement from './CourseDetails/Announcement/Announcement';
import Grades from './Grades/Grades';
import Files from './CourseDetails/Files/Files';
import Quiz from './CourseDetails/Quiz/Quiz';
import People from './People/People';
import ViewPeopleInfo from './People/ViewInfo';
import ShowGrades from './Dashboard/ShowGrades';
import Random from './CourseDetails/random/Random';
//import Link from './Link/Link';

const composePlugin = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
const store = createStore(RootReducer, composePlugin(applyMiddleware(promise)));

class Main extends Component {
constructor(props)
{
    super(props);

    console.log(props);
}
    render()
    {
        return(
            <Provider store={store}>

            <div>
                <Switch>
                <Route exact path="/" component={Home}/>
                <Route path ="/login" component={Login}/>
                <Route path ="/signup" component={SignUp}/>
                <Route path ="/profile" component={Profile}/>
                <Route path="/announcement" component={Announcement}/>  
                <Route path ="/courses" component={Courses}/>
                <Route path="/dashboard" component={MainDashboard}/>
                <Route path ="/teacherdashboard" component={MainDashboard} />        
                <Route path="/course/:id" component={CourseHome}/>
                <Route path="/people/:id" component={ViewPeopleInfo}/>
                <Route path="/assignment/:id" component={AssignmentSubmission}/>
                <Route path="/assignment" component={Assignments}/>       
                <Route path="/grades" component={Grades}/>    
                <Route path="/files" component={Files}/>   
                <Route path="/quizzes" component={Quiz}/>     
                <Route path="/people" component={People}/>   
                <Route path="/showGrades" component={ShowGrades}/>   
                <Route path="/random" component={Random}/>   
     
                </Switch>       
            </div>
            </Provider>
        )
    }
}
export default Main;