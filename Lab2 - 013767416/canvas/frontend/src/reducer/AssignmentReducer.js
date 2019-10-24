import { GET_ASSIGNMENTS, CREATE_ASSIGNMENT, DELETE_ASSIGNMENT } from '../actions/index';

var intialState = {
    errorRedirect : false
}

export default function(state = intialState, action){

    switch(action.type){
        case GET_ASSIGNMENTS:
        return {
          ...state,
          assignments: action.payload
        }
        case CREATE_ASSIGNMENT:
        return { ...state, ...action.payload };
        
        case DELETE_ASSIGNMENT:
        return {
          ...state,
        }
        default: 
            return state;
    }
}