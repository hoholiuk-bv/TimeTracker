import React, { useEffect } from 'react';
import { RootState } from '../../behavior/store';
import { useDispatch, useSelector } from 'react-redux';
import { WorktimeTable } from './WorktimeTable';
import {
  changeWorktimeRecordsFiltering,
  changeWorktimeRecordsPaging,
  requestUnfinishedWorktimeRecord,
  requestWorktimeRecordCount,
  requestWorktimeRecords,
  requestWorktimeStats
} from '../../behavior/worktime/actions';
import { WorktimeFilter } from './WorktimeFilter';
import { Pagination } from '../common/elements/Pagination';
import { WorktimeStats } from './WorktimeStats';

type Props = {
  userId: string;
}

export const WorktimeListSection = ({ userId } : Props) => {
  const dispatch = useDispatch();
  const { sorting, filtering, paging, recordCount } = useSelector((state: RootState) => state.worktime);

  useEffect(() => {
    if (userId !== '')
      dispatch(changeWorktimeRecordsFiltering({ ...filtering, userId: userId }));
  }, [dispatch, userId]);

  useEffect(() => {
    if (filtering.userId !== '')
      dispatch(requestWorktimeRecords(sorting, filtering, paging));
  }, [dispatch, sorting, filtering, paging]);

  useEffect(() => {
    if (filtering.userId !== '') {
      dispatch(requestWorktimeRecordCount(filtering));
      dispatch(requestWorktimeStats(filtering));
    }
  }, [dispatch, filtering]);

  return (
    <>
      <WorktimeFilter userId={userId} />
      <WorktimeTable />
      {recordCount > 0 && (
        <div className="d-flex justify-content-between mb-4">
          <WorktimeStats />
          {recordCount > paging.pageSize && (
            <Pagination paging={paging} pagingUpdateAction={changeWorktimeRecordsPaging} itemCount={recordCount} />
          )}
        </div>
      )}
    </>
  );
};
