import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../behavior/store';
import { requestDaysOffList } from '../../behavior/daysOff/actions';
import { DayOffList } from '../daysOff/DayOffList';
import { requestUser } from '../../behavior/userDetails/actions';

export const UserDaysOffPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { list, sorting, filter } = useSelector((state: RootState) => state.daysOff);
  const { user } = useSelector((state: RootState) => state.userDetails);

  useEffect(() => {
    if(id !== undefined)
      dispatch(requestUser(id));
  }, [dispatch, id]);


  useEffect(() => {
    if(id)
      dispatch(requestDaysOffList(sorting, { pageNumber: 1, pageSize: 10 }, {...filter, userId: id}));
  }, [dispatch, sorting, filter]);

  if (list === null)
    return null;

  return (
    <>
      <h1>{user && (user.name + ' ' + user.surname)} (days off)</h1>
      <DayOffList requests={list} sorting={sorting} />
    </>
  );
};
