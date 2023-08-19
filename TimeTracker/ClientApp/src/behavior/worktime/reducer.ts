import { createReducer } from '@reduxjs/toolkit';
import { WorktimeRecord, WorktimeStats } from './types';
import { PagingInput, SortingInput, SortingOrder } from '../common/types';
import { WorktimeFilterType } from './types';
import {
  WORKTIME_CREATED, WorktimeCreatedAction,
  WORKTIME_RECORDS_RECEIVED, WorktimeRecordsReceivedAction,
  WORKTIME_RECORDS_FILTERING_CHANGED, WorktimeRecordsFilteringChangedAction,
  WORKTIME_RECORDS_SORTING_CHANGED, WorktimeRecordsSortingChangedAction,
  WORKTIME_RECORDS_PAGING_CHANGED, WorktimeRecordsPagingChangedAction,
  WORKTIME_RECORD_UPDATED, WorktimeRecordUpdatedAction,
  UNFINISHED_WORKTIME_RECORD_RECEIVED, UnfinishedWorktimeRecordReceivedAction,
  WORKTIME_FINISH_DATE_UPDATED, WorktimeFinishDateUpdatedAction,
  WORKTIME_STATS_FILE_URL_RECEIVED, WorktimeStatsFileUrlReceivedAction,
} from './actions';

export type WorktimeState = {
  worktime: WorktimeRecord | null;
  records: WorktimeRecord[] | null;
  recordCount: number;
  worktimeStats: WorktimeStats | null;
  sorting: SortingInput;
  filtering: WorktimeFilterType;
  paging: PagingInput;
};

const initialState: WorktimeState = {
  worktime: null,
  records: null,
  recordCount: 0,
  worktimeStats: null,
  sorting: {
    sortingField: 'FinishDate',
    sortingOrder: SortingOrder.Ascending
  },
  filtering: {
    userId: '',
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1
  },
  paging: {
    pageSize: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate(),
    pageNumber: 1
  }
};

export default createReducer(initialState, {
  [WORKTIME_CREATED]: onWorktimeRecordCreated,
  [WORKTIME_RECORDS_RECEIVED]: onWorktimeRecordsReceived,
  [WORKTIME_RECORDS_SORTING_CHANGED]: onWorktimeRecordsSortingChanged,
  [WORKTIME_RECORDS_FILTERING_CHANGED]: onWorktimeRecordsFilteringChanged,
  [WORKTIME_RECORDS_PAGING_CHANGED]: onWorktimeRecordsPagingChanged,
  [WORKTIME_RECORD_UPDATED]: onWorktimeRecordUpdated,
  [UNFINISHED_WORKTIME_RECORD_RECEIVED]: onUnfinishedWorktimeRecordReceived,
  [WORKTIME_FINISH_DATE_UPDATED]: onWorktimeFinishDateUpdated,
  [WORKTIME_STATS_FILE_URL_RECEIVED]: onWorktimeStatsFileUrlReceived,
});

function onUnfinishedWorktimeRecordReceived(state: WorktimeState, action: UnfinishedWorktimeRecordReceivedAction): WorktimeState {
  const worktime = action.payload.unfinishedWorktimeRecord;
  return { ...state, worktime };
}

function onWorktimeRecordCreated(state: WorktimeState, action: WorktimeCreatedAction): WorktimeState {
  const { worktimeRecord } = action.payload;
  return {...state, worktime: worktimeRecord};
}

function onWorktimeFinishDateUpdated(state: WorktimeState, action: WorktimeFinishDateUpdatedAction): WorktimeState {
  const { worktimeRecord } = action.payload;

  if(state.records === null)
    return { ...state, records: [worktimeRecord] };

  const existingRecordIndex = state.records.findIndex(record => record.id === worktimeRecord.id);

  let updatedRecords;
  if (existingRecordIndex !== -1) {
    updatedRecords = [...state.records];
    updatedRecords[existingRecordIndex] = worktimeRecord;
  } else {
    updatedRecords = [...state.records, worktimeRecord];
  }

  return { ...state, records: updatedRecords };
}

function onWorktimeRecordsReceived(state: WorktimeState, action: WorktimeRecordsReceivedAction): WorktimeState {
  const { records, recordCount, worktimeStats } = action.payload;
  return { ...state, records, recordCount, worktimeStats };
}

function onWorktimeRecordsFilteringChanged(state: WorktimeState, action: WorktimeRecordsFilteringChangedAction) {
  const { filtering } = action.payload;
  const daysInMonth = new Date(filtering.year, filtering.month, 0).getDate();
  const paging = { pageNumber: 1, pageSize: daysInMonth };

  return { ...state, records: null, recordCount: 0, worktimeStats: null, filtering, paging };
}

function onWorktimeRecordsSortingChanged(state: WorktimeState, action: WorktimeRecordsSortingChangedAction) {
  const { sorting } = action.payload;
  return { ...state, sorting };
}

function onWorktimeRecordsPagingChanged(state: WorktimeState, action: WorktimeRecordsPagingChangedAction) {
  const { paging } = action.payload;
  return { ...state, paging };
}

function onWorktimeRecordUpdated(state: WorktimeState, action: WorktimeRecordUpdatedAction) {
  const { updatedWorktimeRecord } = action.payload;

  if(state.records === null)
    return { ...state, records: [updatedWorktimeRecord] };

  const existingIndex = state.records.findIndex(record => record.id === updatedWorktimeRecord.id);

  const updatedRecords = existingIndex !== -1
    ? [
      ...state.records.slice(0, existingIndex),
      updatedWorktimeRecord,
      ...state.records.slice(existingIndex + 1),
    ]
    : [...state.records, updatedWorktimeRecord];

  return { ...state, records: updatedRecords };
}

function onWorktimeStatsFileUrlReceived(state: WorktimeState, action: WorktimeStatsFileUrlReceivedAction): WorktimeState {
  const urlForDownloadingWorktimeStatsFile = action.payload.urlForDownloadingWorktimeStats;
  window.open(urlForDownloadingWorktimeStatsFile, '_blank');
  return { ...state };
}
