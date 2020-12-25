import initialState from '../store/initialState';
import * as mapActions from '../actions/map';

const reducer = (state = initialState.map, action) => {
  switch (action.type) {
    case mapActions.CURRENT_POSITION:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
