import React from 'react';
import { DayOffType } from '../../behavior/daysOff/types';
import { DayOffRequestStatusTitle, getApprovalStatusClass } from '../common/helpers';

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
          {approvals.map(({ approver, status }, index) =>
            <div key={index}>
              {approver.name} {approver.surname}: <span className={getApprovalStatusClass(status)}>{DayOffRequestStatusTitle[status]}</span>
            </div>
          )}
        </td>
      </tr>
    </>
  );
};
