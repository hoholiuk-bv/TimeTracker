import { combineEpics } from 'redux-observable';
import { profileEpic } from './profile';
import { usersEpic } from './users';
import { userCreationEpic } from './userCreation';
import { worktimeCreationEpic } from './worktime';
import { daysOffEpic } from './daysOff';
import { approvalEpic } from './approvals';
import { userDetailsEpic } from './userDetails';
import { calendarEpic } from './calendar';

export default combineEpics(
  profileEpic,
  usersEpic,
  userCreationEpic,
  daysOffEpic,
  approvalEpic,
  userDetailsEpic,
  worktimeCreationEpic,
  calendarEpic,
);
