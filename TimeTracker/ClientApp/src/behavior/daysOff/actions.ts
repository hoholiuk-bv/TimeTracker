import { PagingInput, SortingInput } from '../common/types';
import { DayOffRequestInput, DayOffRequest, DayOffRequestFilterInput } from './types';

export const DAY_OFF_REQUESTED = 'DAY_OFF_REQUESTED' as const;
export const requestDayOff = (input: DayOffRequestInput) => ({
  type: DAY_OFF_REQUESTED,
  payload: { input }
});

export const DAYS_OFF_LIST_REQUESTED = 'DAYS_OFF_LIST_REQUESTED' as const;
export const requestDaysOffList = (sorting: SortingInput, paging: PagingInput, filter: DayOffRequestFilterInput) => ({
  type: DAYS_OFF_LIST_REQUESTED,
  payload: { sorting, paging, filter }
});

export const DAYS_OFF_LIST_RECEIVED = 'DAYS_OFF_LIST_RECEIVED' as const;
export const receiveDaysOffList = (list: DayOffRequest[]) => ({
  type: DAYS_OFF_LIST_RECEIVED,
  payload: { list }
});

export const DAYS_OFF_LIST_SORTING_CHANGED = 'DAYS_OFF_LIST_SORTING_CHANGED' as const;
export const changeDaysOffListSorting = (sorting: SortingInput) => ({
  type: DAYS_OFF_LIST_SORTING_CHANGED,
  payload: { sorting }
});

export const DAYS_OFF_LIST_FILTER_CHANGED = 'DAYS_OFF_LIST_FILTER_CHANGED' as const;
export const changeDaysOffListFilter = (filter: DayOffRequestFilterInput) => ({
  type: DAYS_OFF_LIST_FILTER_CHANGED,
  payload: { filter }
});

export type DaysOffRequestAction = ReturnType<typeof requestDayOff>;
export type DaysOffListRequestedAction = ReturnType<typeof requestDaysOffList>;
export type DaysOffListReceivedAction = ReturnType<typeof receiveDaysOffList>;
export type DaysOffListSortingChangedAction = ReturnType<typeof changeDaysOffListSorting>;
export type DaysOffListFilterChangedAction = ReturnType<typeof changeDaysOffListFilter>;

export type DayOffActions = ReturnType<
  | typeof requestDaysOffList
  | typeof receiveDaysOffList
  | typeof requestDayOff
  | typeof changeDaysOffListSorting>
