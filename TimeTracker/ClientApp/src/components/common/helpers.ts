import { CalendarRulePeriod, CalendarRuleType } from '../../behavior/calendar/types';
import { DayOffApprovalStatus, SortingInput, SortingOrder } from '../../behavior/common/types';
import { DayOffRequestReason } from '../../behavior/daysOff/types';

export const DayOffRequestStatusTitle = {
  [DayOffApprovalStatus.Approved]: 'Approved',
  [DayOffApprovalStatus.Declined]: 'Declined',
  [DayOffApprovalStatus.Pending]: 'Pending',
};

export const DayOffRequestReasonTitle = {
  [DayOffRequestReason.Vacation]: 'Vacation',
  [DayOffRequestReason.Absence]: 'Absence',
  [DayOffRequestReason.SickLeave]: 'Sick leave',
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

export const getNewSorting = (sorting: SortingInput, fieldName: string, defaultSortingField: string): SortingInput => {
  let newSortingField = fieldName;
  let newSortingOrder = sorting.sortingOrder;

  if (fieldName !== sorting.sortingField) {
    newSortingField = fieldName;
    newSortingOrder = SortingOrder.Ascending;
  }
  else {
    switch (sorting.sortingOrder) {
      case SortingOrder.Ascending:
        newSortingOrder = SortingOrder.Descending;
        break;
      case SortingOrder.Descending:
        newSortingOrder = SortingOrder.Ascending;
        newSortingField = defaultSortingField;
    }
  }

  return { sortingOrder: newSortingOrder, sortingField: newSortingField };
};
