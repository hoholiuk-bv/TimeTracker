import React from 'react';
import RcPagination  from 'rc-pagination';
import { useDispatch } from 'react-redux';
import { PagingInput } from '../../../behavior/common/types';

type Props = {
  itemCount: number;
  paging: PagingInput;
  pagingUpdateAction: (paging: PagingInput) => any;
}

export const Pagination = ({itemCount, paging, pagingUpdateAction}: Props) => {
  const dispatch = useDispatch();

  const handlePaginationChange = (page: number) => {
    const newPaging = { ...paging, pageNumber: page };
    dispatch(pagingUpdateAction(newPaging));
  };

  return (
    <div className="d-flex gap-2">
      <RcPagination
        className="pagination"
        showTitle={false}
        prevIcon={<a>&#x276E;</a>}
        nextIcon={<a>&#x276F;</a>}
        jumpPrevIcon={'...'}
        jumpNextIcon={'...'}
        onChange={handlePaginationChange}
        total={itemCount}
        current={paging.pageNumber}
        pageSize={paging.pageSize}
      />
    </div>
  );
};
