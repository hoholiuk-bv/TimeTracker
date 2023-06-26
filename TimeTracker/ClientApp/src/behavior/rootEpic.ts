import { combineEpics } from 'redux-observable';
import { usersEpic } from './users';


export default combineEpics(
  usersEpic,
);