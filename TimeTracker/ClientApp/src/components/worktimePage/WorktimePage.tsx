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
  const { filtering } = useSelector((state: RootState) => state.worktime);

  useEffect(() => {
    if(user !== null)
      dispatch(requestWorktimeRecordsByUserId(user.id, filtering));
  }, [dispatch, user, filtering]);
  
  return (
    <>
      <h1 className="mb-4"></h1>
      <ListPage users={user} />
      <WorktimeFilter/>
      <WorktimeTable/>
    </>
  );
};
