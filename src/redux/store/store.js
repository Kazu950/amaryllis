import { createStore, combineReducers } from 'redux';
import mapReducer from '../reducers/map';
import accountReducer from '../reducers/accounts';

const rootReducers = combineReducers({
  map: mapReducer,
  account: accountReducer,
});

const store = createStore(rootReducers);

export default store;
