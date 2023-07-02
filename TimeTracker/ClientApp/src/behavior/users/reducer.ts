import { createReducer } from '@reduxjs/toolkit';
import type { User } from './types';
import {
  USER_LIST_RECEIVED,
  TOTAL_USERS_COUNT_RECEIVED,
  UserListReceivedAction,
  TotalUsersCountReceivedAction,
} from './actions';

export type UsersState = { 
  users: User[];
  totalUsersCount: number;
};

const initialState: UsersState = {
  users: [],
  totalUsersCount: 0,
};

export default createReducer(initialState, {
  [USER_LIST_RECEIVED]: onUsersReceived,
  [TOTAL_USERS_COUNT_RECEIVED]: onTotalUsersCountReceived,
});

function onUsersReceived(state: UsersState, action: UserListReceivedAction): UsersState {
  const { users } = action.payload;

  users.forEach(user => {
    user.employmentDate = new Date(user.employmentDate).toLocaleDateString('uk-UA', { day: '2-digit', month: '2-digit', year: 'numeric' });
    user.employmentType = user.employmentType.toLowerCase().replace(/_/g, '-');
  });

  return { ...state, users };
}

function onTotalUsersCountReceived(state: UsersState, action: TotalUsersCountReceivedAction): UsersState {
  const { totalUsersCount } = action.payload;
  return { ...state, totalUsersCount };
}
