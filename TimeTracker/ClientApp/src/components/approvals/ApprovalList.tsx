import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SortingOrder } from '../../behavior/common/types';
import { RootState } from '../../behavior/store';
import { ApprovalItem } from './ApprovalItem';
import { SortIcon } from '../common/elements/SortIcon';
import { requestApprovalsList, changeApprovalsListSorting } from '../../behavior/approvals/actions';

export const ApprovalList = () => {
  const defaultSortingField = 'StartDate';

  const dispatch = useDispatch();
  const { list: approvals, sorting } = useSelector((state: RootState) => state.approvals);
  useEffect(() => { dispatch(requestApprovalsList(sorting, { pageNumber: 1, pageSize: 10 })); }, [dispatch, sorting]);
  const handleSortingColumnClick = (fieldName: string) => {
    let newSortingField = fieldName;
    let newSortingOrder = sorting.sortingOrder;
    if (fieldName !== sorting.sortingField) {
      newSortingField = fieldName;
      newSortingOrder = SortingOrder.Ascending;
    }
    else {
      switch (sorting.sortingOrder) {
        case SortingOrder.Ascending:
          newSortingOrder = SortingOrder.Descending;
          break;
        case SortingOrder.Descending:
          newSortingOrder = SortingOrder.Ascending;
          newSortingField = defaultSortingField;
      }
    }
    dispatch(changeApprovalsListSorting({ sortingOrder: newSortingOrder, sortingField: newSortingField }));
  };

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th className='sortableColumn' onClick={() => handleSortingColumnClick('EmployeeName')}>
              <span>Employee name</span>
              <SortIcon sortingOrder={sorting.sortingField === 'EmployeeName' ? sorting.sortingOrder : null} />
            </th>
            <th className='sortableColumn' onClick={() => handleSortingColumnClick('StartDate')}>
              <span>Start date</span>
              <SortIcon sortingOrder={sorting.sortingField === 'StartDate' ? sorting.sortingOrder : null} />
            </th>
            <th className='sortableColumn' onClick={() => handleSortingColumnClick('FinishDate')}>
              <span>Finish date</span>
              <SortIcon sortingOrder={sorting.sortingField === 'FinishDate' ? sorting.sortingOrder : null} />
            </th>
            <th className='sortableColumn' onClick={() => handleSortingColumnClick('Status')}>
              <span>Status</span>
              <SortIcon sortingOrder={sorting.sortingField === 'Status' ? sorting.sortingOrder : null} />
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {approvals.map(approval =>
            <ApprovalItem
              key={approval.requestId}
              item={approval}
            />)}
        </tbody>
      </table>
    </>
  );
};