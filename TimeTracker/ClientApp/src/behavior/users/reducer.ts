import { createReducer } from '@reduxjs/toolkit';
import type { User } from './types';
import { FilterType } from './types';
import { PagingInput, SortingInput, SortingOrder } from '../common/types';
import {
  USER_LIST_RECEIVED, UserListReceivedAction,
  USER_LIST_SORTING_CHANGED, UserListSortingChangedAction,
  USER_LIST_FILTERING_CHANGED, UserListFilteringChangedAction,
  USER_LIST_PAGING_CHANGED, UserListPagingChangedAction,
  USER_PASSWORD_CHANGED, UserPasswordChangedAction,
  RESET_PASSWORD_CHANGE_STATUS, ResetPasswordChangeStatusAction,
} from './actions';

export type UsersState = {
  list: User[] | null;
  totalUsersCount: number;
  isPasswordChanged: boolean | null;
  paging: PagingInput;
  sorting: SortingInput;
  filtering: FilterType;
};

const initialState: UsersState = {
  list: null,
  totalUsersCount: 0,
  isPasswordChanged: null,
  paging: {
    pageSize: 10,
    pageNumber: 1
  },
  sorting: {
    sortingField: 'EmploymentDate',
    sortingOrder: SortingOrder.Ascending
  },
  filtering: {
    searchText: '',
    startEmploymentDate: null,
    endEmploymentDate: null,
    employmentTypes: [],
    showOnlyActiveUsers: true
  }
};

export default createReducer(initialState, {
  [USER_LIST_RECEIVED]: onUsersReceived,
  [USER_LIST_SORTING_CHANGED]: onUserListSortingChanged,
  [USER_LIST_FILTERING_CHANGED]: onUserListFilteringChanged,
  [USER_LIST_PAGING_CHANGED]: onUserListPagingChanged,
  [USER_PASSWORD_CHANGED]: onUserPasswordChanged,
  [RESET_PASSWORD_CHANGE_STATUS]: onPasswordChangeStatusReset,
});

function onUsersReceived(state: UsersState, action: UserListReceivedAction): UsersState {
  const list = action.payload.userList;
  const totalUsersCount = action.payload.totalUsersCount;
  return {...state, list, totalUsersCount};
}

function onUserListSortingChanged(state: UsersState, action: UserListSortingChangedAction) {
  const { sorting } = action.payload;
  return { ...state, sorting };
}

function onUserListFilteringChanged(state: UsersState, action: UserListFilteringChangedAction) {
  const { filtering } = action.payload;
  const newPaging = {...state.paging, pageNumber: 1};
  return { ...state, filtering, paging: newPaging };
}

function onUserListPagingChanged(state: UsersState, action: UserListPagingChangedAction) {
  const { paging } = action.payload;
  return { ...state, paging };
}

function onUserPasswordChanged(state: UsersState, action: UserPasswordChangedAction) {
  const { isPasswordChanged } = action.payload;
  return { ...state, isPasswordChanged };
}

function onPasswordChangeStatusReset(state: UsersState, action: ResetPasswordChangeStatusAction) {
  return { ...state, isPasswordChanged: null };
}
