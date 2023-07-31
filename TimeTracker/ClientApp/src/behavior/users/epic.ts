import { mergeMap, map, merge } from 'rxjs';
import { Epic, ofType } from 'redux-observable';
import { sendRequest } from '../graphApi';
import { getUsersQuery } from './queries';
import {
  USER_LIST_REQUESTED,
  userListReceived,
} from './actions';

const epic: Epic<any> = (actions$, state$) => {
  const requestUsers$ = actions$.pipe(
    ofType(USER_LIST_REQUESTED),
    map(action => action.payload),
    mergeMap((variables) => sendRequest(getUsersQuery, {
      filter: variables.filter, 
      sorting: variables.sorting, 
      pagination: variables.pagination
    }).pipe(
      map(({users}) => userListReceived(users.list, users.totalUsersCount))
    )),
  );
  
  return merge(requestUsers$);
};

export default epic;
