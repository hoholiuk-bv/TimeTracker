import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { DayOffList } from './DayOffList';
import { NewRequestModal } from './NewRequestModal';
import { useDispatch, useSelector } from 'react-redux';
import { changeDaysOffListFilter, changeDaysOffListPaging, requestDaysOffCount, requestDaysOffList } from '../../behavior/daysOff/actions';
import { RootState } from '../../behavior/store';

export const DaysOffPage = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const { list, sorting, paging, filter, daysOffCount } = useSelector((state: RootState) => state.daysOff);
  const currentUserId = useSelector((state: RootState) => state.profile.userInfo?.id);

  useEffect(() => {
    if (!currentUserId || filter.userId === currentUserId)
      return;

    dispatch(changeDaysOffListFilter({ ...filter, userId: currentUserId }));
  }, [dispatch, filter, currentUserId]);

  useEffect(() => {
    if (currentUserId){
      dispatch(requestDaysOffList(sorting, paging, { ...filter, userId: currentUserId }));
      dispatch(requestDaysOffCount(currentUserId));
    }
  }, [dispatch, sorting, paging, filter, currentUserId]);

  if (list === null)
    return null;

  return (
    <>
      <h1>Days off</h1>
      <Button className="my-3" onClick={() => setShow(true)}>Request a day off</Button>
      <NewRequestModal show={show} handleClose={() => setShow(false)} />
      <span className="ms-3"><strong>Days off count: {daysOffCount}</strong></span>
      <DayOffList requests={list} sorting={sorting} />
    </>
  );
};
