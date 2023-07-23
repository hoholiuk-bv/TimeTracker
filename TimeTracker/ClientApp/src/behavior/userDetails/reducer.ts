import { createReducer } from '@reduxjs/toolkit';
import type { User } from '../users/types';
import type { User as Approver } from '../userCreation/types';
import {
  USER_RECEIVED, UserReceivedAction,
  APPROVERS_RECEIVED, ApproversReceivedAction,
  USER_UPDATE_RECEIVED, UpdatedUserReceivedAction
} from './actions';

export type userCreationState = {
  details: User | null,
  approvers: Approver[],
};

const initialState: userCreationState = {
  details: null,
  approvers: [],
};

export default createReducer(initialState, {
  [USER_RECEIVED]: onUserReceived,
  [APPROVERS_RECEIVED]: onApproversReceived,
  [USER_UPDATE_RECEIVED]: onUserUpdateReceived,
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
    id: updatedData.id !== null ? updatedData.id : '',
    name: updatedData.name !== null ? updatedData.name : '',
    surname: updatedData.surname !== null ? updatedData.surname : '',
    email: updatedData.email !== null ? updatedData.email : '',
    isAdmin: updatedData.isAdmin !== null ? updatedData.isAdmin : false,
    isActive: updatedData.isActive !== null ? updatedData.isActive : false,
    employmentDate: updatedData.employmentDate !== null ? updatedData.employmentDate : '',
    employmentType: updatedData.employmentType !== null ? updatedData.employmentType : '',
    workingHoursCount: updatedData.workingHoursCount !== null ? updatedData.workingHoursCount : 0,
  };

  return {...state, details};
}

