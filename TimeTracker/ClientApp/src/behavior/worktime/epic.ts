import {mergeMap, map, merge} from 'rxjs';
import {
  WORKTIME_CREATION, WORKTIME_RECORDS_BY_USER_ID_REQUESTED,
  WorktimeActions, worktimeRecordsByUserIdReceived,
} from './actions';
import {Epic, ofType} from 'redux-observable';
import {sendRequest} from '../graphApi';
import {getWorktimeRecordsByUserIdQuery, worktimeCreationMutation} from './queries';

const epic: Epic<WorktimeActions | any> = (actions$, state$) => {
  const worktimeCreation$ = actions$.pipe(
    ofType(WORKTIME_CREATION),
    map(action => action.payload),
    mergeMap(({worktimeCreationInput}) => sendRequest(worktimeCreationMutation, {input: worktimeCreationInput}).pipe(
    ))
  );

  const requestWorktimeRecordsByUserId$ = actions$.pipe(
    ofType(WORKTIME_RECORDS_BY_USER_ID_REQUESTED),
    map(action => action.payload),
    mergeMap(({userId}) => sendRequest(getWorktimeRecordsByUserIdQuery, {userId: userId}).pipe(
      map(({worktime}) => worktimeRecordsByUserIdReceived(worktime.worktimeRecordsByUserId))
    )),
  );
  
  return merge(worktimeCreation$, requestWorktimeRecordsByUserId$);
};

export default epic;