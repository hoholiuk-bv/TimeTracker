import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { WorktimeListSection } from '../../worktimePage/WorktimeListSection';
import { useDispatch } from 'react-redux';
import { requestUser } from '../../../behavior/userDetails/actions';

export const UserWorktimePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id !== undefined)
      dispatch(requestUser(id));
  }, [dispatch, id]);

  if(id === undefined)
    return null;

  return (
    <WorktimeListSection userId={id}/>
  );
};
