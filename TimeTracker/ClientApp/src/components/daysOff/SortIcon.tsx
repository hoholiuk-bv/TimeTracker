import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faSortUp, faSort } from '@fortawesome/free-solid-svg-icons';
import { SortingModes } from '../../behavior/common/types';

type Props = {
  sortingMode: SortingModes | null;
};


export const SortIcon = ({ sortingMode }: Props) => {
  const sortingIconClass = 'sorting-type ms-2';

  if (sortingMode === SortingModes.Ascending)
    return <FontAwesomeIcon icon={faSortDown} className={sortingIconClass} />;
  if (sortingMode === SortingModes.Descending)
    return <FontAwesomeIcon icon={faSortUp} className={sortingIconClass} />;

  return <FontAwesomeIcon icon={faSort} className={`${sortingIconClass} sorting-inactive`} />;
};
