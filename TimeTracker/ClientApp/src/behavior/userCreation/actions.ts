import type { ApproverInfo } from './types';
import { FilterType } from '../users/types';
import { UserCreationType } from './types';

export const USER_CREATION = 'USER_CREATION' as const;
export const userCreation = (userCreationInput: UserCreationType) => ({
  type: USER_CREATION,
  payload: { userCreationInput }
});

export const SHORT_USER_LIST_REQUESTED = 'SHORT_USER_LIST_REQUESTED' as const;
export const requestUserList = (filter: FilterType) => ({
  type: SHORT_USER_LIST_REQUESTED,
  payload: { filter },
});

export const SHORT_USER_LIST_RECEIVED = 'SHORT_USER_LIST_RECEIVED' as const;
export const receiveUserList = (userList: ApproverInfo[]) => ({
  type: SHORT_USER_LIST_RECEIVED,
  payload: { userList },
});

export type UserCreationAction = ReturnType<typeof userCreation>;
export type UserListReceivedAction = ReturnType<typeof receiveUserList>;
export type CreationActions = ReturnType<
    | typeof userCreation
    | typeof receiveUserList>
