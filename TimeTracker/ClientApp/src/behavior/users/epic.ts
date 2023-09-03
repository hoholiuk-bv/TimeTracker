import { mergeMap, map, merge } from 'rxjs';
import { Epic, ofType } from 'redux-observable';
import { sendRequest } from '../graphApi';
import { changePasswordMutation, getUsersQuery } from './queries';
import { USER_LIST_REQUESTED, CHANGE_USER_PASSWORD, userListReceived, userPasswordChanged } from './actions';

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
  
  const changeUserPassword$ = actions$.pipe(
    ofType(CHANGE_USER_PASSWORD),
    map(action => action.payload),
    mergeMap(({oldPassword, newPassword}) => sendRequest(changePasswordMutation, {
      oldPassword: oldPassword,
      newPassword: newPassword
    }).pipe(
      map(({users}) => userPasswordChanged(users.changePassword))
    )),
  );
  
  return merge(requestUsers$, changeUserPassword$);
};

export default epic;
