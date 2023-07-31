import React from 'react';
import {FilterType} from '../../behavior/users/types';
import {useDispatch, useSelector} from 'react-redux';
import { RootState } from '../../behavior/store';
import Select from 'react-select';
import { receiveUserList, requestUserList } from '../../behavior/userCreation/actions';
import {ApproverOptions, ApproverInfo} from '../../behavior/userCreation/types';

type Props = {
  selectedApprovers: ApproverOptions[];
  setSelectedApprovers: (options: ApproverOptions[]) => void;
  excludeUserId: string | null
}

export const ApproversPicker = ({selectedApprovers, setSelectedApprovers, excludeUserId}: Props) => {
  const dispatch = useDispatch();
  const userList = useSelector((state: RootState) => state.userCreation.list);
  const filter: FilterType = { searchText: '', startEmploymentDate: null, endEmploymentDate: null, employmentTypes: [] };
  const filteredUsers = userList.filter((user: ApproverInfo) => user.isActive && (!excludeUserId || user.id !== excludeUserId));
  const approversOptions: ApproverOptions[] = filteredUsers.map(user => ({
    value: user.id,
    label: user.name + ' ' + user.surname + ' (' + user.email + ')'
  }));

  const handleApproversChange = (selectedOptions: any) => {
    setSelectedApprovers(selectedOptions);
  };

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      const value: string = event.target.value.trim();
      if(value !== '') {
        filter.searchText = value;
        dispatch(requestUserList(filter));
      } else {
        dispatch(receiveUserList([]));
      }
    }
  };

  return (
    <Select
      isMulti
      name="approversIdList"
      options={approversOptions}
      value={selectedApprovers}
      onKeyDown={handleKeyDown}
      onChange={handleApproversChange}
      className="approvers-picker"
      placeholder="Search by name or email..."
    />
  );
};
