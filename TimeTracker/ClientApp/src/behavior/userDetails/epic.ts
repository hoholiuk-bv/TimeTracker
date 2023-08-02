import { mergeMap, map, merge } from 'rxjs';
import {
  USER_REQUESTED, receiveUser,
  USER_UPDATE_REQUESTED, receiveUserUpdate,
} from './actions';
import { Epic, ofType } from 'redux-observable';
import { sendRequest } from '../graphApi';
import {getUserQuery, getUpdateUserQuery} from './queries';

const epic: Epic<any> = (actions$, state$) => {
  const requestUser$ = actions$.pipe(
    ofType(USER_REQUESTED),
    map(action => action.payload),
    mergeMap((variables) => sendRequest(getUserQuery, { id: variables.id }).pipe(
      map(({users}) => receiveUser(users.user))
    ))
  );

  const requestUserUpdate$ = actions$.pipe(
    ofType(USER_UPDATE_REQUESTED),
    map(action => action.payload),
    mergeMap((variables) => sendRequest(getUpdateUserQuery, { input: variables.user }).pipe(
      map(({users}) => receiveUserUpdate(users.userUpdate))
    ))
  );

  return merge(requestUser$, requestUserUpdate$);
};

export default epic;
