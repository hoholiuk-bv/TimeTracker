import {createReducer} from '@reduxjs/toolkit';
import type {User} from './types';
import {
  USER_LIST_RECEIVED,
  EMPLOYMENT_TYPE_LIST_RECEIVED,
  UserListReceivedAction,
  EmploymentTypeListReceivedAction
} from './actions';

export type UsersState = {
  list: User[];
  totalUsersCount: number;
  employmentTypeList: string[];
};

const initialState: UsersState = {
  list: [],
  totalUsersCount: 0,
  employmentTypeList: [],
};

export default createReducer(initialState, {
  [USER_LIST_RECEIVED]: onUsersReceived,
  [EMPLOYMENT_TYPE_LIST_RECEIVED]: onEmploymentTypeListReceived,
});

function onUsersReceived(state: UsersState, action: UserListReceivedAction): UsersState {
  const list = action.payload.userList;
  const totalUsersCount = action.payload.totalUsersCount;
  return {...state, list, totalUsersCount};
}

function onEmploymentTypeListReceived(state: UsersState, action: EmploymentTypeListReceivedAction): UsersState {
  const employmentTypeList = action.payload.employmentTypeList;
  return {...state, employmentTypeList};
}
