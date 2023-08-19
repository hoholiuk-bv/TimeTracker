import { Epic, ofType } from 'redux-observable';
import { mergeMap, map, merge, switchMap } from 'rxjs';
import { sendRequest } from '../graphApi';
import {
  WorktimeActions,
  WORKTIME_CREATION, worktimeCreated,
  WORKTIME_RECORDS_REQUESTED, worktimeRecordsReceived,
  WORKTIME_RECORD_COUNT_REQUESTED, worktimeRecordCountReceived,
  WORKTIME_STATS_REQUESTED, worktimeStatsReceived, requestWorktimeStats,
  UNFINISHED_WORKTIME_RECORD_REQUESTED, unfinishedWorktimeRecordReceived,
  WORKTIME_UPDATE_REQUESTED, worktimeRecordUpdated,
  WORKTIME_FINISH_DATE_UPDATE_REQUESTED, worktimeFinishDateUpdated,
} from './actions';
import {
  worktimeCreationMutation,
  getWorktimeRecordsQuery,
  getWorktimeRecordCountQuery,
  getWorktimeStatsQuery,
  getUnfinishedWorktimeRecordQuery,
  updateWorktimeRecordMutation,
  updateWorktimeFinishDateMutation,
} from './queries';

const epic: Epic<WorktimeActions | any> = (actions$, state$) => {
  const worktimeCreation$ = actions$.pipe(
    ofType(WORKTIME_CREATION),
    map(action => action.payload),
    mergeMap(({input}) => sendRequest(worktimeCreationMutation, {input: input}).pipe(
      map(({worktime}) => worktimeCreated(worktime.create))
    ))
  );

  const requestWorktimeRecords$ = actions$.pipe(
    ofType(WORKTIME_RECORDS_REQUESTED),
    map(action => action.payload),
    mergeMap(({sorting, filter, paging}) => sendRequest(getWorktimeRecordsQuery, {sorting: sorting, filter: filter, paging: paging}).pipe(
      map(({worktime}) => worktimeRecordsReceived(worktime.records))
    ))
  );

  const requestWorktimeRecordCount$ = actions$.pipe(
    ofType(WORKTIME_RECORD_COUNT_REQUESTED),
    map(action => action.payload),
    mergeMap(({filter}) => sendRequest(getWorktimeRecordCountQuery, {filter: filter}).pipe(
      map(({worktime}) => worktimeRecordCountReceived(worktime.recordCount))
    ))
  );

  const requestWorktimeStats$ = actions$.pipe(
    ofType(WORKTIME_STATS_REQUESTED),
    map(action => action.payload),
    mergeMap(({filter}) => sendRequest(getWorktimeStatsQuery, {filter: filter}).pipe(
      map(({worktime}) => worktimeStatsReceived(worktime.worktimeStats))
    ))
  );

  const requestUnfinishedWorktimeRecord$ = actions$.pipe(
    ofType(UNFINISHED_WORKTIME_RECORD_REQUESTED),
    map(action => action.payload),
    mergeMap(({ userId }) => sendRequest(getUnfinishedWorktimeRecordQuery, { userId }).pipe(
      map(({worktime}) => unfinishedWorktimeRecordReceived(worktime.unfinishedWorktimeRecord))
    ))
  );

  const requestWorktimeUpdate$ = actions$.pipe(
    ofType(WORKTIME_UPDATE_REQUESTED),
    map(action => action.payload),
    switchMap(({input}) => sendRequest(updateWorktimeRecordMutation, {input: input}).pipe(
      mergeMap(({worktime}) => [
        worktimeRecordUpdated(worktime.update),
        requestWorktimeStats(state$.value.worktime.filtering),
      ])
    ))
  );

  const requestWorktimeFinishDateUpdate$ = actions$.pipe(
    ofType(WORKTIME_FINISH_DATE_UPDATE_REQUESTED),
    map(action => action.payload),
    switchMap(({ userId }) => sendRequest(updateWorktimeFinishDateMutation, { userId }).pipe(
      mergeMap(({worktime}) => [
        worktimeFinishDateUpdated(worktime.updateFinishDate),
        requestWorktimeStats(state$.value.worktime.filtering),
      ])
    ))
  );

  return merge(worktimeCreation$, requestWorktimeRecords$, requestWorktimeRecordCount$, requestWorktimeStats$, requestUnfinishedWorktimeRecord$, requestWorktimeUpdate$, requestWorktimeFinishDateUpdate$);
};

export default epic;