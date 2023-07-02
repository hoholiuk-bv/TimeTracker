import React from 'react';

type Props = {
    totalUsersCount: number;
}

export const UserPagination = ({totalUsersCount}: Props) => {
  return (
    <div className="d-flex justify-content-between">
      <span><strong>Total records: {totalUsersCount}</strong></span>
      <div className="d-flex gap-2">
        {/*<span><strong>Page 1 of 10</strong></span>*/}
        {/*<button className="btn btn-primary w-auto py-0 px-1"><strong>&lt;</strong></button>*/}
        {/*<button className="btn btn-primary w-auto py-0 px-1"><strong>&gt;</strong></button>*/}
      </div>
    </div>
  );
};
