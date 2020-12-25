import { createStore, combineReducers } from 'redux';
import mapReducer from '../reducers/map';

const rootReducers = combineReducers({
  map: mapReducer,
});

const store = createStore(rootReducers);

export default store;
