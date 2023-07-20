import type { SortingInput } from '../common/types';
import type { User } from './types';
import { FilterType } from './types';
import {PagingInput} from '../common/types';

export const USER_LIST_REQUESTED = 'USER_LIST_REQUESTED' as const;
export const requestUserList = (filter: FilterType, sorting: SortingInput, pagination: PagingInput) => ({
  type: USER_LIST_REQUESTED,
  payload: { filter, sorting, pagination },
});

export const USER_LIST_RECEIVED = 'USER_LIST_RECEIVED' as const;
export const receiveUserList = (userList: User[], totalUsersCount: number) => ({
  type: USER_LIST_RECEIVED,
  payload: { userList, totalUsersCount },
});

export type UserListReceivedAction = ReturnType<typeof receiveUserList>;
