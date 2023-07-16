import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faSortUp, faSort } from '@fortawesome/free-solid-svg-icons';
import { SortingOrder } from '../../../behavior/common/types';

type Props = {
  sortingOrder: SortingOrder | null;
};


export const SortIcon = ({ sortingOrder }: Props) => {
  const sortingIconClass = 'sorting-type ms-2';

  if (sortingOrder === SortingOrder.Ascending)
    return <FontAwesomeIcon icon={faSortDown} className={sortingIconClass} />;
  if (sortingOrder === SortingOrder.Descending)
    return <FontAwesomeIcon icon={faSortUp} className={sortingIconClass} />;

  return <FontAwesomeIcon icon={faSort} className={`${sortingIconClass} sorting-inactive`} />;
};
