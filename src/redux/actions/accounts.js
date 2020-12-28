export const SIGN_UP = 'SIGN_UP';
export const signUpAction = (signUpState) => ({
  type: SIGN_UP,
  payload: {
    login: signUpState.login,
    uid: signUpState.uid,
    token: signUpState.token,
  },
});
