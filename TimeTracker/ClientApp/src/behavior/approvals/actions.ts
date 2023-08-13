import { DayOffApproval } from './types';
import { SortingInput, PagingInput } from '../common/types';
import { DayOffApprovalStatus } from '../common/types';

export const APPROVALS_LIST_REQUESTED = 'APPROVALS_LIST_REQUESTED' as const;
export const requestApprovalsList = (sorting: SortingInput, paging: PagingInput) => ({
  type: APPROVALS_LIST_REQUESTED,
  payload: { sorting, paging }
});

export const APPROVALS_LIST_RECEIVED = 'APPROVALS_LIST_RECEIVED' as const;
export const receiveApprovalsList = (list: DayOffApproval[], approvalsCount: number) => ({
  type: APPROVALS_LIST_RECEIVED,
  payload: { list, approvalsCount }
});

export const CHANGE_APPROVAL_STATUS = 'CHANGE_APPROVAL_STATUS' as const;
export const changeApprovalStatus = (requestId: string, status: DayOffApprovalStatus, declineReason?: string) => ({
  type: CHANGE_APPROVAL_STATUS,
  payload: { requestId, status, declineReason }
});

export const APPROVALS_LIST_SORTING_CHANGED = 'APPROVALS_LIST_SORTING_CHANGED' as const;
export const changeApprovalsListSorting = (sorting: SortingInput) => ({
  type: APPROVALS_LIST_SORTING_CHANGED,
  payload: { sorting }
});

export const APPROVALS_LIST_PAGING_CHANGED = 'APPROVALS_LIST_PAGING_CHANGED' as const;
export const changeApprovalsListPaging = (paging: PagingInput) => ({
  type: APPROVALS_LIST_PAGING_CHANGED,
  payload: { paging }
});

export type ApprovalsRequestAction = ReturnType<typeof requestApprovalsList>;
export type ApprovalsReceivedAction = ReturnType<typeof receiveApprovalsList>;
export type ApprovalToggleStatusAction = ReturnType<typeof changeApprovalStatus>;
export type ApprovalsListSortingChangedAction = ReturnType<typeof changeApprovalsListSorting>
export type ApprovalsListPagingChangedAction = ReturnType<typeof changeApprovalsListPaging>

export type ApprovalsActions = ReturnType<
  | typeof requestApprovalsList
  | typeof receiveApprovalsList
  | typeof changeApprovalsListSorting
  | typeof changeApprovalsListPaging
  | typeof changeApprovalStatus>
