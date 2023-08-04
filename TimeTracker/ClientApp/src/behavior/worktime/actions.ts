import type { WorktimeInput } from './types';
import { WorktimeRecord } from './types';

export const WORKTIME_CREATION = 'WORKTIME_CREATION' as const;
export const worktimeCreation = (worktimeCreationInput: WorktimeInput) => ({
  type: WORKTIME_CREATION,
  payload: {worktimeCreationInput}
});

export const WORKTIME_RECORDS_BY_USER_ID_REQUESTED = 'WORKTIME_RECORDS_BY_USER_ID_REQUESTED' as const;
export const requestWorktimeRecordsByUserId = (userId: string) => ({
  type: WORKTIME_RECORDS_BY_USER_ID_REQUESTED,
  payload: { userId },
});

export const WORKTIME_RECORDS_BY_USER_ID_RECEIVED = 'WORKTIME_RECORDS_BY_USER_ID_RECEIVED' as const;
export const worktimeRecordsByUserIdReceived = (worktimeRecords: WorktimeRecord[]) => ({
  type: WORKTIME_RECORDS_BY_USER_ID_RECEIVED,
  payload: { worktimeRecords },
});

export type WorktimeCreationAction = ReturnType<typeof worktimeCreation>;
export type WorktimeRecordsByUserIdReceivedAction = ReturnType<typeof worktimeRecordsByUserIdReceived>;
export type WorktimeActions = ReturnType<
    | typeof worktimeCreation
    | typeof worktimeRecordsByUserIdReceived>
