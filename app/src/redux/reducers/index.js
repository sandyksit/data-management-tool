import { combineReducers } from 'redux';
import patient from './patient';
import user from './user';
import alert from "./alert";

const allReducers = combineReducers({
  patient,
  user,
  alert
});

const rootReducer = (state, action) => {
  if (action.type === 'SIGN_OUT') {
    state = undefined;
  }
  return allReducers(state, action);
};

export default rootReducer;
