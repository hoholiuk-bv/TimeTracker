import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../behavior/store';
import { WorktimeRow } from './WorktimeRow';
import { Alert } from 'react-bootstrap';
import { SortIcon } from '../common/elements/SortIcon';
import { changeWorktimeRecordsSorting } from '../../behavior/worktime/actions';
import { getNewSorting } from '../common/helpers';

export const WorktimeTable = () => {
  const dispatch = useDispatch();
  const defaultSortingField = 'FinishDate';
  const { records, sorting } = useSelector((state: RootState) => state.worktime);

  if(records === null)
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );

  if(records.length === 0 || (records.length === 1 && records[0].finishDate === null))
    return (<Alert variant='secondary'>Worktime records not found.</Alert>);

  const handleSortingColumnClick = (fieldName: string) => {
    const newSorting = getNewSorting(sorting, fieldName, defaultSortingField);
    dispatch(changeWorktimeRecordsSorting(newSorting));
  };

  return (
    <>
      <table className="table table-striped mb-4">
        <thead>
          <tr>
            <th onClick={() => handleSortingColumnClick('StartDate')} className='sortableColumn'>
              <span>Start</span>
              <SortIcon sortingOrder={sorting.sortingField === 'StartDate' ? sorting.sortingOrder : null} />
            </th>
            <th onClick={() => handleSortingColumnClick('FinishDate')} className='sortableColumn'>
              <span>Finish</span>
              <SortIcon sortingOrder={sorting.sortingField === 'FinishDate' ? sorting.sortingOrder : null} />
            </th>
            <th>
              <span>Work time</span>
            </th>
            <th colSpan={2}>
              <span>Last edited by</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <WorktimeRow key={record.id} worktimeRecord={record} />
          ))}
        </tbody>
      </table>
    </>
  );
};
