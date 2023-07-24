import React, { useState } from 'react';
import { DayOffApproval } from '../../behavior/approvals/types';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useDispatch } from 'react-redux';
import { changeApprovalStatus } from '../../behavior/approvals/actions';
import { DayOffApprovalStatus } from '../../behavior/common/types';

type Props = {
  item: DayOffApproval
}


export const ApprovalItem = ({ item }: Props) => {
  const { employeeName, employeeSurname, startDate, finishDate, status, isEditable } = item;
  const [showActionButtons, setShowActionButtons] = useState(status === DayOffApprovalStatus.Pending && isEditable);
  const dispatch = useDispatch();
  const handleStatusChange = (status: DayOffApprovalStatus) => {
    dispatch(changeApprovalStatus(item.requestId, status));
    setShowActionButtons(false);
  };

  return (
    <>
      <tr>
        <td>
          {employeeName} {employeeSurname}
        </td>
        <td>
          {startDate}
        </td>
        <td>
          {finishDate}
        </td>
        <td>
          {status}
        </td>
        <td className='action-buttons'>
          {showActionButtons &&
            <ButtonGroup size='sm'>
              <Button size='sm' onClick={() => handleStatusChange(DayOffApprovalStatus.Approved)}>Approve</Button>
              <Button size='sm' onClick={() => handleStatusChange(DayOffApprovalStatus.Declined)}>Decline</Button>
            </ButtonGroup>}
          {!showActionButtons && isEditable &&
            <Button size='sm' onClick={() => setShowActionButtons(true)}>Change</Button>
          }
        </td>
      </tr>
    </>
  );
};
