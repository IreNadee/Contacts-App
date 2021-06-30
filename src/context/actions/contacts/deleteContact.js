import {
  DELETE_CONTACT_FAIL,
  DELETE_CONTACT_LOADING,
  DELETE_CONTACT_SUCCESS,
} from '../../../constants/actionTypes';
import axios from '../../../helpers/axiosInstance';

export default id => dispatch => onSucess => {
  dispatch({
    type: DELETE_CONTACT_LOADING,
  });
  axios
    .delete(`/contacts/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_CONTACT_SUCCESS,
        payload: id,
      });
      onSucess();
    })
    .catch(err => {
      dispatch({
        type: DELETE_CONTACT_FAIL,
        payload: err.response
          ? err.response.data
          : {error: 'Something went wrong ,try again'},
      });
    });
};
