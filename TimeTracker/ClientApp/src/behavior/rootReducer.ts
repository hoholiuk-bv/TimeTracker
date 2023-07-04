import { combineReducers } from 'redux';
import { profileReducer } from './profile';
import { usersReducer } from './users';

export default combineReducers({
  users: usersReducer,
  profile: profileReducer
});
