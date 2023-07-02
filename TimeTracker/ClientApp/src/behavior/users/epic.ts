import { mergeMap, map, merge } from 'rxjs';
import { Epic, ofType } from 'redux-observable';
import { sendRequest } from '../graphApi';

import {
  USER_LIST_REQUESTED,
  TOTAL_USERS_COUNT_REQUESTED,
  receiveUserList,
  receiveTotalUsersCount,
} from './actions';

import { getUsersQuery, getTotalUsersCountQuery } from './queries';

const epic: Epic<any> = (actions$, state$) => {
  const requestUsers$ = actions$.pipe(
    ofType(USER_LIST_REQUESTED),
    mergeMap(() => sendRequest(getUsersQuery).pipe(
      map(({ users }) => receiveUserList(users.users))
    )),
  );

  const requestTotalUsersCount$ = actions$.pipe(
    ofType(TOTAL_USERS_COUNT_REQUESTED),
    mergeMap(() => sendRequest(getTotalUsersCountQuery).pipe(
      map(({ users }) => receiveTotalUsersCount(users.totalUsersCount))
    ))
  );

  return merge(requestUsers$, requestTotalUsersCount$);
};

export default epic;
