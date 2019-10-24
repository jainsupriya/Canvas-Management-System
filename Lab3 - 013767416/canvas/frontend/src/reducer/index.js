import { combineReducers } from "redux";

import AssignmentReducer from  "./AssignmentReducer";
import  AnnouncementReducer from  "./AnnouncementReducer";
import { reducer as formReducer } from "redux-form";
import QuizReducer from "./QuizReducer";
import FileReducer from "./FileReducer";
import ProfileReducer from "./ProfileReducer";
import SignupReducer from "./SignupReducer";
import LoginReducer from "./LoginReducer";
import CourseReducer from "./CourseReducer";
import SubmissionReducer from "./SubmissionReducer";


const rootReducer = combineReducers({

  signupdetails: SignupReducer,
  loginstatus: LoginReducer,
  assignments: AssignmentReducer,
  announcements:AnnouncementReducer,
  quizzes: QuizReducer,
  files : FileReducer,
  profiledetails: ProfileReducer,
  courses: CourseReducer,
  submissions: SubmissionReducer
});

export default rootReducer;
