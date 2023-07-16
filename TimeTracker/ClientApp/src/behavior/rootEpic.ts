import { combineEpics } from 'redux-observable';
import { profileEpic } from './profile';
import { usersEpic } from './users';
import {userCreationEpic} from './userCreation';
import {worktimeCreationEpic} from './worktime';
import { daysOffEpic } from './daysOff';


export default combineEpics(
  profileEpic,
  usersEpic,
    userCreationEpic,
    worktimeCreationEpic,
  daysOffEpic
);