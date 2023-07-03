import React from 'react';
import {NavBar} from './components/NavBar';
import {UserListPage} from './components/users/UserListPage';

const App = () => {
  return (
    <>
      <div className="row content-box">
        <NavBar/>
        <div className="col-10 p-0">
          <div className="header p-3 d-flex justify-content-end">PLACE FOR USERNAME & LOGOUT</div>
          <UserListPage/>
        </div>
      </div>
    </>
  );
};

export default App;