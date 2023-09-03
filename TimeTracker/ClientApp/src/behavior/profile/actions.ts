import type { CreatePasswordInput, LoginInput, RegisterInput, UserInfo } from '../profile/types';

export const LOGIN_REQUESTED = 'LOGIN_REQUESTED' as const;
export const requestLogin = (loginInput: LoginInput) => ({
  type: LOGIN_REQUESTED,
  payload: { loginInput }
});

export const LOGIN_RECIEVED = 'LOGIN_RECIEVED' as const;
export const receiveLogin = (loginFailed: boolean) => ({
  type: LOGIN_RECIEVED,
  payload: { loginFailed }
});

export const USER_AUTHENTICATION_REQUESTED = 'USER_AUTHENTICATION_REQUESTED' as const;
export const requestAuthentication = () => ({
  type: USER_AUTHENTICATION_REQUESTED,
});

export const USER_AUTHENTICATED = 'USER_AUTHENTICATED' as const;
export const authenticate = (userInfo: UserInfo | null, token: string | null) => ({
  type: USER_AUTHENTICATED,
  payload: { userInfo, token }
});

export const USER_REGISTERED = 'USER_REGISTERED' as const;
export const register = (registerInput: RegisterInput) => ({
  type: USER_REGISTERED,
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

export const LOGOUT = 'LOGOUT' as const;
export const logout = () => ({
  type: LOGOUT,
});

export const CREATE_PASSWORD_REQUESTED = 'CREATE_PASSWORD_REQUESTED' as const;
export const requestPasswordCreation = (createPasswordInput: CreatePasswordInput) => ({
  type: CREATE_PASSWORD_REQUESTED,
  payload: { createPasswordInput }
});


export type LoginRequestAction = ReturnType<typeof requestLogin>;
export type LoginReceiveAction = ReturnType<typeof receiveLogin>;
export type AuthenticateAction = ReturnType<typeof authenticate>;
export type RegisterAction = ReturnType<typeof register>;
export type FirstUserExistenceReceiveAction = ReturnType<typeof receiveFirstUserExistence>;
export type LogoutAction = ReturnType<typeof logout>;
export type CreatePasswordAction = ReturnType<typeof requestPasswordCreation>;
export type ProfileActions = ReturnType<
  | typeof requestLogin
  | typeof receiveLogin
  | typeof register
  | typeof receiveFirstUserExistence
  | typeof authenticate
  | typeof logout
  | typeof requestPasswordCreation>
