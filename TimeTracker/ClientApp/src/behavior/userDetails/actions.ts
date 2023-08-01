import type { User } from '../users/types';
import type { ApproverInfo } from '../userCreation/types';
import { UserUpdateType } from './types';

export const USER_REQUESTED = 'USER_REQUESTED' as const;
export const requestUser = (id: string) => ({
  type: USER_REQUESTED,
  payload: { id }
});

export const USER_RECEIVED = 'USER_RECEIVED' as const;
export const receiveUser = (user: User | null) => ({
  type: USER_RECEIVED,
  payload: { user },
});

export const APPROVERS_REQUESTED = 'APPROVERS_REQUESTED' as const;
export const requestApprovers = (userId: string) => ({
  type: APPROVERS_REQUESTED,
  payload: { userId }
});

export const APPROVERS_RECEIVED = 'APPROVERS_RECEIVED' as const;
export const receiveApprovers = (approverList: ApproverInfo[]) => ({
  type: APPROVERS_RECEIVED,
  payload: { approverList },
});

export const USER_UPDATE_REQUESTED = 'USER_UPDATE_REQUESTED' as const;
export const requestUserUpdate = (user: UserUpdateType) => ({
  type: USER_UPDATE_REQUESTED,
  payload: { user }
});

export const USER_UPDATED = 'USER_UPDATED' as const;
export const receiveUserUpdate = (userUpdate: User) => ({
  type: USER_UPDATED,
  payload: { userUpdate },
});

export type UserReceivedAction = ReturnType<typeof receiveUser>;
export type ApproversReceivedAction = ReturnType<typeof receiveApprovers>;
export type UpdatedUserReceivedAction = ReturnType<typeof receiveUserUpdate>;
