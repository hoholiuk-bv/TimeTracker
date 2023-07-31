export enum CalendarRuleType {
  NonWorkingDay = 'NON_WORKING_DAY',
  ShortDay = 'SHORT_DAY',
  Holiday = 'HOLIDAY'
}


export enum CalendarRulePeriod {
  Day = 'DAY',
  Week = 'WEEK',
  Month = 'MONTH',
  Year = 'YEAR',
}

export type CalendarRuleInput = {
  id?: string;
  title: string;
  displayTitle: boolean;
  type: CalendarRuleType;
  shortDayDuration: number | null;
  startDate: string | null;
  finishDate: string | null;
  isRecurring: boolean;
  recurringFrequency: number | null;
  recurringPeriod: CalendarRulePeriod | null;
  exceptions: Date[] | null;
}

export type CalendarRule = {
  id: string;
  title: string;
  displayTitle: boolean;
  type: CalendarRuleType;
  shortDayDuration: number | null;
  startDate: string;
  finishDate: string | null;
  isRecurring: boolean;
  recurringFrequency: number | null;
  recurringPeriod: CalendarRulePeriod | null;
  exceptions: Date[] | null;
}

