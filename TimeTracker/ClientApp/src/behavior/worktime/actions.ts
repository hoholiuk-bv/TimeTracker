import type { WorktimeInput } from './types';
import { FilterType, WorktimeRecord } from './types';
import { PagingInput, SortingInput } from '../common/types';

export const WORKTIME_CREATION = 'WORKTIME_CREATION' as const;
export const worktimeCreation = (worktimeCreationInput: WorktimeInput) => ({
  type: WORKTIME_CREATION,
  payload: {worktimeCreationInput}
});

export const WORKTIME_RECORDS_REQUESTED = 'WORKTIME_RECORDS_REQUESTED' as const;
export const requestWorktimeRecords = (sorting: SortingInput, filter: FilterType , paging: PagingInput) => ({
  type: WORKTIME_RECORDS_REQUESTED,
  payload: { sorting, filter, paging },
});

export const WORKTIME_RECORDS_RECEIVED = 'WORKTIME_RECORDS_RECEIVED' as const;
export const worktimeRecordsReceived = (records: WorktimeRecord[], recordsCount: number) => ({
  type: WORKTIME_RECORDS_RECEIVED,
  payload: { records, recordsCount },
});

export const WORKTIME_RECORDS_SORTING_CHANGED = 'WORKTIME_RECORDS_SORTING_CHANGED' as const;
export const changeWorktimeRecordsSorting = (sorting: SortingInput) => ({
  type: WORKTIME_RECORDS_SORTING_CHANGED,
  payload: { sorting }
});

export const WORKTIME_RECORDS_FILTERING_CHANGED = 'WORKTIME_RECORDS_FILTERING_CHANGED' as const;
export const changeWorktimeRecordsFiltering = (filtering: FilterType) => ({
  type: WORKTIME_RECORDS_FILTERING_CHANGED,
  payload: { filtering }
});

export const WORKTIME_RECORDS_PAGING_CHANGED = 'WORKTIME_RECORDS_PAGING_CHANGED' as const;
export const changeWorktimeRecordsPaging = (paging: PagingInput) => ({
  type: WORKTIME_RECORDS_PAGING_CHANGED,
  payload: { paging }
});

export type WorktimeCreationAction = ReturnType<typeof worktimeCreation>;
export type WorktimeRecordsReceivedAction = ReturnType<typeof worktimeRecordsReceived>;
export type WorktimeRecordsSortingChangedAction = ReturnType<typeof changeWorktimeRecordsSorting>;
export type WorktimeRecordsFilteringChangedAction = ReturnType<typeof changeWorktimeRecordsFiltering>;
export type WorktimeRecordsPagingChangedAction = ReturnType<typeof changeWorktimeRecordsPaging>;

export type WorktimeActions = ReturnType<
    | typeof worktimeCreation
    | typeof requestWorktimeRecords
    | typeof worktimeRecordsReceived
    | typeof changeWorktimeRecordsSorting
    | typeof changeWorktimeRecordsFiltering
    | typeof changeWorktimeRecordsPaging>
