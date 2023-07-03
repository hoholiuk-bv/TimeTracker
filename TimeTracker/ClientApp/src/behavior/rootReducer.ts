import { combineReducers } from 'redux';
import { profileReducer } from './profile';
import { usersReducer } from './users';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  users: usersReducer,
  profile: profileReducer,
  router: routerReducer,
});