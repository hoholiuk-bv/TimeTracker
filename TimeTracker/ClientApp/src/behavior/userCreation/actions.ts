import type { CreationInput, User } from './types';

export const USER_CREATION = 'USER_CREATION' as const;
export const userCreation = (userCreationInput: CreationInput) => ({
  type: USER_CREATION,
  payload: { userCreationInput }
});

export const SHORT_USER_LIST_REQUESTED = 'SHORT_USER_LIST_REQUESTED' as const;
export const requestUserList = () => ({
  type: SHORT_USER_LIST_REQUESTED,
});

export const SHORT_USER_LIST_RECEIVED = 'SHORT_USER_LIST_RECEIVED' as const;
export const receiveUserList = (userList: User[]) => ({
  type: SHORT_USER_LIST_RECEIVED,
  payload: {userList},
});

export type UserCreationAction = ReturnType<typeof userCreation>;
export type UserListReceivedAction = ReturnType<typeof receiveUserList>;
export type CreationActions = ReturnType<
    | typeof userCreation
    | typeof receiveUserList>
