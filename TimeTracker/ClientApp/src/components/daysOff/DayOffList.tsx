import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SortingOrder } from '../../behavior/common/types';
import { requestDaysOffList, changeDaysOffListSorting } from '../../behavior/daysOff/actions';
import { RootState } from '../../behavior/store';
import { DayOffItem } from './DayOffItem';
import { SortIcon } from '../common/elements/SortIcon';

export const DayOffList = () => {
  const defaultSortingField = 'StartDate';

  const dispatch = useDispatch();
  const { list: daysOff, sorting } = useSelector((state: RootState) => state.daysOff);
  useEffect(() => { dispatch(requestDaysOffList(sorting, { pageNumber: 1, pageSize: 10 })); }, [dispatch, sorting]);
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
    dispatch(changeDaysOffListSorting({ sortingOrder: newSortingOrder, sortingField: newSortingField }));
  };

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th className='sortableColumn' onClick={() => handleSortingColumnClick('StartDate')}>
              <span>Start date</span>
              <SortIcon sortingOrder={sorting.sortingField === 'StartDate' ? sorting.sortingOrder : null} />
            </th>
            <th className='sortableColumn' onClick={() => handleSortingColumnClick('FinishDate')}>
              <span>Finish date</span>
              <SortIcon sortingOrder={sorting.sortingField === 'FinishDate' ? sorting.sortingOrder : null} />
            </th>
            <th className='sortableColumn' onClick={() => handleSortingColumnClick('Reason')}>
              <span>Reason</span>
              <SortIcon sortingOrder={sorting.sortingField === 'Reason' ? sorting.sortingOrder : null} />
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
