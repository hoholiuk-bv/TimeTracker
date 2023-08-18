import { PagingInput, SortingInput } from '../common/types';
import { DayOffRequestInput, DayOffRequest, DayOffRequestFilterInput } from './types';

export const DAY_OFF_REQUESTED = 'DAY_OFF_REQUESTED' as const;
export const requestDayOff = (input: DayOffRequestInput, userId: string) => ({
  type: DAY_OFF_REQUESTED,
  payload: { input, userId }
});

export const DAYS_OFF_LIST_REQUESTED = 'DAYS_OFF_LIST_REQUESTED' as const;
export const requestDaysOffList = (sorting: SortingInput, paging: PagingInput, filter: DayOffRequestFilterInput) => ({
  type: DAYS_OFF_LIST_REQUESTED,
  payload: { sorting, paging, filter }
});

export const DAYS_OFF_LIST_RECEIVED = 'DAYS_OFF_LIST_RECEIVED' as const;
export const receiveDaysOffList = (list: DayOffRequest[], requestsCount: number) => ({
  type: DAYS_OFF_LIST_RECEIVED,
  payload: { list, requestsCount }
});

export const DAYS_OFF_LIST_SORTING_CHANGED = 'DAYS_OFF_LIST_SORTING_CHANGED' as const;
export const changeDaysOffListSorting = (sorting: SortingInput) => ({
  type: DAYS_OFF_LIST_SORTING_CHANGED,
  payload: { sorting }
});

export const DAYS_OFF_LIST_PAGING_CHANGED = 'DAYS_OFF_LIST_PAGING_CHANGED' as const;
export const changeDaysOffListPaging = (paging: PagingInput) => ({
  type: DAYS_OFF_LIST_PAGING_CHANGED,
  payload: { paging }
});

export const DAYS_OFF_LIST_FILTER_CHANGED = 'DAYS_OFF_LIST_FILTER_CHANGED' as const;
export const changeDaysOffListFilter = (filter: DayOffRequestFilterInput) => ({
  type: DAYS_OFF_LIST_FILTER_CHANGED,
  payload: { filter }
});

export const DAY_OFF_REQUEST_DELETED = 'DAY_OFF_REQUEST_DELETED' as const;
export const deleteDayOffRequest = (requestId: string) => ({
  type: DAY_OFF_REQUEST_DELETED,
  payload: { requestId }
});

export const DAYS_OFF_COUNT_REQUESTED = 'DAYS_OFF_COUNT_REQUESTED' as const;
export const requestDaysOffCount = (userId: string) => ({
  type: DAYS_OFF_COUNT_REQUESTED,
  payload: { userId }
});

export const DAYS_OFF_COUNT_RECEIVED = 'DAYS_OFF_COUNT_RECEIVED' as const;
export const receiveDaysOffCount = (daysOffCount: number) => ({
  type: DAYS_OFF_COUNT_RECEIVED,
  payload: { daysOffCount }
});

export type DaysOffRequestAction = ReturnType<typeof requestDayOff>;
export type DaysOffListRequestedAction = ReturnType<typeof requestDaysOffList>;
export type DaysOffListReceivedAction = ReturnType<typeof receiveDaysOffList>;
export type DaysOffListSortingChangedAction = ReturnType<typeof changeDaysOffListSorting>;
export type DaysOffListPagingChangedAction = ReturnType<typeof changeDaysOffListPaging>;
export type DaysOffListFilterChangedAction = ReturnType<typeof changeDaysOffListFilter>;
export type DayOffDeleteAction = ReturnType<typeof deleteDayOffRequest>;
export type DaysOffCountRequestedAction = ReturnType<typeof requestDaysOffCount>;
export type DaysOffCountReceivedAction = ReturnType<typeof receiveDaysOffCount>;

export type DayOffActions = ReturnType<
  | typeof requestDaysOffList
  | typeof receiveDaysOffList
  | typeof requestDayOff
  | typeof changeDaysOffListSorting
  | typeof changeDaysOffListPaging
  | typeof changeDaysOffListFilter
  | typeof deleteDayOffRequest
  | typeof requestDaysOffCount
  | typeof receiveDaysOffCount>
