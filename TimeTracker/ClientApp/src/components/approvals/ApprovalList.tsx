import React from 'react';
import Alert from 'react-bootstrap/Alert';
import { useDispatch } from 'react-redux';
import { SortingInput } from '../../behavior/common/types';
import { ApprovalItem } from './ApprovalItem';
import { SortIcon } from '../common/elements/SortIcon';
import { changeApprovalsListSorting } from '../../behavior/approvals/actions';
import { DayOffApproval } from '../../behavior/approvals/types';
import { getNewSorting } from '../common/helpers';

type Props = {
  approvals: DayOffApproval[]
  sorting: SortingInput,
}

export const ApprovalList = ({ approvals, sorting }: Props) => {
  const defaultSortingField = 'StartDate';

  const dispatch = useDispatch();
  const handleSortingColumnClick = (fieldName: string) => {
    const newSorting = getNewSorting(sorting, fieldName, defaultSortingField);
    dispatch(changeApprovalsListSorting(newSorting));
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
