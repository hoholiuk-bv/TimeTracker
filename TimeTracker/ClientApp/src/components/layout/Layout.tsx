import React from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { routes } from '../../behavior/routing';

export const Layout = () => {
  const token = localStorage.getItem('auth-token');

  return (
    <>
      {token ?
        <>
          <Navigate to={routes.users} />
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
        : <Navigate to={routes.login} />}
    </>
  );
};