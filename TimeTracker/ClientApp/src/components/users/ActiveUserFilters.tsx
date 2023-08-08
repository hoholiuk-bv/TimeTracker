import React from 'react';
import { employmentType, employmentTypeForDisplay, FilterType } from '../../behavior/users/types';
import { RemoveFilterButton } from './RemoveFilterButton';
import { changeUserListFiltering } from '../../behavior/users/actions';
import { useDispatch } from 'react-redux';
import { SelectElementOptions } from '../../behavior/common/types';

type Props = {
    filtering: FilterType;
    setFieldValue: any;
    selectedEmploymentTypes: SelectElementOptions[];
    setSelectedEmploymentTypes: React.Dispatch<React.SetStateAction<SelectElementOptions[]>>;
}

export const ActiveUserFilters = ({filtering, setFieldValue, selectedEmploymentTypes, setSelectedEmploymentTypes}: Props) => {
  const dispatch = useDispatch();

  const handleSearchTextRemove = (setFieldValue: any) => {
    const newFiltering = { ...filtering, searchText: '' };
    dispatch(changeUserListFiltering(newFiltering));

    setFieldValue('searchText', '');
  };

  const handleEmploymentDateRemove = (setFieldValue: any) => {
    const newFiltering = { ...filtering, startEmploymentDate: null, endEmploymentDate: null };
    dispatch(changeUserListFiltering(newFiltering));

    setFieldValue('startEmploymentDate', '');
    setFieldValue('endEmploymentDate', '');
  };

  const handleEmploymentTypeRemove = (type: string) => {
    const updatedEmploymentTypes = selectedEmploymentTypes.filter((option: SelectElementOptions) => option.value !== type);
    const newFiltering = { ...filtering, employmentTypes: updatedEmploymentTypes.map(option => option.value) };
    dispatch(changeUserListFiltering(newFiltering));

    setSelectedEmploymentTypes(updatedEmploymentTypes);
  };

  const handleShowInactiveUsersRemove = (setFieldValue: any) => {
    const newFiltering = { ...filtering, showOnlyActiveUsers: true };
    dispatch(changeUserListFiltering(newFiltering));

    setFieldValue('showOnlyActiveUsers', true);
  };

  const generateRemoveFilterButtons = (setFieldValue: any) => {
    const removeFilterButtons = [];

    if (filtering.searchText !== '') {
      removeFilterButtons.push(
        <RemoveFilterButton key={'searchText'} content={filtering.searchText} onClick={() => handleSearchTextRemove(setFieldValue)}/>
      );
    }

    if (filtering.startEmploymentDate !== '' && filtering.startEmploymentDate !== null) {
      let employmentDateContent;

      if(filtering.endEmploymentDate !== '' && filtering.endEmploymentDate !== null) {
        employmentDateContent = `${new Date(filtering.startEmploymentDate).toLocaleDateString()} - ${new Date(filtering.endEmploymentDate).toLocaleDateString()}`;
      }
      else {
        employmentDateContent = new Date(filtering.startEmploymentDate).toLocaleDateString();
      }

      removeFilterButtons.push(
        <RemoveFilterButton key={'employmentDate'} content={employmentDateContent} onClick={() => handleEmploymentDateRemove(setFieldValue)}/>
      );
    }

    filtering.employmentTypes.forEach((type: string) => {
      const employmentTypeKey = Object.keys(employmentType).find(key => employmentType[key as keyof typeof employmentType] === type);
      const content = employmentTypeForDisplay[employmentTypeKey as keyof typeof employmentTypeForDisplay];

      removeFilterButtons.push(
        <RemoveFilterButton key={type} content={content} onClick={() => handleEmploymentTypeRemove(type)}/>
      );
    });

    if(!filtering.showOnlyActiveUsers) {
      removeFilterButtons.push(
        <RemoveFilterButton key={'showOnlyActiveUsers'} content={'Show inactive users'} onClick={() => handleShowInactiveUsersRemove(setFieldValue)}/>
      );
    }

    if(removeFilterButtons.length > 0) {
      removeFilterButtons.unshift(
        <span className="d-flex align-items-center fw-bold">Search by: </span>
      );
    }

    return removeFilterButtons;
  };

  return (
    <>
      {generateRemoveFilterButtons(setFieldValue)}
    </>
  );
};
