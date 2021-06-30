import {
  EDIT_CONTACT_LOADING,
  EDIT_CONTACT_SUCCESS,
  EDIT_CONTACT_FAIL,
} from '../../../constants/actionTypes';
import axios from '../../../helpers/axiosInstance';

export default (form, id) => dispatch => onSuccess => {
  const requestPayload = {
    country_code: form.phoneCode || '',
    first_name: form.firstName || '',
    last_name: form.lastName || '',
    phone_number: form.phoneNumber || '',
    contact_picture: form.contactPicture || null,
    is_favorite: form.isFavorite || false,
  };
  console.log('requestPayload :>> ', requestPayload);
  dispatch({
    type: EDIT_CONTACT_LOADING,
  });
  axios
    .put(`/contacts/${id}`, requestPayload)
    .then(res => {
      console.log(`res.data create contact api`, id);
      dispatch({
        type: EDIT_CONTACT_SUCCESS,
        payload: res.data,
      });
      console.log(`res.data>>>>>>>>>>>>>>>>>`, res.data);
      onSuccess(res.data);
    })
    .catch(err => {
      console.log(`error 1222`, err.response);
      dispatch({
        type: EDIT_CONTACT_FAIL,
        payload: err.response
          ? err.response.data
          : {error: 'Something went wrong ,try again'},
      });
    });
};
