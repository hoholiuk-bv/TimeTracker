﻿import React, { useEffect, useState } from 'react';
import { RootState } from '../../behavior/store';
import { useDispatch, useSelector } from 'react-redux';
import { ListPage } from './ListPage';
import { WorktimeTable } from './WorktimeTable';
import { requestWorktimeRecords } from '../../behavior/worktime/actions';
import { WorktimeFilter } from './WorktimeFilter';
import { changeWorktimeRecordsPaging } from '../../behavior/worktime/actions';
import { Pagination } from '../common/elements/Pagination';
import { WorktimeStats } from './WorktimeStats';
import { Button } from 'react-bootstrap';
import { WorkCalendarModal } from '../calendar/WorkCalendarModal';

export const WorktimePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.profile.userInfo);
  const { sorting, filtering, paging, recordsCount } = useSelector((state: RootState) => state.worktime);
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  useEffect(() => {
    if (user !== null)
      dispatch(requestWorktimeRecords(sorting, { ...filtering, userId: user.id }, paging));
  }, [dispatch, user, sorting, filtering, paging]);

  return (
    <>
      <ListPage users={user} />
      <Button className='btn btn-primary my-3' onClick={() => setShowCalendarModal(true)}>
        View calendar
      </Button>
      <WorkCalendarModal show={showCalendarModal} handleClose={() => setShowCalendarModal(false)} />
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
