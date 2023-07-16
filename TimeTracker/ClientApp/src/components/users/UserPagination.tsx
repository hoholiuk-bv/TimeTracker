import React from 'react';
import {PaginationType} from '../../behavior/users/types';
import ReactPaginate from 'react-paginate';

type Props = {
  totalUsersCount: number;
  pagination: PaginationType;
  setPagination: any;
}

export const UserPagination = ({totalUsersCount, pagination, setPagination}: Props) => {
  const pageCount = Math.ceil(totalUsersCount / pagination.pageSize);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPagination((prevPagination: any) => ({
      ...prevPagination,
      pageNumber: selected + 1
    }));
  };

  return (
    <div className="d-flex justify-content-between">
      <span><strong>Total records: {totalUsersCount}</strong></span>
      <div className="d-flex gap-2">
        <ReactPaginate
          previousLabel="<"
          nextLabel=">"
          breakLabel="..."
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={1}
          onPageChange={handlePageChange}
          containerClassName="pagination"
          activeClassName="active"
        />
      </div>
    </div>
  );
};
