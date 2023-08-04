import { createReducer } from '@reduxjs/toolkit';
import { WorktimeRecord } from './types';
import { WORKTIME_RECORDS_BY_USER_ID_RECEIVED, WorktimeRecordsByUserIdReceivedAction } from './actions';

export type WorktimeState = {
  records: WorktimeRecord[] | null;
};

const initialState: WorktimeState = {
  records: null
};

export default createReducer(initialState, {
  [WORKTIME_RECORDS_BY_USER_ID_RECEIVED]: onWorktimeRecordsByUserIdReceived,
});

function onWorktimeRecordsByUserIdReceived(state: WorktimeState, action: WorktimeRecordsByUserIdReceivedAction): WorktimeState {
  const records = action.payload.worktimeRecords;
  return {...state, records};
}
