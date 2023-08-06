export enum SortingOrder {
  Ascending = 'ASCENDING',
  Descending = 'DESCENDING',
}

export type SortingInput = {
  sortingField: string;
  sortingOrder: SortingOrder;
}

export type PagingInput = {
  pageNumber: number;
  pageSize: number;
}

export type SelectElementOptions = {
  value: string;
  label: string;
}

export enum DayOffApprovalStatus {
  Pending = 'PENDING',
  Approved = 'APPROVED',
  Declined = 'DECLINED',
}

export const MaxWorkingHours = 8.0;
