import React, { useState } from 'react';
import { DayOffRequest } from '../../behavior/daysOff/types';
import { DayOffRequestStatusTitle, getApprovalStatusClass } from '../common/helpers';
import { Tooltip } from '../common/elements/Tooltip';
import { DayOffApprovalStatus } from '../../behavior/common/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import { DeleteRequestModal } from './DeleteRequestModal';

type Props = {
  item: DayOffRequest
}

export const DayOffItem = ({ item }: Props) => {
  const { startDate, finishDate, approvals, isEditable, id } = item;
  const [show, setShow] = useState(false);

  return (
    <>
      <tr>
        <td>
          {startDate}
        </td>
        <td>
          {finishDate}
        </td>
        <td>
          {approvals.map(({ approver, status, declineReason }, index) =>
            <div key={index}>
              {approver.name} {approver.surname}: <span className={getApprovalStatusClass(status)}>
                {status === DayOffApprovalStatus.Pending && !isEditable ? 'Outdated' : DayOffRequestStatusTitle[status]}
              </span>
              {status === DayOffApprovalStatus.Declined &&
                <Tooltip text={declineReason}>
                  <FontAwesomeIcon className={`${getApprovalStatusClass(status)} ms-2`} icon={faCircleInfo} />
                </Tooltip>}
            </div>
          )}
        </td>
        <td>
          <Button variant='Link' className='table-action-button' onClick={() => setShow(true)}>
            <FontAwesomeIcon icon={faTrashCan} />
          </Button>
          <DeleteRequestModal show={show} handleClose={() => setShow(false)} requestId={id}/>
        </td>
      </tr>
    </>
  );
};
