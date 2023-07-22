import React from 'react';
import { ApprovalType } from '../../behavior/approvals/types';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useDispatch } from 'react-redux';
import { changeApprovalStatus } from '../../behavior/approvals/actions';
import { DayOffApprovalStatus } from '../../behavior/common/types';

type Props = {
  item: ApprovalType
}


export const ApprovalItem = ({ item }: Props) => {

  const dispatch = useDispatch();
  const handleStatusChange = (status: DayOffApprovalStatus) => {
    dispatch(changeApprovalStatus(item.requestId, status));
  };

  return (
    <>
      <tr>
        <td>
          {item.employeeName} {item.employeeSurname}
        </td>
        <td>
          {item.startDate}
        </td>
        <td>
          {item.finishDate}
        </td>
        <td>
          {item.status}
        </td>
        <td className='action-buttons'>
          <ButtonGroup size='sm'>
            <Button size='sm' onClick={() => handleStatusChange(DayOffApprovalStatus.Approved)}>Approve</Button>
            <Button size='sm' onClick={() =>  handleStatusChange(DayOffApprovalStatus.Declined)}>Decline</Button>
          </ButtonGroup>
        </td>
      </tr>
    </>
  );
};