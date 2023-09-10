import React from 'react';
import { useDispatch } from 'react-redux';
import { SortingInput } from '../../behavior/common/types';
import { SortIcon } from '../common/elements/SortIcon';
import { Alert } from 'react-bootstrap';
import { CalendarRule } from '../../behavior/calendar/types';
import { RuleItem } from './RuleItem';
import { changeCalendarRulesSorting } from '../../behavior/calendar/actions';
import { getNewSorting } from '../common/helpers';

type Props = {
  rules: CalendarRule[];
  sorting: SortingInput;
}

export const RuleList = ({ rules, sorting }: Props) => {
  const defaultSortingField = 'StartDate';

  const dispatch = useDispatch();
  const handleSortingColumnClick = (fieldName: string) => {
    const newSorting = getNewSorting(sorting, fieldName, defaultSortingField);
    dispatch(changeCalendarRulesSorting(newSorting));
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
