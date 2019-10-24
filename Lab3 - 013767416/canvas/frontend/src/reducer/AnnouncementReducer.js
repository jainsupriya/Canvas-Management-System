import { GET_ANNOUNCEMENT , CREATE_ANNOUNCEMENT, DELETE_ANNOUNCEMENT} from '../actions/index';

var intialState = {
    errorRedirect : false
}

export default function(state =intialState, action){

    switch(action.type){
        case GET_ANNOUNCEMENT:
        return {
          ...state,
          announcements: action.payload
        }
        case CREATE_ANNOUNCEMENT:
        return { ...state, ...action.payload };

        case DELETE_ANNOUNCEMENT:
        return {
          ...state,
        }
        default: 
            return state;
    }
}