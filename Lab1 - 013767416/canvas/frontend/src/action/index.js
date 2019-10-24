import { ADD_COURSE} from './types';
import axios from 'axios';

const apiUrl = 'http://localhost:3001/courses';

export const createCourse = ({ title, body }) => {
  return (dispatch) => {
    return axios.post(`${apiUrl}/create`, {title, body})
      .then(response => {
        dispatch(createCourseSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const createCourseSuccess =  (data) => {
  return {
    type: ADD_POST,
    payload: {
      _id: data._id,
      title: data.title,
      body: data.body
    }
  }
};

