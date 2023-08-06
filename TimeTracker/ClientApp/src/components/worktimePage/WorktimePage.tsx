import React, { useEffect } from 'react';
import { RootState } from '../../behavior/store';
import { useDispatch, useSelector } from 'react-redux';
import { ListPage } from './ListPage';
import {requestWorktimeList} from '../../behavior/worktime/actions';

export const WorktimePage = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.profile.userInfo);
  const worktime = useSelector((state: RootState)=> state.worktime.worktime);

    useEffect(() => {
        dispatch(requestWorktimeList('A21723A2-A5F3-4066-864D-3AEF053347BD'));
    }, [dispatch]);
    
  return (
    <>
      <h1 className="mb-4"></h1>
      <ListPage users={users} worktime={worktime}/>
    </>
  );
};
