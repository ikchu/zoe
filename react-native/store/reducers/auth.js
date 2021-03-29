import {RESTORE_TOKEN, SIGN_IN, SIGN_OUT} from '../actions/auth';

const initialState = {
  isLoading: true,
  isSignout: false,
  userToken: null,
};

// TODO: doesn't look like these tokens are being saved with SecureStore....
// how to change token to be stored with SecureStore rather than plain redux?
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESTORE_TOKEN:
      return {...state, userToken: action.token, isLoading: false};
    case SIGN_IN:
      return {...state, isSignout: false, userToken: action.token};
    case SIGN_OUT:
      return {...state, isSignout: true, userToken: null};
    default:
      return state;
  }
};

export default authReducer;