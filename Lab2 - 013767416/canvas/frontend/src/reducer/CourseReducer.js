import { GET_COURSES, DELETE_COURSE } from '../actions/index';

var intialState = {
    errorRedirect : false
}

export default function(state = intialState, action){

    switch(action.type){
        case GET_COURSES:
        return {
          ...state,
          result: action.payload
        }
        case DELETE_COURSE:
        return {
          ...state,
        }   
        default: 
            return state;
    }
}