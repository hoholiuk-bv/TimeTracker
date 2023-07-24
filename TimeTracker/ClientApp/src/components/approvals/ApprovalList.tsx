import React from 'react';
import Alert from 'react-bootstrap/Alert';
import { useDispatch } from 'react-redux';
import { SortingInput, SortingOrder } from '../../behavior/common/types';
import { ApprovalItem } from './ApprovalItem';
import { SortIcon } from '../common/elements/SortIcon';
import { changeApprovalsListSorting } from '../../behavior/approvals/actions';
import { DayOffApproval } from '../../behavior/approvals/types';

type Props = {
  approvals: DayOffApproval[]
  sorting: SortingInput,
}

export const ApprovalList = ({ approvals, sorting }: Props) => {
  const defaultSortingField = 'EmployeeName';

  const dispatch = useDispatch();
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

  if (!approvals.length)
    return (
      <Alert variant='secondary'>No approvals found.</Alert>
    );

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
