import {createReducer} from '@reduxjs/toolkit';
import type {User} from './types';
import {
  USER_LIST_RECEIVED,
  UserListReceivedAction,
  ACTIVITY_STATUS_TOGGLED,
  ActivityStatusToggledAction,
} from './actions';

export type UsersState = {
  list: User[];
  totalUsersCount: number;
};

const initialState: UsersState = {
  list: [],
  totalUsersCount: -1,
};

export default createReducer(initialState, {
  [USER_LIST_RECEIVED]: onUsersReceived,
  [ACTIVITY_STATUS_TOGGLED]: onActivityStatusToggled,
});

function onUsersReceived(state: UsersState, action: UserListReceivedAction): UsersState {
  const list = action.payload.userList;
  const totalUsersCount = action.payload.totalUsersCount;
  return {...state, list, totalUsersCount};
}

function onActivityStatusToggled(state: UsersState, action: ActivityStatusToggledAction): UsersState {
  const userIndex = state.list.findIndex((user) => user.id === action.payload.id);

  if (userIndex !== -1) {
    const user = { ...state.list[userIndex] };
    const updatedUser = { ...user, isActive: !user.isActive };
    const updatedList = [...state.list];
    updatedList[userIndex] = updatedUser;

    return { ...state, list: updatedList };
  }

  return state;
}
