import { mergeMap, map, merge } from 'rxjs';
import {
  WORKTIME_CREATION, WORKTIME_RECORDS_REQUESTED,
  WorktimeActions, worktimeRecordsReceived,
} from './actions';
import { Epic, ofType } from 'redux-observable';
import { sendRequest } from '../graphApi';
import { getWorktimeRecordsQuery, worktimeCreationMutation } from './queries';

const epic: Epic<WorktimeActions | any> = (actions$, state$) => {
  const worktimeCreation$ = actions$.pipe(
    ofType(WORKTIME_CREATION),
    map(action => action.payload),
    mergeMap(({worktimeCreationInput}) => sendRequest(worktimeCreationMutation, {input: worktimeCreationInput}).pipe(
    ))
  );

  const requestWorktimeRecordsByUserId$ = actions$.pipe(
    ofType(WORKTIME_RECORDS_REQUESTED),
    map(action => action.payload),
    mergeMap(({sorting, filter, paging}) => sendRequest(getWorktimeRecordsQuery, {sorting: sorting, filter: filter, paging: paging}).pipe(
      map(({worktime}) => worktimeRecordsReceived(worktime.worktimeRecordsByUserId, worktime.recordsCount))
    )),
  );
  
  return merge(worktimeCreation$, requestWorktimeRecordsByUserId$);
};

export default epic;