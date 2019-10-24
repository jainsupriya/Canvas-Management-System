import { GET_PROFILE_DETAILS, UPDATE_PROFILE_DETAILS } from '../actions/index';

var intialState = {
    errorRedirect : false
}

export default function(state = intialState, action){

    switch(action.type){
        case GET_PROFILE_DETAILS:
        return {
          ...state,
          profiledetails: action.payload
        }
    
        case UPDATE_PROFILE_DETAILS:
        return {
          ...state,
        }
        default: 
            return state;
    }
}