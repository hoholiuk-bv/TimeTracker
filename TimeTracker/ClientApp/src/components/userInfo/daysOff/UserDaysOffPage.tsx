import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../behavior/store';
import { changeDaysOffListPaging, requestDaysOffList } from '../../../behavior/daysOff/actions';
import { DayOffList } from '../../daysOff/DayOffList';
import { requestUser } from '../../../behavior/userDetails/actions';
import { Pagination } from '../../common/elements/Pagination';

export const UserDaysOffPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { list, requestsCount, sorting, paging, filter } = useSelector((state: RootState) => state.daysOff);

  useEffect(() => {
    if (id !== undefined) {
      dispatch(requestUser(id));
      dispatch(requestDaysOffList(sorting, paging, { ...filter, userId: id }));
    }
  }, [dispatch, id, filter, paging, sorting]);

  if (list === null)
    return null;

  return (
    <>
      <DayOffList requests={list} sorting={sorting} />
      {requestsCount > 0 && (
        <div className="d-flex justify-content-end">
          <Pagination paging={paging} pagingUpdateAction={changeDaysOffListPaging} itemCount={requestsCount} />
        </div>
      )}
    </>
  );
};
