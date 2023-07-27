import { mergeMap, map, merge } from 'rxjs';
import {
  USER_CREATION,
  SHORT_USER_LIST_REQUESTED, receiveUserList,
} from './actions';
import { Epic, ofType } from 'redux-observable';
import { sendRequest } from '../graphApi';
import { creationMutation, getUsersQuery } from './queries';

const epic: Epic<any> = (actions$, state$) => {
  const requestUsers$ = actions$.pipe(
    ofType(SHORT_USER_LIST_REQUESTED),
    map(action => action.payload),
    mergeMap((variables) => sendRequest(getUsersQuery, { filter: variables.filter }).pipe(
      map(({users}) => receiveUserList(users.list))
    ))
  );

  const userCreation$ = actions$.pipe(
    ofType(USER_CREATION),
    map(action => action.payload),
    mergeMap(({ userCreationInput }) => sendRequest(creationMutation, { input: userCreationInput }).pipe(
    ))
  );
    
  return merge(userCreation$, requestUsers$);
};

export default epic;