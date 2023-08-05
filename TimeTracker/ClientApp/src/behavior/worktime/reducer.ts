import { createReducer } from '@reduxjs/toolkit';
import { WorktimeRecord } from './types';
import { FilterType } from './types';
import {
  WORKTIME_RECORDS_BY_USER_ID_RECEIVED, WorktimeRecordsByUserIdReceivedAction,
  WORKTIME_RECORDS_FILTERING_CHANGED, WorktimeRecordsFilteringChangedAction,
} from './actions';

export type WorktimeState = {
  records: WorktimeRecord[] | null;
  filtering: FilterType;
};

const initialState: WorktimeState = {
  records: null,
  filtering: {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  }
};

export default createReducer(initialState, {
  [WORKTIME_RECORDS_BY_USER_ID_RECEIVED]: onWorktimeRecordsByUserIdReceived,
  [WORKTIME_RECORDS_FILTERING_CHANGED]: onWorktimeRecordsFilteringChanged,
});

function onWorktimeRecordsByUserIdReceived(state: WorktimeState, action: WorktimeRecordsByUserIdReceivedAction): WorktimeState {
  const records = action.payload.worktimeRecords;
  return {...state, records};
}

function onWorktimeRecordsFilteringChanged(state: WorktimeState, action: WorktimeRecordsFilteringChangedAction) {
  const { filtering } = action.payload;
  return { ...state, records: null, filtering };
}
