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

export type UsersReceivedAction = ReturnType<typeof receiveUserList>;