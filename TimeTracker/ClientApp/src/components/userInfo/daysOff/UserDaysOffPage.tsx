import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../behavior/store';
import { changeDaysOffListFilter, changeDaysOffListPaging, requestDaysOffCount, requestDaysOffList } from '../../../behavior/daysOff/actions';
import { DayOffList } from '../../daysOff/DayOffList';
import { Pagination } from '../../common/elements/Pagination';
import { Button } from 'react-bootstrap';
import { DayOffModal } from './DayOffModal';

export const UserDaysOffPage = () => {
  const dispatch = useDispatch();
  const [showDayOffModal, setShowDayOffModal] = useState(false);
  const { list, requestsCount, sorting, paging, filter, daysOffCount } = useSelector((state: RootState) => state.daysOff);
  const { user } = useSelector((state: RootState) => state.userDetails);

  useEffect(() => {
    if (filter.userId !== user!.id) {
      dispatch(changeDaysOffListFilter({ ...filter, userId: user!.id }));
      return;
    }

    dispatch(requestDaysOffList(sorting, paging, filter));
    dispatch(requestDaysOffCount(user!.id));
  }, [dispatch, paging, sorting, filter, user]);

  if (list === null || !user)
    return null;

  return (
    <>
      <Button className="btn btn-primary my-3" onClick={() => setShowDayOffModal(true)}>Add new</Button>
      <span className="ms-3"><strong>Days off count: {daysOffCount}</strong></span>
      <DayOffModal show={showDayOffModal} handleClose={() => setShowDayOffModal(false)} userId={user!.id} />
      <DayOffList requests={list} sorting={sorting} />
      {requestsCount > 0 && (
        <div className="d-flex justify-content-end">
          <Pagination paging={paging} pagingUpdateAction={changeDaysOffListPaging} itemCount={requestsCount} />
        </div>
      )}
    </>
  );
};
