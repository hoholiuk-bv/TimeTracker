import React from 'react';

export const UserSearchPanel = () => {
  return (
    <div>
      <h2 className="mb-4 h1">Users</h2>
      <div className="d-flex justify-content-between mb-4">
        <div className="col-4">
          <input type="text" className="form-control" placeholder="Search by name or email"/>
        </div>
        <div className="col-2 d-flex justify-content-end">
          <input type="button" className="form-control btn btn-primary w-auto px-4" value="Create new"/>
        </div>
      </div>
    </div>
  );
};
