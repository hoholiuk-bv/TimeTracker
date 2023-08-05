import type { WorktimeInput } from './types';
import { FilterType, WorktimeRecord } from './types';

export const WORKTIME_CREATION = 'WORKTIME_CREATION' as const;
export const worktimeCreation = (worktimeCreationInput: WorktimeInput) => ({
  type: WORKTIME_CREATION,
  payload: {worktimeCreationInput}
});

export const WORKTIME_RECORDS_BY_USER_ID_REQUESTED = 'WORKTIME_RECORDS_BY_USER_ID_REQUESTED' as const;
export const requestWorktimeRecordsByUserId = (userId: string, filter: FilterType) => ({
  type: WORKTIME_RECORDS_BY_USER_ID_REQUESTED,
  payload: { userId, filter },
});

export const WORKTIME_RECORDS_BY_USER_ID_RECEIVED = 'WORKTIME_RECORDS_BY_USER_ID_RECEIVED' as const;
export const worktimeRecordsByUserIdReceived = (worktimeRecords: WorktimeRecord[]) => ({
  type: WORKTIME_RECORDS_BY_USER_ID_RECEIVED,
  payload: { worktimeRecords },
});

export const WORKTIME_RECORDS_FILTERING_CHANGED = 'WORKTIME_RECORDS_FILTERING_CHANGED' as const;
export const changeWorktimeRecordsFiltering = (filtering: FilterType) => ({
  type: WORKTIME_RECORDS_FILTERING_CHANGED,
  payload: { filtering }
});

export type WorktimeCreationAction = ReturnType<typeof worktimeCreation>;
export type WorktimeRecordsByUserIdReceivedAction = ReturnType<typeof worktimeRecordsByUserIdReceived>;
export type WorktimeRecordsFilteringChangedAction = ReturnType<typeof changeWorktimeRecordsFiltering>;
export type WorktimeActions = ReturnType<
    | typeof worktimeCreation
    | typeof requestWorktimeRecordsByUserId
    | typeof worktimeRecordsByUserIdReceived
    | typeof changeWorktimeRecordsFiltering>
