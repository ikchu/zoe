export const RESTORE_TOKEN = 'RESTORE_TOKEN';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';

export const restoreToken = (token) => {
  return {type: RESTORE_TOKEN, token: token};
};

export const signIn = (token, user) => {
  return {type: SIGN_IN, token: token, user: user};
};

export const signOut = () => {
  return {type: SIGN_OUT};
};
