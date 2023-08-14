import { createReducer } from '@reduxjs/toolkit';
import { DayOffApproval } from './types';
import { PagingInput, SortingInput, SortingOrder } from '../common/types';
import { ApprovalsListSortingChangedAction, ApprovalsListPagingChangedAction, APPROVALS_LIST_RECEIVED, APPROVALS_LIST_SORTING_CHANGED, APPROVALS_LIST_PAGING_CHANGED } from './actions';
import { ApprovalsReceivedAction } from './actions';

export type ApprovalsState = {
  list: DayOffApproval[] | null,
  approvalsCount: number,
  paging: PagingInput,
  sorting: SortingInput,
};

const initialState: ApprovalsState = {
  list: null,
  approvalsCount: 0,
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
  [APPROVALS_LIST_SORTING_CHANGED]: onApprovalsListSortingChanged,
  [APPROVALS_LIST_PAGING_CHANGED]: onApprovalsListPagingChanged,
});

function onApprovalsReceived(state: ApprovalsState, action: ApprovalsReceivedAction) {
  const { list, approvalsCount } = action.payload;

  return { ...state, list, approvalsCount };
}

function onApprovalsListSortingChanged(state: ApprovalsState, action: ApprovalsListSortingChangedAction) {
  const { sorting } = action.payload;

  return { ...state, sorting };
}

function onApprovalsListPagingChanged(state: ApprovalsState, action: ApprovalsListPagingChangedAction) {
  const { paging } = action.payload;

  return { ...state, paging };
}
