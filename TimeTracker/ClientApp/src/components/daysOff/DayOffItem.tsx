import React from 'react';
import { DayOffType } from '../../behavior/daysOff/types';
import { DayOffRequestTypeNames } from '../../behavior/daysOff/helpers';

type Props = {
  item: DayOffType
}

export const DayOffItem = ({ item }: Props) => {
  return (
    <>
      <tr>
        <td>
          {item.startDate}
        </td>
        <td>
          {item.finishDate}
        </td>
        <td>
          {DayOffRequestTypeNames[item.reason]}
        </td>
      </tr>
    </>
  );
};