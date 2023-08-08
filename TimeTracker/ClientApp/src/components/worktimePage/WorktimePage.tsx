import React, { useEffect } from 'react';
import { RootState } from '../../behavior/store';
import { useDispatch, useSelector } from 'react-redux';
import { ListPage } from './ListPage';
import { requestUnfinishedWorktimeRecord, requestWorktimeRecords} from '../../behavior/worktime/actions';
import { WorktimeTable } from './WorktimeTable';
import { WorktimeFilter } from './WorktimeFilter';
import { changeWorktimeRecordsPaging } from '../../behavior/worktime/actions';
import { Pagination } from '../common/elements/Pagination';
import { WorktimeStats } from './WorktimeStats';

export const WorktimePage = () => {
  const dispatch = useDispatch();
  const worktime = useSelector((state: RootState)=> state.worktime.worktime);
  const user = useSelector((state: RootState) => state.profile.userInfo);
  const { sorting, filtering, paging, recordCount } = useSelector((state: RootState) => state.worktime);

  useEffect(() => {
    if(user !== null)
      dispatch(requestUnfinishedWorktimeRecord(user.id));
  }, [dispatch]);
    
  useEffect(() => {
    if(user !== null)
      dispatch(requestWorktimeRecords(sorting, {...filtering, userId: user.id}, paging));
  }, [dispatch, user, sorting, filtering, paging]);

  return (
    <>
      <h1 className="mb-4"></h1>
      <ListPage users={user} worktime={worktime}/>
      <WorktimeFilter/>
      <WorktimeTable/>
      {(recordCount > 0) && (
        <div className="d-flex justify-content-between mb-4">
          <WorktimeStats/>
          <Pagination paging={paging} pagingUpdateAction={changeWorktimeRecordsPaging} itemCount={recordCount} />
        </div>
      )}
    </>
  );
};
