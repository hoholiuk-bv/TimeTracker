import type { WorktimeInput, WorktimeStats } from './types';
import { WorktimeFilterType, WorktimeRecord } from './types';
import { PagingInput, SortingInput } from '../common/types';
import { FilterType as UserFilterType } from '../users/types';

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
export const requestWorktimeRecords = (sorting?: SortingInput, filter?: WorktimeFilterType , paging?: PagingInput) => ({
  type: WORKTIME_RECORDS_REQUESTED,
  payload: { sorting, filter, paging },
});

export const WORKTIME_RECORDS_RECEIVED = 'WORKTIME_RECORDS_RECEIVED' as const;
export const worktimeRecordsReceived = (records: WorktimeRecord[]) => ({
  type: WORKTIME_RECORDS_RECEIVED,
  payload: { records },
});

export const WORKTIME_RECORD_COUNT_REQUESTED = 'WORKTIME_RECORD_COUNT_REQUESTED' as const;
export const requestWorktimeRecordCount = (filter: WorktimeFilterType) => ({
  type: WORKTIME_RECORD_COUNT_REQUESTED,
  payload: { filter },
});

export const WORKTIME_RECORD_COUNT_RECEIVED = 'WORKTIME_RECORD_COUNT_RECEIVED' as const;
export const worktimeRecordCountReceived = (recordCount: number) => ({
  type: WORKTIME_RECORD_COUNT_RECEIVED,
  payload: { recordCount },
});

export const WORKTIME_STATS_REQUESTED = 'WORKTIME_STATS_REQUESTED' as const;
export const requestWorktimeStats = (filter: WorktimeFilterType) => ({
  type: WORKTIME_STATS_REQUESTED,
  payload: { filter },
});

export const WORKTIME_STATS_RECEIVED = 'WORKTIME_STATS_RECEIVED' as const;
export const worktimeStatsReceived = (worktimeStats: WorktimeStats) => ({
  type: WORKTIME_STATS_RECEIVED,
  payload: { worktimeStats },
});

export const UNFINISHED_WORKTIME_RECORD_REQUESTED = 'UNFINISHED_WORKTIME_RECORD_REQUESTED' as const;
export const requestUnfinishedWorktimeRecord = (userId: string) => ({
  type: UNFINISHED_WORKTIME_RECORD_REQUESTED,
  payload: { userId },
});

