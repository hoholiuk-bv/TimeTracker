import { createReducer } from '@reduxjs/toolkit';
import type { User } from '../users/types';
import type { ApproverInfo } from '../userCreation/types';
import {
  USER_RECEIVED, UserReceivedAction,
  APPROVERS_RECEIVED, ApproversReceivedAction,
  USER_UPDATED, UpdatedUserReceivedAction
} from './actions';

export type userCreationState = {
  details: User | null,
  approvers: ApproverInfo[],
};

const initialState: userCreationState = {
  details: null,
  approvers: [],
};

export default createReducer(initialState, {
  [USER_RECEIVED]: onUserReceived,
  [APPROVERS_RECEIVED]: onApproversReceived,
  [USER_UPDATED]: onUserUpdateReceived,
});

function onUserReceived(state: userCreationState, action: UserReceivedAction): userCreationState {
  const details = action.payload.user;
  return {...state, details};
}

function onApproversReceived(state: userCreationState, action: ApproversReceivedAction): userCreationState {
  const approvers = action.payload.approverList;
  return {...state, approvers};
}

function onUserUpdateReceived(state: userCreationState, action: UpdatedUserReceivedAction): userCreationState {
  const updatedData = action.payload.userUpdate;

  const details: User = {
    id: updatedData.id,
    name: updatedData.name,
    surname: updatedData.surname,
    email: updatedData.email,
    isAdmin: updatedData.isAdmin,
    isActive: updatedData.isActive,
    employmentDate: updatedData.employmentDate,
    employmentType: updatedData.employmentType,
    workingHoursCount: updatedData.workingHoursCount,
  };

  return {...state, details};
}
