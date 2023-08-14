import React, { useState } from 'react';
import { RootState } from '../../behavior/store';
import { useSelector } from 'react-redux';
import { ListPage } from './ListPage';
import { Button } from 'react-bootstrap';
import { WorkCalendarModal } from '../calendar/WorkCalendarModal';
import { WorktimeListSection } from './WorktimeListSection';

export const WorktimePage = () => {
  const user = useSelector((state: RootState) => state.profile.userInfo);
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  if (user === null)
    return null;

  return (
    <>
      <ListPage users={user} />
      <Button className='btn btn-primary my-3' onClick={() => setShowCalendarModal(true)}>
        View calendar
      </Button>
      <WorkCalendarModal show={showCalendarModal} handleClose={() => setShowCalendarModal(false)} />
      <WorktimeListSection userId={user.id}/>
    </>
  );
};
