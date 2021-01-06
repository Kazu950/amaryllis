import initialState from '../store/initialState';
import * as Actions from '../actions/map';

const reducer = (state = initialState.map, action) => {
  switch (action.type) {
    case Actions.LOCATION_PERMISSION:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.CURRENT_POSITION:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.VOICEMEMO:
      return {
        ...state,
        voiceMemo: action.payload.voiceMemo,
      };
    case Actions.SETTING_CATEGORY:
      return {
        ...state,
        settingCategories: [...action.payload],
      };
    default:
      return state;
  }
};

export default reducer;
