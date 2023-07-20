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

export const MaxWorkingHours = 8.0;
