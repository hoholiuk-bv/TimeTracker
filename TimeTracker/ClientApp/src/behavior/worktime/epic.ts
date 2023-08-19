import { Epic, ofType } from 'redux-observable';
import { mergeMap, map, merge } from 'rxjs';
import { sendRequest } from '../graphApi';
import {
  WorktimeActions,
  WORKTIME_CREATION, worktimeCreated,
  WORKTIME_UPDATE_REQUESTED, worktimeRecordUpdated,
  WORKTIME_RECORDS_REQUESTED, worktimeRecordsReceived,
  WORKTIME_FINISH_DATE_UPDATE, worktimeFinishDateUpdated,
  UNFINISHED_WORKTIME_RECORD_REQUESTED, receiveUnfinishedWorktimeRecord,
  WORKTIME_STATS_FILE_URL_REQUESTED, worktimeStatsFileUrlReceived,
} from './actions';
import {
  updateWorktimeRecordMutation,
  getUnfinishedWorktimeRecordQuery,
  getWorktimeRecordsQuery,
  updateWorktimeFinishDateMutation,
  worktimeCreationMutation,
  getWorktimeStatsFileUrlQuery,
} from './queries';

const epic: Epic<WorktimeActions | any> = (actions$, state$) => {
  const worktimeCreation$ = actions$.pipe(
    ofType(WORKTIME_CREATION),
    map(action => action.payload),
    mergeMap(({input}) => sendRequest(worktimeCreationMutation, {input: input}).pipe(
      map(({worktime}) => worktimeCreated(worktime.create))
    ))
  );

  const updateWorktimeRecord$ = actions$.pipe(
    ofType(WORKTIME_UPDATE_REQUESTED),
    map(action => action.payload),
    mergeMap(({input}) => sendRequest(updateWorktimeRecordMutation, {input: input}).pipe(
      map(({worktime}) => worktimeRecordUpdated(worktime.update))
    ))
  );

  const requestWorktimeRecords$ = actions$.pipe(
    ofType(WORKTIME_RECORDS_REQUESTED),
    map(action => action.payload),
    mergeMap(({sorting, filter, paging}) => sendRequest(getWorktimeRecordsQuery, {sorting: sorting, filter: filter, paging: paging}).pipe(
      map(({worktime}) => worktimeRecordsReceived(worktime.records, worktime.recordCount, worktime.worktimeStats))
    ))
  );

  const updateWorktimeFinishDate$ = actions$.pipe(
    ofType(WORKTIME_FINISH_DATE_UPDATE),
    map(action => action.payload),
    mergeMap(({ userId }) => sendRequest(updateWorktimeFinishDateMutation, { userId }).pipe(
      map(({worktime}) => worktimeFinishDateUpdated(worktime.updateFinishDate))
    ))
  );

  const requestUnfinishedWorktimeRecord$ = actions$.pipe(
    ofType(UNFINISHED_WORKTIME_RECORD_REQUESTED),
    map(action => action.payload),
    mergeMap(({ userId }) => sendRequest(getUnfinishedWorktimeRecordQuery, { userId }).pipe(
      map(({worktime}) => receiveUnfinishedWorktimeRecord(worktime.unfinishedWorktimeRecord))
    ))
  );

  const requestWorktimeStatsFileUrl$ = actions$.pipe(
    ofType(WORKTIME_STATS_FILE_URL_REQUESTED),
    map(action => action.payload),
    mergeMap(({ filter }) => sendRequest(getWorktimeStatsFileUrlQuery, {filter: filter}).pipe(
      map(({worktime}) => worktimeStatsFileUrlReceived(worktime.urlForDownloadingWorktimeStats))
    ))
  );
  
  return merge(worktimeCreation$, updateWorktimeRecord$, requestWorktimeRecords$, updateWorktimeFinishDate$, requestUnfinishedWorktimeRecord$, requestWorktimeStatsFileUrl$);
};

export default epic;