import { combineEpics } from 'redux-observable';
import { profileEpic } from './profile';
import { usersEpic } from './users';
import { userCreationEpic } from './userCreation';
import { daysOffEpic } from './daysOff';
import {approvalEpic} from './approvals';


export default combineEpics(
  profileEpic,
  usersEpic,
  userCreationEpic,
  daysOffEpic,
  approvalEpic
);