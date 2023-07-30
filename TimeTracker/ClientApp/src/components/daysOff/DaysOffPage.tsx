import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { DayOffList } from './DayOffList';
import { NewRequestModal } from './NewRequestModal';
import { useDispatch, useSelector } from 'react-redux';
import { requestDaysOffList } from '../../behavior/daysOff/actions';
import { RootState } from '../../behavior/store';

export const DaysOffPage = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const { list, sorting, filter } = useSelector((state: RootState) => state.daysOff);
  const currentUserId = useSelector((state: RootState) => state.profile.userInfo?.id);

  useEffect(() => {
    if(currentUserId)
      dispatch(requestDaysOffList(sorting, { pageNumber: 1, pageSize: 10 }, {...filter, userId: currentUserId}));
  }, [dispatch, sorting, filter]);

  if (list === null)
    return null;

  return (
    <>
      <h1>Days off</h1>
      <Button className="my-3" onClick={() => setShow(true)}>Request a day off</Button>
      <NewRequestModal show={show} handleClose={() => setShow(false)} />
      <DayOffList requests={list} sorting={sorting} />
    </>
  );
};
