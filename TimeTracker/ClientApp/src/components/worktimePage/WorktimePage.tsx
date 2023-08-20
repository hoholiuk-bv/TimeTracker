import React, { useEffect, useState } from 'react';
import { RootState } from '../../behavior/store';
import { useDispatch, useSelector } from 'react-redux';
import { PartTimerPage } from './PartTimerPage';
import { requestUnfinishedWorktimeRecord, requestWorktimeRecords } from '../../behavior/worktime/actions';
import { Button } from 'react-bootstrap';
import { WorkCalendarModal } from '../calendar/WorkCalendarModal';
import { WorktimeListSection } from './WorktimeListSection';
import '../../custom.css';

export const WorktimePage = () => {
  const dispatch = useDispatch();
  const worktime = useSelector((state: RootState)=> state.worktime.worktime);
  const user = useSelector((state: RootState) => state.profile.userInfo);
  const { sorting, filtering, paging } = useSelector((state: RootState) => state.worktime);
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  useEffect(() => {
    if(user !== null)
      dispatch(requestUnfinishedWorktimeRecord(user.id));
  }, [dispatch]);

  useEffect(() => {
    if (user !== null)
      dispatch(requestWorktimeRecords(sorting, { ...filtering, userId: user.id }, paging));
  }, [dispatch, user, sorting, filtering, paging]);

  if (user === null)
    return null;
  
  return (
    <>
      <h1 className="mb-3">Worktime</h1>
      <Button className='btn btn-primary my-3 me-3' onClick={() => setShowCalendarModal(true)}>
        View calendar
      </Button>
        <div className='worktime-button'>
        <PartTimerPage users={user} worktime={worktime} />
        </div>
        <WorkCalendarModal show={showCalendarModal} handleClose={() => setShowCalendarModal(false)} />
      <WorktimeListSection userId={user.id}/>
    </>
  );
};
