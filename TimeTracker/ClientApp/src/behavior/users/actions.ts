import type {User} from './types';

export const USER_LIST_REQUESTED = 'USER_LIST_REQUESTED' as const;
export const requestUserList = (searchText: string, pageSize: number, pageNumber: number, fieldName: string, sortingOrder: string, startEmploymentDate: string, endEmploymentDate: string, employmentType: string[]) => ({
  type: USER_LIST_REQUESTED,
  payload: {searchText, pageSize, pageNumber, fieldName, sortingOrder, startEmploymentDate, endEmploymentDate, employmentType},
});

export const USER_LIST_RECEIVED = 'USER_LIST_RECEIVED' as const;
export const receiveUserList = (userList: User[], totalUsersCount: number) => ({
  type: USER_LIST_RECEIVED,
  payload: {userList, totalUsersCount},
});

export const EMPLOYMENT_TYPE_LIST_REQUESTED = 'EMPLOYMENT_TYPE_LIST_REQUESTED' as const;
export const requestEmploymentTypeList = () => ({
  type: EMPLOYMENT_TYPE_LIST_REQUESTED
});

export const EMPLOYMENT_TYPE_LIST_RECEIVED = 'EMPLOYMENT_TYPE_LIST_RECEIVED' as const;
export const receiveEmploymentTypeList = (employmentTypeList: string[]) => ({
  type: EMPLOYMENT_TYPE_LIST_RECEIVED,
  payload: {employmentTypeList},
});

export type UserListReceivedAction = ReturnType<typeof receiveUserList>;
export type EmploymentTypeListReceivedAction = ReturnType<typeof receiveEmploymentTypeList>;
