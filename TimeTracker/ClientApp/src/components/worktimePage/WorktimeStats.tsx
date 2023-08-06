import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../behavior/store';

export const WorktimeStats = () => {
  const { worktimeStats } = useSelector((state: RootState) => state.worktime);

  if (worktimeStats === null)
    return null;
  
  const convertDecimalTime = (decimalTime: number): string => {
    const wholePart: number = Math.round(decimalTime);
    const fractionalPart: number = Math.round((decimalTime % 1) * 100);
    return `${wholePart} hour(s) ${fractionalPart} minute(s)`;
  };
  
  return (
    <div className="d-flex flex-column gap-1">
      <span><strong>Actual worked hours this month:</strong> {convertDecimalTime(worktimeStats.totalWorkTimeMonthly)}</span>
      <span><strong>Target monthly work hours:</strong> {convertDecimalTime(worktimeStats.plannedWorkTimeMonthly)}</span>
    </div>
  );
};
