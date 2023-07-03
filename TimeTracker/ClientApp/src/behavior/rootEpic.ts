import { combineEpics } from 'redux-observable';
import { profileEpic } from './profile';
import { usersEpic } from './users';

export default combineEpics(
  profileEpic,
  usersEpic,
);