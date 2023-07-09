import { mergeMap, map, merge } from 'rxjs';
import {
    USER_CREATION,
    CreationActions,
} from './actions';
import { Epic, ofType } from 'redux-observable';
import { sendRequest } from '../graphApi';
import { creationMutation} from './queries';

const epic: Epic<CreationActions | any> = (actions$, state$) => {
    

    const userCreation$ = actions$.pipe(
        ofType(USER_CREATION),
        map(action => action.payload),
        mergeMap(({ registerInput }) => sendRequest(creationMutation, { input: registerInput }).pipe(
        ))
    );
    
    return merge(userCreation$);
};

export default epic;