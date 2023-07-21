import {mergeMap, map, merge} from 'rxjs';
import {Epic, ofType} from 'redux-observable';
import {sendRequest} from '../graphApi';

import {
  USER_LIST_REQUESTED,
  receiveUserList,
  TOGGLE_ACTIVITY_STATUS_REQUESTED,
  activityStatusToggled,
} from './actions';

import { getUsersQuery, getToggleActivityStatusQuery } from './queries';

const epic: Epic<any> = (actions$, state$) => {
  const requestUsers$ = actions$.pipe(
    ofType(USER_LIST_REQUESTED),
    map(action => action.payload),
    mergeMap((variables) => sendRequest(getUsersQuery, {
      filter: variables.filter, 
      sorting: variables.sorting, 
      pagination: variables.pagination
    }).pipe(
      map(({users}) => receiveUserList(users.list, users.totalUsersCount))
    )),
  );

  const requestUpdatingIsActiveStatus$ = actions$.pipe(
    ofType(TOGGLE_ACTIVITY_STATUS_REQUESTED),
    map(action => action.payload),
    mergeMap((variables) => sendRequest(getToggleActivityStatusQuery, { id: variables.id }).pipe(
      map(({users}) => activityStatusToggled(users.toggleActivityStatus))
    )),
  );
  
  return merge(requestUsers$, requestUpdatingIsActiveStatus$);
};

export default epic;
