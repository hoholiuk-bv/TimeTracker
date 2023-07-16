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

export type DayOffType = {
  id: string;
  startDate: string;
  finishDate: string;
  reason: DayOffRequestType;
}
