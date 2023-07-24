import type { DayOffApprovalStatus } from '../common/types';

export type DayOffApproval = {
  requestId: string;
  employeeName: string;
  employeeSurname: string;
  startDate: string;
  finishDate: string;
  status: DayOffApprovalStatus;
  isEditable: boolean;
}

