import { mergeMap, map, merge } from 'rxjs';
import {
    REGISTER,
    CreationActions,
} from './actions';
import { Epic, ofType } from 'redux-observable';
import { sendRequest } from '../graphApi';
import { creationMutation} from './queries';

const epic: Epic<CreationActions | any> = (actions$, state$) => {
    

    const register$ = actions$.pipe(
        ofType(REGISTER),
        map(action => action.payload),
        mergeMap(({ registerInput }) => sendRequest(creationMutation, { input: registerInput }).pipe(
        ))
    );
    
    return merge(register$);
};

export default epic;