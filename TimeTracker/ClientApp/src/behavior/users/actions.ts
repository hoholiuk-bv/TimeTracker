import type {User} from './types';

export const USER_LIST_REQUESTED = 'USER_LIST_REQUESTED' as const;
export const requestUserList = () => ({
  type: USER_LIST_REQUESTED,
});

export const USER_LIST_RECEIVED = 'USER_LIST_RECEIVED' as const;
export const receiveUserList = (userList: User[], totalUsersCount: number) => ({
  type: USER_LIST_RECEIVED,
  payload: {userList, totalUsersCount},
});

export const SEARCHED_USERS_REQUESTED = 'SEARCHED_USERS_REQUESTED' as const;
export const requestSearchedUsers = (searchedString: string) => ({
  type: SEARCHED_USERS_REQUESTED,
  payload: {searchedString}
});

export const SEARCHED_USERS_RECEIVED = 'SEARCHED_USERS_RECEIVED' as const;
export const receiveSearchedUsers = (userList: User[]) => ({
  type: SEARCHED_USERS_RECEIVED,
  payload: {userList},
});

export type UserListReceivedAction = ReturnType<typeof receiveUserList>;
export type SearchedUsersReceivedAction = ReturnType<typeof receiveSearchedUsers>;
