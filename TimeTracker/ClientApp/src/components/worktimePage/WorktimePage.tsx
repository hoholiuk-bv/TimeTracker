import React, { useEffect } from 'react';
import { RootState } from '../../behavior/store';
import { useDispatch, useSelector } from 'react-redux';
import { ListPage } from './ListPage';
import { WorktimeTable } from './WorktimeTable';
import { requestWorktimeRecordsByUserId } from '../../behavior/worktime/actions';

export const WorktimePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.profile.userInfo);

  useEffect(() => {
    if(user !== null)
      dispatch(requestWorktimeRecordsByUserId(user.id));
  }, [dispatch, user]);
  
  return (
    <>
      <h1 className="mb-4"></h1>
      <ListPage users={user} />
      <WorktimeTable/>
    </>
  );
};
