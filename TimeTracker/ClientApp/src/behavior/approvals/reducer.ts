import { createReducer } from '@reduxjs/toolkit';
import { DayOffApproval } from './types';
import { PagingInput, SortingInput, SortingOrder } from '../common/types';
import { ApprovalsListSortingChangedAction, APPROVALS_LIST_RECEIVED, APPROVALS_LIST_SORTING_CHANGED } from './actions';
import { ApprovalsReceivedAction } from './actions';

export type ApprovalsState = {
  list: DayOffApproval[] | null,
  paging: PagingInput,
  sorting: SortingInput,
};

const initialState: ApprovalsState = {
  list: null,
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
  [APPROVALS_LIST_RECEIVED]: onApprovalsReceived,
  [APPROVALS_LIST_SORTING_CHANGED]: onApprovalsListSortingChanged
});

function onApprovalsReceived(state: ApprovalsState, action: ApprovalsReceivedAction) {
  const { list } = action.payload;

  return { ...state, list };
}

function onApprovalsListSortingChanged(state: ApprovalsState, action: ApprovalsListSortingChangedAction) {
  const { sorting } = action.payload;

  return { ...state, sorting };
}
