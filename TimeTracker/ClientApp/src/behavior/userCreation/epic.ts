import { mergeMap, map, merge } from 'rxjs';
import {
    FIRST_USER_EXISTENCE_REQUESTED,
    LOGIN,
    REGISTER,
    ProfileActions,
    receiveFirstUserExistence,
    authenticate,
} from './actions';
import { Epic, ofType } from 'redux-observable';
import { sendRequest } from '../graphApi';
import { loginMutation, registerMutation} from './queries';

const epic: Epic<ProfileActions | any> = (actions$, state$) => {
    const login$ = actions$.pipe(
        ofType(LOGIN),
        map(action => action.payload),
        mergeMap(({ loginInput }) => sendRequest(loginMutation, { input: loginInput }).pipe(
            map(({ profile: { login } }) => authenticate({ ...login }))
        ))
    );

    const register$ = actions$.pipe(
        ofType(REGISTER),
        map(action => action.payload),
        mergeMap(({ registerInput }) => sendRequest(registerMutation, { input: registerInput }).pipe(
        ))
    );

   


    return merge(login$, register$);
};

export default epic;