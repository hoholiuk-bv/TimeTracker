import { combineReducers } from 'redux';
import { daysOffReducer } from './daysOff';
import {approvalsReducer} from './approvals';
import { profileReducer } from './profile';
import { usersReducer } from './users';
import { userCreationReducer } from './userCreation';

export default combineReducers({
  users: usersReducer,
  profile: profileReducer,
  userCreation: userCreationReducer,
  daysOff: daysOffReducer,
  approvals: approvalsReducer
});
