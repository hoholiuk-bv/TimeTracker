import { createReducer } from '@reduxjs/toolkit';
import { WorktimeRecord, WorktimeStats } from './types';
import { PagingInput, SortingInput, SortingOrder } from '../common/types';
import { FilterType } from './types';
import {
  WORKTIME_RECORDS_RECEIVED, WorktimeRecordsReceivedAction,
  WORKTIME_RECORDS_FILTERING_CHANGED, WorktimeRecordsFilteringChangedAction,
  WORKTIME_RECORDS_SORTING_CHANGED, WorktimeRecordsSortingChangedAction,
  WORKTIME_RECORDS_PAGING_CHANGED, WorktimeRecordsPagingChangedAction,
} from './actions';

export type WorktimeState = {
  records: WorktimeRecord[] | null;
  recordsCount: number,
  worktimeStats: WorktimeStats | null,
  sorting: SortingInput;
  filtering: FilterType;
  paging: PagingInput;
};

const initialState: WorktimeState = {
  records: null,
  recordsCount: 0,
  worktimeStats: null,
  sorting: {
    sortingField: 'FinishDate',
    sortingOrder: SortingOrder.Ascending
  },
  filtering: {
    userId: '',
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  },
  paging: {
    pageSize: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate(),
    pageNumber: 1
  },
};

export default createReducer(initialState, {
  [WORKTIME_RECORDS_RECEIVED]: onWorktimeRecordsReceived,
  [WORKTIME_RECORDS_SORTING_CHANGED]: onWorktimeRecordsSortingChanged,
  [WORKTIME_RECORDS_FILTERING_CHANGED]: onWorktimeRecordsFilteringChanged,
  [WORKTIME_RECORDS_PAGING_CHANGED]: onWorktimeRecordsPagingChanged,
});

function onWorktimeRecordsReceived(state: WorktimeState, action: WorktimeRecordsReceivedAction): WorktimeState {
  const { records, recordsCount, worktimeStats } = action.payload;
  return {...state, records, recordsCount, worktimeStats};
}

function onWorktimeRecordsFilteringChanged(state: WorktimeState, action: WorktimeRecordsFilteringChangedAction) {
  const { filtering } = action.payload;
  const daysInMonth = new Date(filtering.year, filtering.month, 0).getDate();
  const paging = { pageNumber: 1, pageSize: daysInMonth };

  return { ...state, records: null, recordsCount: 0, worktimeStats: null, filtering, paging };
}

function onWorktimeRecordsSortingChanged(state: WorktimeState, action: WorktimeRecordsSortingChangedAction) {
  const { sorting } = action.payload;
  return { ...state, sorting };
}

function onWorktimeRecordsPagingChanged(state: WorktimeState, action: WorktimeRecordsPagingChangedAction) {
  const { paging } = action.payload;
  return { ...state, paging };
}
