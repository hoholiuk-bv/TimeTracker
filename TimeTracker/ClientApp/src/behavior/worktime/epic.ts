import {mergeMap, map, merge, tap} from 'rxjs';
import {
    WORKTIME_CREATION,
    CreationActions, 
    WORKTIME_LIST_REQUESTED,
    receiveWorktime, WORKTIME_UPDATE,
} from './actions';
import {Epic, ofType} from 'redux-observable';
import {sendRequest} from '../graphApi';
import {
    /*GetCurrentSessionQuery*/
    getWorktimeQuery,
    updateWorktimeMutation,
    worktimeCreationMutation
} from './queries';


const epic: Epic<CreationActions | any> = (actions$, state$) => {


    const worktimeCreation = actions$.pipe(
        ofType(WORKTIME_CREATION),
        map(action => action.payload),
        mergeMap(({worktimeCreationInput}) => sendRequest(worktimeCreationMutation, {input: worktimeCreationInput}).pipe(
        ))
    );
    
    const requestWorktime$ = actions$.pipe(
        ofType(WORKTIME_LIST_REQUESTED),
        mergeMap((action) =>
            sendRequest(getWorktimeQuery, { id: action.payload.id }).pipe(
                map((data) => receiveWorktime(data.worktime.worktimeRecord))
            )
        )
    );

    const updateWorktime$ = actions$.pipe(
        ofType(WORKTIME_UPDATE),
        map(action => action.payload),
        mergeMap(({ id }) => sendRequest(updateWorktimeMutation, { id }).pipe(
            
        ))
    );
    
    return merge(worktimeCreation, requestWorktime$, updateWorktime$);
};

export default epic;