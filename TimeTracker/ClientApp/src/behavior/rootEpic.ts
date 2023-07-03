import { combineEpics } from 'redux-observable';
import { profileEpic } from './profile';

export default combineEpics(
  profileEpic,
  // usersEpic,
);