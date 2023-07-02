import type { User } from './types';

export const USER_LIST_REQUESTED = 'USER_LIST_REQUESTED' as const;
export const requestUserList = () => ({
  type: USER_LIST_REQUESTED,
});

export const USER_LIST_RECEIVED = 'USER_LIST_RECEIVED' as const;
export const receiveUserList = (users: User[]) => ({
  type: USER_LIST_RECEIVED,
  payload: { users },
});

export const TOTAL_USERS_COUNT_REQUESTED = 'TOTAL_USERS_COUNT_REQUESTED' as const;
export const requestTotalUsersCount = () => ({
  type: TOTAL_USERS_COUNT_REQUESTED,
});

export const TOTAL_USERS_COUNT_RECEIVED = 'TOTAL_USERS_COUNT_RECEIVED' as const;
export const receiveTotalUsersCount = (totalUsersCount: number) => ({
  type: TOTAL_USERS_COUNT_RECEIVED,
  payload: { totalUsersCount },
});

export type UserListReceivedAction = ReturnType<typeof receiveUserList>;
export type TotalUsersCountReceivedAction = ReturnType<typeof receiveTotalUsersCount>;
