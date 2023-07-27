import type { SortingInput } from '../common/types';
import type { User } from './types';
import { FilterType } from './types';
import { PagingInput } from '../common/types';

export const USER_LIST_REQUESTED = 'USER_LIST_REQUESTED' as const;
export const requestUserList = (filter: FilterType, sorting: SortingInput, pagination: PagingInput) => ({
  type: USER_LIST_REQUESTED,
  payload: { filter, sorting, pagination },
});

export const USER_LIST_RECEIVED = 'USER_LIST_RECEIVED' as const;
export const userListReceived = (userList: User[], totalUsersCount: number) => ({
  type: USER_LIST_RECEIVED,
  payload: { userList, totalUsersCount },
});

export const TOGGLE_ACTIVITY_STATUS_REQUESTED = 'TOGGLE_ACTIVITY_STATUS_REQUESTED' as const;
export const requestToggleActivityStatus = (id: string) => ({
  type: TOGGLE_ACTIVITY_STATUS_REQUESTED,
  payload: { id },
});

export const ACTIVITY_STATUS_TOGGLED = 'ACTIVITY_STATUS_TOGGLED' as const;
export const activityStatusToggled = (id: string) => ({
  type: ACTIVITY_STATUS_TOGGLED,
  payload: { id },
});

export const USER_LIST_SORTING_CHANGED = 'USER_LIST_SORTING_CHANGED' as const;
export const changeUserListSorting = (sorting: SortingInput) => ({
  type: USER_LIST_SORTING_CHANGED,
  payload: { sorting }
});

export const USER_LIST_FILTERING_CHANGED = 'USER_LIST_FILTERING_CHANGED' as const;
export const changeUserListFiltering = (filtering: FilterType) => ({
  type: USER_LIST_FILTERING_CHANGED,
  payload: { filtering }
});

export const USER_LIST_PAGING_CHANGED = 'USER_LIST_PAGING_CHANGED' as const;
export const changeUserListPaging = (paging: PagingInput) => ({
  type: USER_LIST_PAGING_CHANGED,
  payload: { paging }
});

export type UserListReceivedAction = ReturnType<typeof userListReceived>;
export type ActivityStatusToggledAction = ReturnType<typeof activityStatusToggled>;
export type UserListSortingChangedAction = ReturnType<typeof changeUserListSorting>;
export type UserListFilteringChangedAction = ReturnType<typeof changeUserListFiltering>;
export type UserListPagingChangedAction = ReturnType<typeof changeUserListPaging>;
