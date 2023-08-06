import { mergeMap, map, merge } from 'rxjs';
import {
  WORKTIME_CREATION, WORKTIME_RECORDS_REQUESTED, WORKTIME_UPDATE_REQUESTED,
  WorktimeActions, worktimeRecordsReceived, worktimeRecordUpdated,
} from './actions';
import { Epic, ofType } from 'redux-observable';
import { sendRequest } from '../graphApi';
import { editWorktimeRecordMutation, getWorktimeRecordsQuery, worktimeCreationMutation } from './queries';

const epic: Epic<WorktimeActions | any> = (actions$, state$) => {
  const worktimeCreation$ = actions$.pipe(
    ofType(WORKTIME_CREATION),
    map(action => action.payload),
    mergeMap(({worktimeCreationInput}) => sendRequest(worktimeCreationMutation, {input: worktimeCreationInput}).pipe(
    ))
  );

  const editWorktimeRecord$ = actions$.pipe(
    ofType(WORKTIME_UPDATE_REQUESTED),
    map(action => action.payload),
    mergeMap(({updatedWorktimeRecord}) => sendRequest(editWorktimeRecordMutation, {input: updatedWorktimeRecord}).pipe(
      map(({worktime}) => worktimeRecordUpdated(worktime.worktimeUpdate))
    )),
  );

  const requestWorktimeRecords$ = actions$.pipe(
    ofType(WORKTIME_RECORDS_REQUESTED),
    map(action => action.payload),
    mergeMap(({sorting, filter, paging}) => sendRequest(getWorktimeRecordsQuery, {sorting: sorting, filter: filter, paging: paging}).pipe(
      map(({worktime}) => worktimeRecordsReceived(worktime.worktimeRecordsByUserId, worktime.recordsCount, worktime.worktimeStats))
    )),
  );
  
  return merge(worktimeCreation$, editWorktimeRecord$, requestWorktimeRecords$);
};

export default epic;