import React, { useState } from 'react';
import { DayOffApproval } from '../../behavior/approvals/types';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useDispatch } from 'react-redux';
import { changeApprovalStatus } from '../../behavior/approvals/actions';
import { DayOffApprovalStatus } from '../../behavior/common/types';
import { DayOffRequestStatusTitle, getApprovalStatusClass } from '../common/helpers';
import { DeclineReasonModal } from './DeclineReasonModal';
import { Tooltip } from '../common/elements/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

type Props = {
  item: DayOffApproval
}

export const ApprovalItem = ({ item }: Props) => {
  const { employeeName, employeeSurname, startDate, finishDate, status, isEditable, declineReason } = item;
  const [showActionButtons, setShowActionButtons] = useState(status === DayOffApprovalStatus.Pending && isEditable);
  const dispatch = useDispatch();
  const handleStatusChange = (status: DayOffApprovalStatus, declineReason?: string) => {
    dispatch(changeApprovalStatus(item.requestId, status, declineReason));
    setShowActionButtons(false);
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <tr>
        <td>
          {employeeName} {employeeSurname}
        </td>
        <td>
          {new Date(startDate).toLocaleDateString()}
        </td>
        <td>
          {new Date(finishDate).toLocaleDateString()}
        </td>
        <td className={getApprovalStatusClass(status)}>
          {status === DayOffApprovalStatus.Pending && !isEditable ? 'Outdated' : DayOffRequestStatusTitle[status]}
          {status === DayOffApprovalStatus.Declined &&
            <Tooltip text={declineReason}><span className="ms-2"><FontAwesomeIcon icon={faCircleInfo} /></span>
            </Tooltip>}
        </td>
        <td className='action-buttons'>
          {showActionButtons &&
            <ButtonGroup size='sm'>
              <Button size='sm' onClick={() => handleStatusChange(DayOffApprovalStatus.Approved)}>Approve</Button>
              <Button size='sm' onClick={handleShow}>Decline</Button>
              <DeclineReasonModal show={show} handleClose={handleClose} handleStatusChange={handleStatusChange} />
            </ButtonGroup>}
          {!showActionButtons && isEditable &&
            <Button size='sm' onClick={() => setShowActionButtons(true)}>Change</Button>
          }
        </td>
      </tr>
    </>
  );
};
