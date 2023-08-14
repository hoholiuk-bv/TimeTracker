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
query($sorting: SortingInput) {
calendar {
  rules{
    list(sorting: $sorting) {
      id
      title
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

export const deleteCalendarRuleMutation = `
mutation($ruleId: ID!) {
  calendar {
      rules {
        delete(ruleId: $ruleId)
    }
  }
}`;
