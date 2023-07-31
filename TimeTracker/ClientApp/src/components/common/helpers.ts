import { CalendarRulePeriod, CalendarRuleType } from '../../behavior/calendar/types';
import { DayOffApprovalStatus } from '../../behavior/common/types';

export const DayOffRequestStatusTitle = {
  [DayOffApprovalStatus.Approved]: 'Approved',
  [DayOffApprovalStatus.Declined]: 'Declined',
  [DayOffApprovalStatus.Pending]: 'Pending',
};

export function getApprovalStatusClass(status: DayOffApprovalStatus) {
  switch (status) {
    case DayOffApprovalStatus.Approved:
      return 'color-green';
    case DayOffApprovalStatus.Declined:
      return 'color-red';
    case DayOffApprovalStatus.Pending:
      return 'color-orange';
  }
}

export const CalendarRuleTypeTitle = {
  [CalendarRuleType.Holiday]: 'Holiday',
  [CalendarRuleType.NonWorkingDay]: 'Non-working day',
  [CalendarRuleType.ShortDay]: 'Short day',
};

export const CalendarRuleRecurringPeriodTitle = {
  [CalendarRulePeriod.Day]: 'Year',
  [CalendarRulePeriod.Week]: 'Week',
  [CalendarRulePeriod.Month]: 'Month',
  [CalendarRulePeriod.Year]: 'Year',
};
