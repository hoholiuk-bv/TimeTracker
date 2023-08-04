import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../behavior/store';
import { WorktimeRow } from './WorktimeRow';
import { Alert } from 'react-bootstrap';

export const WorktimeTable = () => {
  const { records } = useSelector((state: RootState) => state.worktime);

  if(records === null)
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );

  if(records.length === 0)
    return (<Alert variant='secondary'>Worktime records not found.</Alert>);

  return (
    <>
      <table className="table table-striped mb-4">
        <thead>
          <tr>
            <th className='sortableColumn'>
              <span>Start</span>
            </th>
            <th className='sortableColumn'>
              <span>Finish</span>
            </th>
            <th className='sortableColumn'>
              <span>Work time</span>
            </th>
            <th className='sortableColumn' colSpan={2}>
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
