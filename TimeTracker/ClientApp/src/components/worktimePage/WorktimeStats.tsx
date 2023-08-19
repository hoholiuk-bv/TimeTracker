import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../behavior/store';

export const WorktimeStats = () => {
  const { worktimeStats } = useSelector((state: RootState) => state.worktime);

  if (worktimeStats === null)
    return null;
  
  const convertDecimalTime = (decimalTime: number): string => {
    const wholePart: number = Math.floor(decimalTime);
    const fractionalPart: number = Math.round((decimalTime % 1) * 100);
    const hours: string = wholePart > 0 ? `${wholePart} hour(s)` : '';
    const minutes: string = fractionalPart > 0 ? `${fractionalPart} minute(s)` : '';
    return wholePart > 0 || fractionalPart > 0 ? `${hours} ${minutes}` : 'no hours yet';
  };
  
  return (
    <div className="d-flex gap-3">
      <span>
        <strong>Hours worked: </strong>
        {convertDecimalTime(worktimeStats.totalWorkTimeMonthly)}
      </span>
      <span>
        <strong> Monthly target: </strong>
        {convertDecimalTime(worktimeStats.plannedWorkTimeMonthly)}
      </span>
    </div>
  );
};
