export const SIGN_UP = 'SIGN_UP';
export const signUpAction = (signUpState) => ({
  type: SIGN_UP,
  payload: {
    login: signUpState.login,
    uid: signUpState.uid,
    token: signUpState.token,
  },
});

export const SIGN_IN = 'SIGN_IN';
export const signInAction = (signInState) => ({
  type: SIGN_UP,
  payload: {
    login: signInState.login,
    uid: signInState.uid,
    token: signInState.token,
  },
});
