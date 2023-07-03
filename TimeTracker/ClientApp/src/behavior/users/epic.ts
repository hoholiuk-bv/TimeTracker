import { mergeMap, map, merge } from 'rxjs';
import { Epic, ofType } from 'redux-observable';
import { sendRequest } from '../graphApi';

import {
  USER_LIST_REQUESTED,
  receiveUserList,
} from './actions';

import { getUsersQuery } from './queries';

const epic: Epic<any> = (actions$, state$) => {
  const requestUsers$ = actions$.pipe(
    ofType(USER_LIST_REQUESTED),
    mergeMap(() => sendRequest(getUsersQuery).pipe(
      map(({ users }) => receiveUserList(users.list, users.totalUsersCount))
    )),
  );

  return merge(requestUsers$);
};

export default epic;
