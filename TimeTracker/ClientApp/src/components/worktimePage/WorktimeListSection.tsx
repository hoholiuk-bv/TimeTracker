import React, { useEffect } from 'react';
import { RootState } from '../../behavior/store';
import { useDispatch, useSelector } from 'react-redux';
import { WorktimeTable } from './WorktimeTable';
import { requestWorktimeRecords } from '../../behavior/worktime/actions';
import { WorktimeFilter } from './WorktimeFilter';
import { changeWorktimeRecordsPaging } from '../../behavior/worktime/actions';
import { Pagination } from '../common/elements/Pagination';
import { WorktimeStats } from './WorktimeStats';

type Props = {
  userId: string;
}

export const WorktimeListSection = ({ userId } : Props) => {
  const dispatch = useDispatch();
  const { sorting, filtering, paging, recordsCount } = useSelector((state: RootState) => state.worktime);

  useEffect(() => {
    dispatch(requestWorktimeRecords(sorting, { ...filtering, userId: userId }, paging));
  }, [dispatch, sorting, filtering, paging]);

  return (
    <>
      <WorktimeFilter />
      <WorktimeTable />
      {recordsCount > 0 && (
        <div className="d-flex justify-content-between mb-4">
          <WorktimeStats />
          <Pagination paging={paging} pagingUpdateAction={changeWorktimeRecordsPaging} itemCount={recordsCount} />
        </div>
      )}
    </>
  );
};
