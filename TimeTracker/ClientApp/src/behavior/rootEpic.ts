import { combineEpics } from 'redux-observable';
import { profileEpic } from './profile';
import { usersEpic } from './users';
import {userCreationEpic} from './userCreation';


export default combineEpics(
  profileEpic,
  usersEpic,
    userCreationEpic,
);