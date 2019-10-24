import { LOGIN_CHECK } from '../actions/index';

var intialState = {
    errorRedirect : false
}

export default function(state = intialState, action){

    switch(action.type){

        case LOGIN_CHECK:
        return {
          ...state,
          loginstatus: action.payload
        }
            
        default: 
            return state;
    }
}