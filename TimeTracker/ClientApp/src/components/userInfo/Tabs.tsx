import React from 'react';
import { Link, matchPath, useLocation } from 'react-router-dom';
import { routes } from '../../behavior/routing';

type Props = {
  userId: string | null | undefined;
}

export const Tabs = ({ userId }: Props) => {
  const { pathname } = useLocation();
  if (!userId)
    return null;

  return (
    <>
      <ul className='nav nav-tabs'>
        <li className='nav-item'>
          <Link className={`nav-link ${matchPath(routes.users.details, pathname) && 'active'}`} to={routes.users.details.replace(':id', userId)}>
            {'Details'}
          </Link>
        </li>
        <li className='nav-item'>
          <Link className={`nav-link ${matchPath(routes.users.worktime, pathname) && 'active'}`} to={routes.users.worktime.replace(':id', userId)}>
            {'Worktime'}
          </Link>
        </li>
        <li className='nav-item'>
          <Link className={`nav-link ${matchPath(routes.users.daysoff, pathname) && 'active'}`} to={routes.users.daysoff.replace(':id', userId)}>
            {'Days off'}
          </Link>
        </li>
      </ul>
    </>
  );
};
