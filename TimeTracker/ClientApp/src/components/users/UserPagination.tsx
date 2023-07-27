import React from 'react';
import Pagination  from 'rc-pagination';
import { useDispatch } from 'react-redux';
import { PagingInput } from '../../behavior/common/types';
import { changeUserListPaging } from '../../behavior/users/actions';

type Props = {
  totalUsersCount: number;
  paging: PagingInput;
}

export const UserPagination = ({totalUsersCount, paging}: Props) => {
  const dispatch = useDispatch();

  const handlePaginationChange = (page: number) => {
    const newPaging = { ...paging, pageNumber: page };
    dispatch(changeUserListPaging(newPaging));
  };

  return (
    <div className="d-flex justify-content-between">
      <span><strong>Total records: {totalUsersCount}</strong></span>
      <div className="d-flex gap-2">
        <Pagination
          className="pagination"
          showTitle={false}
          prevIcon={<a>&#x276E;</a>}
          nextIcon={<a>&#x276F;</a>}
          jumpPrevIcon={'...'}
          jumpNextIcon={'...'}
          onChange={handlePaginationChange}
          total={totalUsersCount}
          current={paging.pageNumber}
          pageSize={paging.pageSize}
        />
      </div>
    </div>
  );
};
