import initialState from '../store/initialState';
import * as accountActions from '../actions/accounts';

const reducer = (state = initialState.account, action) => {
  switch (action.type) {
    case accountActions.SIGN_UP:
      return {
        ...state,
        ...action.payload,
      };
    case accountActions.SIGN_IN:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
