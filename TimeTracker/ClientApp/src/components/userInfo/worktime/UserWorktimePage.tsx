import React from 'react';
import { useParams } from 'react-router';
import { WorktimeListSection } from '../../worktimePage/WorktimeListSection';

export const UserWorktimePage = () => {
  const { id } = useParams();

  if(id === undefined)
    return null;

  return (
    <>
      <WorktimeListSection userId={id}/>
    </>
  );
};
