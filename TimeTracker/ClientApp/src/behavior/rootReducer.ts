import { combineReducers } from 'redux';
import { daysOffReducer } from './daysOff';
import { profileReducer } from './profile';
import { usersReducer } from './users';

export default combineReducers({
  users: usersReducer,
  profile: profileReducer,
  daysOff: daysOffReducer
});
