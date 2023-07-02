import type { User } from './types';

export const USER_LIST_REQUESTED = 'USER_LIST_REQUESTED' as const;
export const requestUserList = () => ({
  type: USER_LIST_REQUESTED,
});

export const USER_LIST_RECEIVED = 'USER_LIST_RECEIVED' as const;
export const receiveUserList = (userList: User[], totalUsersCount: number) => ({
  type: USER_LIST_RECEIVED,
  payload: { userList, totalUsersCount },
});

export type UserListReceivedAction = ReturnType<typeof receiveUserList>;
