import { DayOffApprovalStatus } from '../common/types';

export type DayOffRequestInput = {
  startDate: string;
  finishDate: string;
  reason: DayOffRequestReason;
}

export enum DayOffRequestReason {
  Vacation = 'VACATION',
  SickLeave = 'SICK_LEAVE',
  Absence = 'ABSENCE'
}

type DayOffApprovalType = {
  status: DayOffApprovalStatus,
  declineReason: string | null,
  approver: {
    id: string,
    name: string,
    surname: string,
  }
}

export type DayOffRequest = {
  id: string;
  startDate: string;
  finishDate: string;
  reason: DayOffRequestReason;
  approvals: DayOffApprovalType[];
  isEditable: boolean;
}

export type DayOffRequestFilterInput = {
  requestId: string | null;
  userId: string | null;
}
