import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SortingModes } from '../../behavior/common/types';
import { requestDaysOffList } from '../../behavior/daysOff/actions';
import { RootState } from '../../behavior/store';
import { DayOffItem } from './DayOffItem';
import { SortIcon } from './SortIcon';

export const DayOffList = () => {
  const dispatch = useDispatch();
  const daysOff = useSelector((state: RootState) => state.daysOff.list);

  useEffect(() => { dispatch(requestDaysOffList()); }, [dispatch]);
  const [sortingField, setSortingField] = useState<string | null>(null);
  const [sortingMode, setSortingMode] = useState<SortingModes>(SortingModes.Ascending);
  const handleSortingColumnClick = (fieldName: string) => {
    if (fieldName !== sortingField) {
      setSortingField(fieldName);
      setSortingMode(SortingModes.Ascending);
      return;
    }

    switch (sortingMode) {
    case SortingModes.Ascending:
      setSortingMode(SortingModes.Descending);
      break;
    case SortingModes.Descending:
      setSortingMode(SortingModes.Ascending);
      setSortingField(null);
    }
  };

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th className='sortableColumn' onClick={() => handleSortingColumnClick('StartDate')}>
              <span>Start date</span>
              <SortIcon sortingMode={sortingField === 'StartDate' ? sortingMode : null}/>
            </th>
            <th className='sortableColumn' onClick={() => handleSortingColumnClick('FinishDate')}>
              <span>Finish date</span>
              <SortIcon sortingMode={sortingField === 'FinishDate' ? sortingMode : null}/>
            </th>
            <th className='sortableColumn' onClick={() => handleSortingColumnClick('Reason')}>
              <span>Reason</span>
              <SortIcon sortingMode={sortingField === 'Reason' ? sortingMode : null}/>
            </th>
          </tr>
        </thead>
        <tbody>
          {daysOff.map(dayOff =>
            <DayOffItem
              key={dayOff.id}
              item={dayOff}
            />)}
        </tbody>
      </table>
    </>
  );
};