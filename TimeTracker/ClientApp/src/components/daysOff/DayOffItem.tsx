import React from 'react';
import { DayOffType } from '../../behavior/daysOff/types';
import { DayOffRequestStatusTitle, getApprovalStatusClass } from '../common/helpers';
import { Tooltip } from '../common/elements/Tooltip';
import { DayOffApprovalStatus } from '../../behavior/common/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

type Props = {
  item: DayOffType
}

export const DayOffItem = ({ item }: Props) => {
  const { startDate, finishDate, approvals } = item;

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
              {approver.name} {approver.surname}: <span className={getApprovalStatusClass(status)}>{DayOffRequestStatusTitle[status]}</span>
              {status === DayOffApprovalStatus.Declined &&
                <Tooltip text={declineReason}>
                  <FontAwesomeIcon className={`${getApprovalStatusClass(status)} ms-2`} icon={faCircleInfo} />
                </Tooltip>}
            </div>
          )}
        </td>
      </tr>
    </>
  );
};
