import type { LoginInput, RegisterInput, User } from '../profile/types';

export const LOGIN = 'LOGIN' as const;
export const login = (loginInput: LoginInput) => ({
  type: LOGIN,
  payload: { loginInput }
});

export const USER_AUTHENTICATED = 'USER_AUTHENTICATED' as const;
export const authenticate = (user: User) => ({
  type: USER_AUTHENTICATED,
  payload: { user }
});

export const REGISTER = 'REGISTER' as const;
export const register = (registerInput: RegisterInput) => ({
  type: REGISTER,
  payload: { registerInput }
});

export const FIRST_USER_EXISTENCE_REQUESTED = 'FIRST_USER_REQUESTED' as const;
export const requestFirstUserExistence = () => ({
  type: FIRST_USER_EXISTENCE_REQUESTED,
});

export const FIRST_USER_EXISTENCE_RECEIVED = 'FIRST_USER_EXISTENCE_RECEIVED' as const;
export const receiveFirstUserExistence = (firstUserExists: boolean) => ({
  type: FIRST_USER_EXISTENCE_RECEIVED,
  payload: { firstUserExists }
});

export type LoginAction = ReturnType<typeof login>;
export type AuthenticateAction = ReturnType<typeof authenticate>;
export type RegisterAction = ReturnType<typeof register>;
export type FirstUserExistenceReceiveAction = ReturnType<typeof receiveFirstUserExistence>;
export type ProfileActions = ReturnType<
  | typeof login
  | typeof register
  | typeof receiveFirstUserExistence
  | typeof authenticate>