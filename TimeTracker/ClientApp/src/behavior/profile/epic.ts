import { mergeMap, map, merge, switchMap } from 'rxjs';
import {
  FIRST_USER_EXISTENCE_REQUESTED,
  LOGIN_REQUESTED,
  USER_REGISTERED,
  USER_AUTHENTICATION_REQUESTED,
  LOGOUT,
  ProfileActions,
  receiveFirstUserExistence,
  authenticate as authenticateUser,
  receiveLogin,
  CREATE_PASSWORD_REQUESTED,
  GOOGLE_LOGIN,
} from './actions';
import { Epic, ofType } from 'redux-observable';
import { sendRequest } from '../graphApi';
import { loginMutation, registerMutation, firstUserExistenceQuery, authencationMutation, logoutMutation, activateAccountMutation, googleLoginMutation } from './queries';

const epic: Epic<ProfileActions | any> = (actions$, state$) => {
  const login$ = actions$.pipe(
    ofType(LOGIN_REQUESTED),
    map(action => action.payload),
    switchMap(({ loginInput }) => sendRequest(loginMutation, { input: loginInput }).pipe(
      mergeMap(({ profile: { login } }) => {
        const loginFailed = !login;
        const actions: ProfileActions[] = [receiveLogin(loginFailed)];
        if (!loginFailed)
          actions.push(authenticateUser(login.userInfo, login.token));

        return actions;
      })
    ))
  );

  const register$ = actions$.pipe(
    ofType(USER_REGISTERED),
    map(action => action.payload),
    mergeMap(({ registerInput }) => sendRequest(registerMutation, { input: registerInput }).pipe(
      map(({ profile: { firstUserRegister } }) => authenticateUser(firstUserRegister.userInfo, firstUserRegister.token))
    ))
  );

  const requestAuthentication$ = actions$.pipe(
    ofType(USER_AUTHENTICATION_REQUESTED),
    switchMap(() => sendRequest(authencationMutation).pipe(
      mergeMap(({ profile: { authenticate } }) => {
        const notAuthenticated = !authenticate;
        const actions: any[] = [];
        if (notAuthenticated) {
          actions.push(authenticateUser(null, null));
        }
        else
          actions.push(authenticateUser(authenticate.userInfo, authenticate.token));

        return actions;
      })
    ))
  );

  const requestFirstUserExistence$ = actions$.pipe(
    ofType(FIRST_USER_EXISTENCE_REQUESTED),
    mergeMap(() => sendRequest(firstUserExistenceQuery).pipe(
      map(({ profile: { checkFirstUserExistence } }) => receiveFirstUserExistence(checkFirstUserExistence))
    )),
  );

  const logout$ = actions$.pipe(
    ofType(LOGOUT),
    mergeMap(() => sendRequest(logoutMutation)),
  );

  const createPassword$ = actions$.pipe(
    ofType(CREATE_PASSWORD_REQUESTED),
    map(action => action.payload),
    switchMap(({ createPasswordInput }) => sendRequest(activateAccountMutation, { input: createPasswordInput }).pipe(
      mergeMap(({ profile: { activateAccount } }) => {
        const loginFailed = !activateAccount;
        const actions: ProfileActions[] = [receiveLogin(loginFailed)];
        if (!loginFailed)
          actions.push(authenticateUser(activateAccount.userInfo, activateAccount.token));

        return actions;
      })
    ))
  );

  const googleLogin$ = actions$.pipe(
    ofType(GOOGLE_LOGIN),
    map(action => action.payload),
    switchMap(({ token }) => sendRequest(googleLoginMutation, { token: token }).pipe(
      mergeMap(({ profile: { googleLogin } }) => {
        const loginFailed = !googleLogin;
        const actions: ProfileActions[] = [receiveLogin(loginFailed)];
        if (!loginFailed)
          actions.push(authenticateUser(googleLogin.userInfo, googleLogin.token));

        return actions;
      })
    ))
  );
  return merge(login$, register$, requestFirstUserExistence$, requestAuthentication$, logout$, createPassword$, googleLogin$);
};

export default epic;