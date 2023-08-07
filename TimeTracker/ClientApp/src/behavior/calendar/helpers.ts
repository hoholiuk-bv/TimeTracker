import { AppliedRule } from './reducer';
import { CalendarRule, CalendarRulePeriod } from './types';
import { differenceInCalendarDays, getDaysInMonth, isAfter, isBefore, isEqual } from 'date-fns';

export function getAppliedRulesForMonth(year: number, month: number, rules: CalendarRule[]): { [day: number]: AppliedRule } | null {
  const appliedRules: { [day: number]: AppliedRule } = {};
  const daysInMonth = getDaysInMonth(new Date(year, month));

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month - 1, day);
    const appliedRule = rules.find(rule => checkIfDateMatchesRule(date, rule));
    if (appliedRule)
      appliedRules[day] = { type: appliedRule.type, title: appliedRule.title };
  }

  return Object.keys(appliedRules).length ? appliedRules : null;
}

function checkIfDateMatchesRule(date: Date, rule: CalendarRule): boolean {
  const ruleStartDate = new Date(rule.startDate);
  const ruleFinishDate = rule.finishDate != null ? new Date(rule.finishDate) : null;

  if (rule.exceptions?.some(exceptionDate => isEqual(exceptionDate, date)))
    return false;

  if (isBefore(date, ruleStartDate) || (ruleFinishDate != null && isAfter(date, ruleFinishDate)))
    return false;

  if (!rule.isRecurring)
    return isEqual(ruleStartDate, date);

  if (rule.recurringPeriod === CalendarRulePeriod.Day && rule.recurringFrequency)
    return checkIfDateMatchesRecurringOnDays(date, ruleStartDate, rule.recurringFrequency);

  if (rule.recurringPeriod === CalendarRulePeriod.Week && rule.recurringFrequency)
    return checkIfDateMatchesRecurringOnDays(date, ruleStartDate, rule.recurringFrequency * 7);

  if (rule.recurringPeriod === CalendarRulePeriod.Month && rule.recurringFrequency)
    return checkIfDateMatchesRecurringOnMonths(date, ruleStartDate, rule.recurringFrequency);

  if (rule.recurringPeriod === CalendarRulePeriod.Year && rule.recurringFrequency)
    return checkIfDateMatchesRecurringOnYears(date, ruleStartDate, rule.recurringFrequency);

  return false;
}

function checkIfDateMatchesRecurringOnDays(date: Date, ruleStartDate: Date, recurringFrequencyInDays: number): boolean {
  const differenceInDays = differenceInCalendarDays(date, ruleStartDate);
  return differenceInDays % recurringFrequencyInDays === 0;
}

function checkIfDateMatchesRecurringOnMonths(date: Date, ruleStartDate: Date, recurringFrequencyInMonths: number): boolean {
  const differenceInMonth = Math.abs(date.getMonth() - ruleStartDate.getMonth());
  return differenceInMonth % recurringFrequencyInMonths === 0 && date.getDate() === ruleStartDate.getDate();
}

function checkIfDateMatchesRecurringOnYears(date: Date, ruleStartDate: Date, recurringFrequencyInYears: number): boolean {
  const differenceInYears = Math.abs(date.getFullYear() - ruleStartDate.getFullYear());
  return differenceInYears % recurringFrequencyInYears === 0 && date.getMonth() === ruleStartDate.getMonth() && date.getDate() === ruleStartDate.getDate();
}
