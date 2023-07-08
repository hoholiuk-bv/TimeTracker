import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { requestAuthentication } from '../../behavior/profile';
import { routes } from '../../behavior/routing';
import { RootState } from '../../behavior/store';

export const Layout = () => {
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    if (authenticated == null)
      dispatch(requestAuthentication());
  }, [dispatch, authenticated]);

  if (authenticated == null)
    return null;

  if (authenticated === false)
    return (<Navigate to={routes.login} />);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-2">
            <div>
              <Link to={routes.worktime}>Worktime</Link>
            </div>
            <div>
              <Link to={routes.daysoff}>Days off</Link>
            </div>
            <div>
              <Link to={routes.approvals}>Approvals</Link>
            </div>
            <div>
              <Link to={routes.users}>Users</Link>
            </div>
            <div>
              <Link to={routes.calendarSettings}>Calendar settings</Link>
            </div>
          </div>
          <div className="col">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
