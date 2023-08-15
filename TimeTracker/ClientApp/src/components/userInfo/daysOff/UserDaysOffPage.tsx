import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector} from 'react-redux';
import { RootState } from '../../../behavior/store';
import { changeDaysOffListPaging, requestDaysOffCount, requestDaysOffList } from '../../../behavior/daysOff/actions';
import { DayOffList } from '../../daysOff/DayOffList';
import { requestUser } from '../../../behavior/userDetails/actions';
import { Pagination } from '../../common/elements/Pagination';
import { Button } from 'react-bootstrap';
import { DayOffModal } from './DayOffModal';

export const UserDaysOffPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [showDayOffModal, setShowDayOffModal] = useState(false);
  const { list, requestsCount, sorting, paging, filter, daysOffCount } = useSelector((state: RootState) => state.daysOff);

  useEffect(() => {
    if (id !== undefined) {
      dispatch(requestUser(id));
      dispatch(requestDaysOffList(sorting, paging, { ...filter, userId: id }));
      dispatch(requestDaysOffCount(id));
    }
  }, [dispatch, id, filter, paging, sorting]);

  if (list === null || !id)
    return null;

  return (
    <>
      <Button className="btn btn-primary my-3" onClick={() => setShowDayOffModal(true)}>Add new</Button>
      <span className="ms-3"><strong>Days off count: {daysOffCount}</strong></span>
      <DayOffModal show={showDayOffModal} handleClose={() => setShowDayOffModal(false)} userId={id}/>
      <DayOffList requests={list} sorting={sorting} />
      {requestsCount > 0 && (
        <div className="d-flex justify-content-end">
          <Pagination paging={paging} pagingUpdateAction={changeDaysOffListPaging} itemCount={requestsCount} />
        </div>
      )}
    </>
  );
};
