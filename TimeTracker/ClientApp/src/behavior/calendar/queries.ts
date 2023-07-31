export const createCalendarRuleMutation = `
mutation($input: CalendarRuleInput!) {
  calendar {
      rules {
        create(input: $input)
    }
  }
}`;

export const editCalendarRuleMutation = `
mutation($input: CalendarRuleInput!) {
  calendar {
      rules {
        update(input: $input)
    }
  }
}`;

export const getCalendarRuleListQuery = `
query($sorting: SortingInput!, $paging: PagingInput!) {
calendar {
  rules{
    list(sorting: $sorting, paging: $paging) {
      id
      title
      displayTitle
      type
      startDate
      finishDate
      shortDayDuration
      isRecurring
      recurringFrequency
      recurringPeriod
      exceptions
    }
  }
}
}`;
