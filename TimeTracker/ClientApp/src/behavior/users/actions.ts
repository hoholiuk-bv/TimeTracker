import type { SortingInput } from '../common/types';
import type { User } from './types';
import { FilterType, PaginationType } from './types';

export const USER_LIST_REQUESTED = 'USER_LIST_REQUESTED' as const;
export const requestUserList = (filter: FilterType, sorting: SortingInput, pagination: PaginationType) => ({
  type: USER_LIST_REQUESTED,
  payload: { filter, sorting, pagination },
});

export const USER_LIST_RECEIVED = 'USER_LIST_RECEIVED' as const;
export const receiveUserList = (userList: User[], totalUsersCount: number) => ({
  type: USER_LIST_RECEIVED,
  payload: { userList, totalUsersCount },
});

export const EMPLOYMENT_TYPE_LIST_REQUESTED = 'EMPLOYMENT_TYPE_LIST_REQUESTED' as const;
export const requestEmploymentTypeList = () => ({
  type: EMPLOYMENT_TYPE_LIST_REQUESTED
});

export const EMPLOYMENT_TYPE_LIST_RECEIVED = 'EMPLOYMENT_TYPE_LIST_RECEIVED' as const;
export const receiveEmploymentTypeList = (employmentTypeList: string[]) => ({
  type: EMPLOYMENT_TYPE_LIST_RECEIVED,
  payload: { employmentTypeList },
});

export type UserListReceivedAction = ReturnType<typeof receiveUserList>;
export type EmploymentTypeListReceivedAction = ReturnType<typeof receiveEmploymentTypeList>;
