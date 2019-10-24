import { GET_FILES, CREATE_FILE, DELETE_FILE } from '../actions/index';

var intialState = {
    errorRedirect : false
}

export default function(state = intialState, action){

    switch(action.type){
        case GET_FILES:
        return {
          ...state,
          files: action.payload
        }
        case CREATE_FILE:
        return { ...state, ...action.payload };
               
        case DELETE_FILE:
        return {
          ...state,
        }  
        default: 
            return state;
    }
}