
import {  SIGNUP_CHECK , DUPLICATE_USER} from "../actions";

var intialState = {
  duplicateUser : false
}
//Reducer listening to different action types
//initial state is {}
export default function(state = {intialState}, action) {
  switch (action.type) {
    case SIGNUP_CHECK:
    return {
      ...state,
      signupdetails: action.payload
    }
    case DUPLICATE_USER:
    return{
        ...state,
        duplicateUser : true
    }        
    default:
      return state;
  }
}
