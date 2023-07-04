import {mergeMap, map, merge} from 'rxjs';
import {Epic, ofType} from 'redux-observable';
import {sendRequest} from '../graphApi';

import {
  USER_LIST_REQUESTED,
  SEARCHED_USERS_REQUESTED,
  receiveUserList,
  receiveSearchedUsers
} from './actions';

import {getUsersQuery, getSearchedUsersQuery} from './queries';

const epic: Epic<any> = (actions$, state$) => {
  const requestUsers$ = actions$.pipe(
    ofType(USER_LIST_REQUESTED),
    mergeMap(() => sendRequest(getUsersQuery).pipe(
      map(({users}) => receiveUserList(users.list, users.totalUsersCount))
    )),
  );

  const requestSearchedUsers$ = actions$.pipe(
    ofType(SEARCHED_USERS_REQUESTED),
    map(action => action.payload),
    mergeMap(({searchedString}) => sendRequest(getSearchedUsersQuery, {searchedString: searchedString}).pipe(
      map(({users}) => receiveSearchedUsers(users.searchedUsers))
    )),
  );

  return merge(requestUsers$, requestSearchedUsers$);
};

export default epic;
