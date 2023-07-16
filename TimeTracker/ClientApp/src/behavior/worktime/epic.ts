import { mergeMap, map, merge } from 'rxjs';
import {
    WORKTIME_CREATION,
    CreationActions,
} from './actions';
import { Epic, ofType } from 'redux-observable';
import { sendRequest } from '../graphApi';
import { worktimeCreationMutation} from './queries';

const epic: Epic<CreationActions | any> = (actions$, state$) => {


    const userCreation = actions$.pipe(
        ofType(WORKTIME_CREATION),
        map(action => action.payload),
        mergeMap(({ worktimeCreationInput }) => sendRequest(worktimeCreationMutation, { input: worktimeCreationInput }).pipe(
        ))
    );

    return merge(userCreation);
};

export default epic;