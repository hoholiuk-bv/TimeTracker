import { createReducer } from '@reduxjs/toolkit';
import { PagingInput, SortingInput, SortingOrder } from '../common/types';
import {
  DAYS_OFF_LIST_RECEIVED, DaysOffListReceivedAction,
  DAYS_OFF_LIST_SORTING_CHANGED, DaysOffListSortingChangedAction,
  DAYS_OFF_LIST_PAGING_CHANGED, DaysOffListPagingChangedAction,
  DAYS_OFF_LIST_FILTER_CHANGED, DaysOffListFilterChangedAction, DaysOffCountReceivedAction, DAYS_OFF_COUNT_RECEIVED,
} from './actions';
import { DayOffRequest, DayOffRequestFilterInput } from './types';

export type DaysOffState = {
  list: DayOffRequest[] | null,
  requestsCount: number,
  paging: PagingInput,
  sorting: SortingInput,
  filter: DayOffRequestFilterInput,
  daysOffCount: number
};

const initialState: DaysOffState = {
  list: null,
  requestsCount: 0,
  paging: {
    pageNumber: 1,
    pageSize: 10,
  },
  sorting: {
    sortingField: 'StartDate',
    sortingOrder: SortingOrder.Ascending,
  },
  filter: {
    requestId: null,
    userId: null,
  },
  daysOffCount: 0
};

export default createReducer(initialState, {
  [DAYS_OFF_LIST_RECEIVED]: onDaysOffReceived,
  [DAYS_OFF_COUNT_RECEIVED]: onDaysOffCountReceived,
  [DAYS_OFF_LIST_SORTING_CHANGED]: onDaysOffListSortingChanged,
  [DAYS_OFF_LIST_PAGING_CHANGED]: onDaysOffListPagingChanged,
  [DAYS_OFF_LIST_FILTER_CHANGED]: onDaysOffListFilterChanged,
});

function onDaysOffReceived(state: DaysOffState, action: DaysOffListReceivedAction) {
  const { list } = action.payload;
  const { requestsCount } = action.payload;

  return { ...state, list, requestsCount };
}

function onDaysOffCountReceived(state: DaysOffState, action: DaysOffCountReceivedAction) {
  const { daysOffCount } = action.payload;

  return { ...state, daysOffCount };
}

function onDaysOffListSortingChanged(state: DaysOffState, action: DaysOffListSortingChangedAction) {
  const { sorting } = action.payload;

  return { ...state, sorting };
}

function onDaysOffListPagingChanged(state: DaysOffState, action: DaysOffListPagingChangedAction) {
  const { paging } = action.payload;

  return { ...state, paging };
}

function onDaysOffListFilterChanged(state: DaysOffState, action: DaysOffListFilterChangedAction) {
  const { filter } = action.payload;

  return { ...state, filter };
}