export const UNFINISHED_WORKTIME_RECORD_RECEIVED = 'UNFINISHED_WORKTIME_RECORD_RECEIVED' as const;
export const unfinishedWorktimeRecordReceived = (unfinishedWorktimeRecord: WorktimeRecord) => ({
  type: UNFINISHED_WORKTIME_RECORD_RECEIVED,
  payload: { unfinishedWorktimeRecord },
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

export const WORKTIME_FINISH_DATE_UPDATE_REQUESTED = 'WORKTIME_FINISH_DATE_UPDATE_REQUESTED' as const;
export const requestWorktimeFinishDateUpdate = (userId: string) => ({
  type: WORKTIME_FINISH_DATE_UPDATE_REQUESTED,
  payload: { userId }
});

export const WORKTIME_FINISH_DATE_UPDATED = 'WORKTIME_FINISH_DATE_UPDATED' as const;
export const worktimeFinishDateUpdated = (worktimeRecord: WorktimeRecord) => ({
  type: WORKTIME_FINISH_DATE_UPDATED,
  payload: { worktimeRecord }
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

export const URL_FOR_DOWNLOADING_USER_WORKTIME_RECORDS_REQUESTED = 'URL_FOR_DOWNLOADING_USER_WORKTIME_RECORDS_REQUESTED' as const;
export const requestUrlForDownloadingUserWorktimeRecors = (filter: WorktimeFilterType) => ({
  type: URL_FOR_DOWNLOADING_USER_WORKTIME_RECORDS_REQUESTED,
  payload: { filter },
});

export const URL_FOR_DOWNLOADING_USER_WORKTIME_RECORDS_RECEIVED = 'URL_FOR_DOWNLOADING_USER_WORKTIME_RECORDS_RECEIVED' as const;
export const urlForDownloadingUserWorktimeRecorsReceived = (urlForDownloadingUserWorktimeRecors: string) => ({
  type: URL_FOR_DOWNLOADING_USER_WORKTIME_RECORDS_RECEIVED,
  payload: { urlForDownloadingUserWorktimeRecors },
});

export const URL_FOR_DOWNLOADING_WORKTIME_STATS_REQUESTED = 'URL_FOR_DOWNLOADING_WORKTIME_STATS_REQUESTED' as const;
export const requestUrlForDownloadingWorktimeStats = (filter: UserFilterType) => ({
  type: URL_FOR_DOWNLOADING_WORKTIME_STATS_REQUESTED,
  payload: { filter },
});

export const URL_FOR_DOWNLOADING_WORKTIME_STATS_RECEIVED = 'URL_FOR_DOWNLOADING_WORKTIME_STATS_RECEIVED' as const;
export const urlForDownloadingWorktimeStatsReceived = (urlForDownloadingWorktimeStats: string) => ({
  type: URL_FOR_DOWNLOADING_WORKTIME_STATS_RECEIVED,
  payload: { urlForDownloadingWorktimeStats },
});

export type WorktimeCreationAction = ReturnType<typeof worktimeCreation>;
export type WorktimeCreatedAction = ReturnType<typeof worktimeCreated>;
export type WorktimeRecordsRequestAction = ReturnType<typeof requestWorktimeRecords>;
export type WorktimeRecordsReceivedAction = ReturnType<typeof worktimeRecordsReceived>;
export type WorktimeRecordCountRequestAction = ReturnType<typeof requestWorktimeRecordCount>;
export type WorktimeRecordCountReceivedAction = ReturnType<typeof worktimeRecordCountReceived>;
export type WorktimeStatsRequestAction = ReturnType<typeof requestWorktimeStats>;
export type WorktimeStatsReceivedAction = ReturnType<typeof worktimeStatsReceived>;
export type UnfinishedWorktimeRecordRequestAction = ReturnType<typeof requestUnfinishedWorktimeRecord>;
export type UnfinishedWorktimeRecordReceivedAction = ReturnType<typeof unfinishedWorktimeRecordReceived>;
export type WorktimeRecordUpdateRequestAction = ReturnType<typeof requestWorktimeUpdate>;
export type WorktimeRecordUpdatedAction = ReturnType<typeof worktimeRecordUpdated>;
export type WorktimeFinishDateUpdateRequestAction = ReturnType<typeof requestWorktimeFinishDateUpdate>;
export type WorktimeFinishDateUpdatedAction = ReturnType<typeof worktimeFinishDateUpdated>;
export type WorktimeRecordsSortingChangedAction = ReturnType<typeof changeWorktimeRecordsSorting>;
export type WorktimeRecordsFilteringChangedAction = ReturnType<typeof changeWorktimeRecordsFiltering>;
export type WorktimeRecordsPagingChangedAction = ReturnType<typeof changeWorktimeRecordsPaging>;
export type UrlForDownloadingUserWorktimeRecorsRequestAction = ReturnType<typeof requestUrlForDownloadingUserWorktimeRecors>;
export type UrlForDownloadingUserWorktimeRecorsReceivedAction = ReturnType<typeof urlForDownloadingUserWorktimeRecorsReceived>;
export type UrlForDownloadingWorktimeStatsRequestAction = ReturnType<typeof requestUrlForDownloadingWorktimeStats>;
export type UrlForDownloadingWorktimeStatsReceivedAction = ReturnType<typeof urlForDownloadingWorktimeStatsReceived>;

export type WorktimeActions = ReturnType<
    | typeof worktimeCreation
    | typeof worktimeCreated
    | typeof requestWorktimeRecords
    | typeof worktimeRecordsReceived
    | typeof requestWorktimeRecordCount
    | typeof worktimeRecordCountReceived
    | typeof requestWorktimeStats
    | typeof worktimeStatsReceived
    | typeof requestUnfinishedWorktimeRecord
    | typeof unfinishedWorktimeRecordReceived
    | typeof requestWorktimeUpdate
    | typeof worktimeRecordUpdated
    | typeof requestWorktimeFinishDateUpdate
    | typeof worktimeFinishDateUpdated
    | typeof changeWorktimeRecordsSorting
    | typeof changeWorktimeRecordsFiltering
    | typeof changeWorktimeRecordsPaging
    | typeof requestUrlForDownloadingUserWorktimeRecors
    | typeof urlForDownloadingUserWorktimeRecorsReceived
    | typeof requestUrlForDownloadingWorktimeStats
    | typeof urlForDownloadingWorktimeStatsReceived>
