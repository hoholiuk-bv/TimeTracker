import { createReducer } from '@reduxjs/toolkit';
import { PagingInput, SortingInput, SortingOrder } from '../common/types';
import {
  DAYS_OFF_LIST_RECEIVED, DaysOffListReceivedAction,
  DAYS_OFF_LIST_SORTING_CHANGED, DaysOffListSortingChangedAction,
  DAYS_OFF_LIST_FILTER_CHANGED, DaysOffListFilterChangedAction
} from './actions';
import {DayOffRequest, DayOffRequestFilterInput} from './types';

export type DaysOffState = {
  list: DayOffRequest[] | null,
  paging: PagingInput,
  sorting: SortingInput,
  filter: DayOffRequestFilterInput
};

const initialState: DaysOffState = {
  list: null,
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
  }
};

export default createReducer(initialState, {
  [DAYS_OFF_LIST_RECEIVED]: onDaysOffReceived,
  [DAYS_OFF_LIST_SORTING_CHANGED]: onDaysOffListSortingChanged,
  [DAYS_OFF_LIST_FILTER_CHANGED]: onDaysOffListFilterChanged,
});

function onDaysOffReceived(state: DaysOffState, action: DaysOffListReceivedAction) {
  const { list } = action.payload;

  return { ...state, list };
}

function onDaysOffListSortingChanged(state: DaysOffState, action: DaysOffListSortingChangedAction) {
  const { sorting } = action.payload;

  return { ...state, sorting };
}

function onDaysOffListFilterChanged(state: DaysOffState, action: DaysOffListFilterChangedAction) {
  const { filter } = action.payload;

  return { ...state, filter };
}
