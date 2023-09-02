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
    const firstMinute: string = fractionalPart === 1 ? `${fractionalPart} minute` : '';
    const firstHour: string = wholePart === 1 ? `${wholePart} hour` : '';
    const hours: string = wholePart > 0 ? (wholePart === 1 ? firstHour : `${wholePart} hours`) : '';
    const minutes: string = fractionalPart > 1 ? `${fractionalPart} minutes` : firstMinute;
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
