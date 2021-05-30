import {RESTORE_TOKEN, SIGN_IN, SIGN_OUT} from '../actions/auth';

const initialState = {
  isLoading: true,
  isSignout: false,
  token: null,
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESTORE_TOKEN:
      return {...state, token: action.token, isLoading: false};
    case SIGN_IN:
      return {...state, isSignout: false, token: action.token, user: action.user};
    case SIGN_OUT:
      return {...state, isSignout: true, token: null, user: null};
    default:
      return state;
  }
};

export default authReducer;
