import React, { useEffect } from 'react';
import { RootState } from '../../behavior/store';
import { useDispatch, useSelector } from 'react-redux';
import { ListPage } from './ListPage';
import { WorktimeTable } from './WorktimeTable';
import { requestWorktimeRecordsByUserId } from '../../behavior/worktime/actions';
import { WorktimeFilter } from './WorktimeFilter';

export const WorktimePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.profile.userInfo);
  const { sorting, filtering } = useSelector((state: RootState) => state.worktime);

  useEffect(() => {
    if(user !== null)
      dispatch(requestWorktimeRecordsByUserId(user.id, sorting, filtering));
  }, [dispatch, user, sorting, filtering]);
  
  return (
    <>
      <h1 className="mb-4"></h1>
      <ListPage users={user} />
      <WorktimeFilter/>
      <WorktimeTable/>
    </>
  );
};
