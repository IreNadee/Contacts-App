import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  REGISTER_LOADING,
  CLEAR_AUTH_STATE,
  LOGIN_LOADING,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_USER,
} from '../../constants/actionTypes';

const auth = (state, {type, payload}) => {
  switch (type) {
    case REGISTER_LOADING:
    case LOGIN_LOADING:
      return {...state, loading: true};
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload,
        isLoggedIn: true,
      };

    case LOGOUT_USER:
      return {
        ...state,
        loading: false,
        data: null,
        isLoggedIn: false,
      };

    case REGISTER_FAIL:
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case CLEAR_AUTH_STATE:
      return {
        ...state,
        loading: false,
        data: null,
        error: null,
      };

    default:
      return state;
  }
};

export default auth;
