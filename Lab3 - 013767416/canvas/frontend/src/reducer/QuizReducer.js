import { GET_QUIZZES, CREATE_FILE } from '../actions/index';

var intialState = {
    errorRedirect : false
}

export default function(state = intialState, action){

    switch(action.type){
        case GET_QUIZZES:
        return {
          ...state,
          quizzes: action.payload
        }
        case CREATE_FILE:
        return {
          ...state,
        }           
        default: 
            return state;
    }
}