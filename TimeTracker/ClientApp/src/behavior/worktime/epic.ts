import { mergeMap, map, merge } from 'rxjs';
import {
    USER_CREATION,
    CreationActions, userCreation,
} from './actions';
import { Epic, ofType } from 'redux-observable';
import { sendRequest } from '../graphApi';
import { worktimeCreationMutation} from './queries';

const epic: Epic<CreationActions | any> = (actions$, state$) => {


    const userCreation = actions$.pipe(
        ofType(USER_CREATION),
        map(action => action.payload),
        mergeMap(({ userCreationInput }) => sendRequest(worktimeCreationMutation, { input: userCreationInput }).pipe(
        ))
    );

    return merge(userCreation);
};

export default epic;