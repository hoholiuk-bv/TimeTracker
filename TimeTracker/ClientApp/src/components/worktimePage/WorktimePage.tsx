﻿import React, { useEffect, useState } from 'react';
import { RootState } from '../../behavior/store';
import { useDispatch, useSelector } from 'react-redux';
import { ListPage } from './ListPage';
import { requestUnfinishedWorktimeRecord, changeWorktimeRecordsFiltering } from '../../behavior/worktime/actions';
import { Button } from 'react-bootstrap';
import { WorkCalendarModal } from '../calendar/WorkCalendarModal';
import { WorktimeListSection } from './WorktimeListSection';

export const WorktimePage = () => {
  const dispatch = useDispatch();
  const worktime = useSelector((state: RootState)=> state.worktime.worktime);
  const user = useSelector((state: RootState) => state.profile.userInfo);
  const { filtering } = useSelector((state: RootState) => state.worktime);
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  useEffect(() => {
    if (user !== null) {
      dispatch(requestUnfinishedWorktimeRecord(user.id));
      dispatch(changeWorktimeRecordsFiltering({ ...filtering, userId: user.id }));
    }
  }, [dispatch, user]);

  if (user === null)
    return null;
  
  return (
    <>
      <h1 className="mb-3">Worktime</h1>
      <ListPage users={user} worktime={worktime} />
      <Button className='btn btn-primary my-3' onClick={() => setShowCalendarModal(true)}>
        View calendar
      </Button>
      <WorkCalendarModal show={showCalendarModal} handleClose={() => setShowCalendarModal(false)} />
      <WorktimeListSection userId={user.id}/>
    </>
  );
};
