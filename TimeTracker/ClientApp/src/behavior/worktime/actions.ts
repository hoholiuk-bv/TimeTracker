import type { WorktimeInput, WorktimeStats } from './types';
import { WorktimeFilterType, WorktimeRecord } from './types';
import { PagingInput, SortingInput } from '../common/types';

export const WORKTIME_CREATION = 'WORKTIME_CREATION' as const;
export const worktimeCreation = (input: WorktimeInput) => ({
  type: WORKTIME_CREATION,
  payload: {input}
});

export const WORKTIME_CREATED = 'WORKTIME_CREATED' as const;
export const worktimeCreated = (worktimeRecord: WorktimeRecord) => ({
  type: WORKTIME_CREATED,
  payload: {worktimeRecord}
});

export const WORKTIME_RECORDS_REQUESTED = 'WORKTIME_RECORDS_REQUESTED' as const;
export const requestWorktimeRecords = (sorting: SortingInput, filter: WorktimeFilterType , paging: PagingInput) => ({
  type: WORKTIME_RECORDS_REQUESTED,
  payload: { sorting, filter, paging },
});

export const WORKTIME_RECORDS_RECEIVED = 'WORKTIME_RECORDS_RECEIVED' as const;
export const worktimeRecordsReceived = (records: WorktimeRecord[], recordsCount: number, worktimeStats: WorktimeStats) => ({
  type: WORKTIME_RECORDS_RECEIVED,
  payload: { records, recordsCount, worktimeStats },
});

export const WORKTIME_UPDATE_REQUESTED = 'WORKTIME_UPDATE_REQUESTED' as const;
export const requestWorktimeUpdate = (input: WorktimeInput) => ({
  type: WORKTIME_UPDATE_REQUESTED,
  payload: { input },
});

export const WORKTIME_RECORD_UPDATED = 'WORKTIME_RECORD_UPDATED' as const;
export const worktimeRecordUpdated = (updatedWorktimeRecord: WorktimeRecord) => ({
  type: WORKTIME_RECORD_UPDATED,
  payload: { updatedWorktimeRecord },
});

export const WORKTIME_RECORDS_SORTING_CHANGED = 'WORKTIME_RECORDS_SORTING_CHANGED' as const;
export const changeWorktimeRecordsSorting = (sorting: SortingInput) => ({
  type: WORKTIME_RECORDS_SORTING_CHANGED,
  payload: { sorting }
});

export const WORKTIME_RECORDS_FILTERING_CHANGED = 'WORKTIME_RECORDS_FILTERING_CHANGED' as const;
export const changeWorktimeRecordsFiltering = (filtering: WorktimeFilterType) => ({
  type: WORKTIME_RECORDS_FILTERING_CHANGED,
  payload: { filtering }
});

export const WORKTIME_RECORDS_PAGING_CHANGED = 'WORKTIME_RECORDS_PAGING_CHANGED' as const;
export const changeWorktimeRecordsPaging = (paging: PagingInput) => ({
  type: WORKTIME_RECORDS_PAGING_CHANGED,
  payload: { paging }
});

export type WorktimeCreationAction = ReturnType<typeof worktimeCreation>;
export type WorktimeCreatedAction = ReturnType<typeof worktimeCreated>;
export type WorktimeRecordUpdatedAction = ReturnType<typeof worktimeRecordUpdated>;
export type WorktimeRecordsReceivedAction = ReturnType<typeof worktimeRecordsReceived>;
export type WorktimeRecordsSortingChangedAction = ReturnType<typeof changeWorktimeRecordsSorting>;
export type WorktimeRecordsFilteringChangedAction = ReturnType<typeof changeWorktimeRecordsFiltering>;
export type WorktimeRecordsPagingChangedAction = ReturnType<typeof changeWorktimeRecordsPaging>;

export type WorktimeActions = ReturnType<
    | typeof worktimeCreation
    | typeof worktimeCreated
    | typeof requestWorktimeUpdate
    | typeof worktimeRecordUpdated
    | typeof requestWorktimeRecords
    | typeof worktimeRecordsReceived
    | typeof changeWorktimeRecordsSorting
    | typeof changeWorktimeRecordsFiltering
    | typeof changeWorktimeRecordsPaging>
