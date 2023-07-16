import { combineReducers } from 'redux';
import { profileReducer } from './profile';
import { usersReducer } from './users';
import { userCreationReducer } from './userCreation';

export default combineReducers({
  users: usersReducer,
  userCreation: userCreationReducer,
  profile: profileReducer
});
