import React from 'react';

export const NavBar = () => {
  return (
    <>
      <div className="col-2 p-4 pt-5 d-flex flex-column justify-content-start navbar">
        <ul className="nav d-flex flex-column w-100">
          <li className="nav-item">
            <a className="nav-link" href="#">Worktime</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Days off</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Approvals</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Users</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Calendar settings</a>
          </li>
        </ul>
      </div>
    </>
  );
};
