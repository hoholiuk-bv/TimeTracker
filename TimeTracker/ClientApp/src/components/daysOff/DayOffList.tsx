import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SortingInput } from '../../behavior/common/types';
import { changeDaysOffListPaging, changeDaysOffListSorting } from '../../behavior/daysOff/actions';
import { DayOffItem } from './DayOffItem';
import { SortIcon } from '../common/elements/SortIcon';
import { DayOffRequest } from '../../behavior/daysOff/types';
import { Alert } from 'react-bootstrap';
import { Pagination } from '../common/elements/Pagination';
import { RootState } from '../../behavior/store';
import { getNewSorting } from '../common/helpers';

type Props = {
  requests: DayOffRequest[];
  sorting: SortingInput;
}

export const DayOffList = ({ requests, sorting }: Props) => {
  const defaultSortingField = 'StartDate';
  const { requestsCount, paging } = useSelector((state: RootState) => state.daysOff);
  const dispatch = useDispatch();

  const handleSortingColumnClick = (fieldName: string) => {
    const newSorting = getNewSorting(sorting, fieldName, defaultSortingField);
    dispatch(changeDaysOffListSorting(newSorting));
  };

  if (!requests.length)
    return (
      <Alert variant='secondary'>No day off requests found.</Alert>
    );

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th className='sortableColumn' onClick={() => handleSortingColumnClick('StartDate')}>
              <span>Start date</span>
              <SortIcon sortingOrder={sorting.sortingField === 'StartDate' ? sorting.sortingOrder : null} />
            </th>
            <th className='sortableColumn' onClick={() => handleSortingColumnClick('FinishDate')}>
              <span>Finish date</span>
              <SortIcon sortingOrder={sorting.sortingField === 'FinishDate' ? sorting.sortingOrder : null} />
            </th>
            <th>Approvals</th>
            <th>Reason</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {requests.map(request =>
            <DayOffItem
              key={request.id}
              item={request}
            />)}
        </tbody>
      </table>
      {requestsCount > paging.pageSize && (
        <div className="d-flex justify-content-end mb-4">
          <Pagination paging={paging} pagingUpdateAction={changeDaysOffListPaging} itemCount={requestsCount} />
        </div>
      )}
    </>
  );
};
