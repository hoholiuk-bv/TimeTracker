import { combineReducers } from 'redux';
import { daysOffReducer } from './daysOff';
import { approvalsReducer } from './approvals';
import { profileReducer } from './profile';
import { usersReducer } from './users';
import { userCreationReducer } from './userCreation';
import { userDetailsReducer } from './userDetails';
import { calendarReducer } from './calendar';
import { worktimeReducer } from './worktime';

export default combineReducers({
  users: usersReducer,
  profile: profileReducer,
  userCreation: userCreationReducer,
  daysOff: daysOffReducer,
  approvals: approvalsReducer,
  userDetails: userDetailsReducer,
  calendar: calendarReducer,
  worktime: worktimeReducer,
});
