import { DayOffApprovalStatus } from '../common/types';

export type DayOffRequestInput = {
  startDate: string;
  finishDate: string;
  reason: DayOffRequestType;
}

export enum DayOffRequestType {
  Vacation = 'VACATION',
  SickLeave = 'SICK_LEAVE',
  DayOff = 'DAY_OFF'
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

export type DayOffType = {
  id: string;
  startDate: string;
  finishDate: string;
  reason: DayOffRequestType;
  approvals: DayOffApprovalType[];
}
