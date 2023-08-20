import React, { useCallback, useEffect } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Calendar, type CalendarProps } from 'react-calendar';
import { useDispatch, useSelector } from 'react-redux';
import { applyCalendarRules, requestCalendarRules } from '../../behavior/calendar/actions';
import { CalendarRuleType } from '../../behavior/calendar/types';
import { RootState } from '../../behavior/store';

type Props = {
  className?: string,
} & CalendarProps;

export const WorkCalendar = ({ className, ...props }: Props) => {
  const dispatch = useDispatch();
  const { rules, appliedRules } = useSelector((state: RootState) => state.calendar);

  useEffect(() => {
    dispatch(requestCalendarRules());
  }, []);

  useEffect(() => {
    const currentDate = new Date();
    if (rules?.length)
      dispatch(applyCalendarRules(currentDate.getFullYear(), currentDate.getMonth() + 1));
  }, [rules, dispatch]);

  const handleActiveStartDateChange = useCallback((activeStartDate: Date | null) => {
    if (rules?.length && activeStartDate != null)
      dispatch(applyCalendarRules(activeStartDate.getFullYear(), activeStartDate.getMonth() + 1));
  }, [rules, dispatch]);

  const getTileClassName = ({ date, view }: { date: Date, view: string }) => {
    if (!appliedRules)
      return '';

    const appliedRule = appliedRules[date.getDate()];
    if (view === 'month' && appliedRule) {
      switch (appliedRule.type) {
        case CalendarRuleType.NonWorkingDay:
          return 'calendar-non-working-day';
        case CalendarRuleType.ShortDay:
          return 'calendar-short-day';
        case CalendarRuleType.Holiday:
          return 'calendar-holiday';
      }
    }

    return '';
  };

  const getTileContent = ({ date, view }: { date: Date, view: string }) => {
    if (!appliedRules)
      return null;

    const appliedRule = appliedRules[date.getDate()];
    if (view === 'month' && appliedRule?.title) {
      return (
        <OverlayTrigger overlay={<Tooltip >{  appliedRule.title}</Tooltip>}>
          <span className='calendar-tile-tooltip'></span>
        </OverlayTrigger>
      );
    }
  };

  if (!rules || !rules.length)
    return null;

  return (
    <>
      <Calendar
        {...props}
        className={className}
        onActiveStartDateChange={({ activeStartDate }: { activeStartDate: Date | null }) => handleActiveStartDateChange(activeStartDate)}        //onActiveStartDateChange={({ activeStartDate }) => handleActiveStartDateChange(activeStartDate)}
        tileClassName={getTileClassName}
        tileContent={getTileContent}
      />
    </>);
};
