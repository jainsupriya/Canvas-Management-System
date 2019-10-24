import { GET_SUBMISSIONS } from '../actions/index';

var intialState = {
    errorRedirect : false
}

export default function(state = intialState, action){

    switch(action.type){
        case GET_SUBMISSIONS:
        return {
          ...state,
          submissions: action.payload
        }
        default: 
            return state;
    }
}