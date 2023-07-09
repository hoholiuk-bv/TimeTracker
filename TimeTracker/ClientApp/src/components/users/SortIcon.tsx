import React, { JSX } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faSortUp, faSort } from '@fortawesome/free-solid-svg-icons';

type Props = {
  sortingType: string;
};

export const SortIcon = ({ sortingType }: Props) => {
  let sortIcon: JSX.Element;

  if (sortingType === 'descending') {
    sortIcon = <FontAwesomeIcon icon={faSortUp} className={'sorting-type ms-2'} />;
  } else if (sortingType === 'ascending') {
    sortIcon = <FontAwesomeIcon icon={faSortDown} className={'sorting-type ms-2'} />;
  } else {
    sortIcon = <FontAwesomeIcon icon={faSort} className={'sorting-type ms-2 sorting-inactive'} />;
  }

  return (
    <>
      {sortIcon}
    </>
  );
};
