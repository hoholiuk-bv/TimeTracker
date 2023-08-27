export type LoginInput = {
  email: string | null;
  password: string | null;
}

export type RegisterInput = {
  name: string | null;
  surname: string | null;
  email: string | null;
  password: string | null;
}

export type UserInfo = {
  id: string;
  name: string;
  surname: string;
  permissions: PermissionType[]
}

export enum PermissionType {
  ManageUsers = 'MANAGE_USERS',
  ConfigureCalendar = 'CONFIGURE_CALENDAR',
  UseWorktimeTimer = 'USE_WORKTIME_TIMER',
}
