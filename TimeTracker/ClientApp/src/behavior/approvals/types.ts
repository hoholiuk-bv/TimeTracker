import type { DayOffApprovalStatus } from '../common/types';

export type ApprovalType = {
  requestId: string;
  employeeName: string;
  employeeSurname: string;
  startDate: string;
  finishDate: string;
  status: DayOffApprovalStatus;
}

