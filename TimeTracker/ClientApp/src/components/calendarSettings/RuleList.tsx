import React from 'react';
import { useDispatch } from 'react-redux';
import { SortingInput, SortingOrder } from '../../behavior/common/types';
import { SortIcon } from '../common/elements/SortIcon';
import { Alert } from 'react-bootstrap';
import { CalendarRule } from '../../behavior/calendar/types';
import { RuleItem } from './RuleItem';
import { changeCalendarRulesSorting } from '../../behavior/calendar/actions';

type Props = {
  rules: CalendarRule[];
  sorting: SortingInput;
}

export const RuleList = ({ rules, sorting }: Props) => {
  const defaultSortingField = 'StartDate';

  const dispatch = useDispatch();
  const handleSortingColumnClick = (fieldName: string) => {
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
    dispatch(changeCalendarRulesSorting({ sortingOrder: newSortingOrder, sortingField: newSortingField }));
  };

  if (!rules.length)
    return (
      <Alert variant='secondary'>No calendar rules found.</Alert>
    );

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th className='sortableColumn' onClick={() => handleSortingColumnClick('Title')}>
              <span>Title</span>
              <SortIcon sortingOrder={sorting.sortingField === 'Title' ? sorting.sortingOrder : null} />
            </th>
            <th className='sortableColumn' onClick={() => handleSortingColumnClick('Type')}>
              <span>Type</span>
              <SortIcon sortingOrder={sorting.sortingField === 'Type' ? sorting.sortingOrder : null} />
            </th>
            <th className='sortableColumn' onClick={() => handleSortingColumnClick('StartDate')}>
              <span>Start date</span>
              <SortIcon sortingOrder={sorting.sortingField === 'StartDate' ? sorting.sortingOrder : null} />
            </th>
            <th className='sortableColumn' onClick={() => handleSortingColumnClick('FinishDate')}>
              <span>Finish date</span>
              <SortIcon sortingOrder={sorting.sortingField === 'FinishDate' ? sorting.sortingOrder : null} />
            </th>
            <th>Recurring</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rules.map(rule =>
            <RuleItem
              key={rule.id}
              item={rule}
            />)}
        </tbody>
      </table>
    </>
  );
};
