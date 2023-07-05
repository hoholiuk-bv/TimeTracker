import { combineReducers } from 'redux';
import { profileReducer } from './profile';
import { usersReducer } from './users';
import { userCreationReducer } from './userCreation';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  users: usersReducer,
  profile: profileReducer,
  userCreation: userCreationReducer,
  router: routerReducer,
});