import React from 'react';
import { DayOffType } from '../../behavior/daysOff/types';

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
      </tr>
    </>
  );
};