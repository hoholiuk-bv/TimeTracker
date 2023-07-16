import { createReducer } from '@reduxjs/toolkit';
import { PagingInput, SortingInput, SortingOrder } from '../common/types';
import { DaysOffListReceivedAction, DaysOffListSortingChangedAction, DAYS_OFF_LIST_RECEIVED, DAYS_OFF_LIST_SORTING_CHANGED } from './actions';
import { DayOffType } from './types';

export type DaysOffState = {
  list: DayOffType[],
  paging: PagingInput,
  sorting: SortingInput,
};

const initialState: DaysOffState = {
  list: [],
  paging: {
    pageNumber: 1,
    pageSize: 10,
  },
  sorting: {
    sortingField: 'StartDate',
    sortingOrder: SortingOrder.Ascending,
  }
};

export default createReducer(initialState, {
  [DAYS_OFF_LIST_RECEIVED]: onDaysOffReceived,
  [DAYS_OFF_LIST_SORTING_CHANGED]: onDaysOffListSortingChanged,
});

function onDaysOffReceived(state: DaysOffState, action: DaysOffListReceivedAction) {
  const { list } = action.payload;

  return { ...state, list };
}

function onDaysOffListSortingChanged(state: DaysOffState, action: DaysOffListSortingChangedAction) {
  const { sorting } = action.payload;

  return { ...state, sorting };
}