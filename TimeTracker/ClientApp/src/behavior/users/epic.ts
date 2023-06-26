import { merge } from 'rxjs';
import { Epic } from 'redux-observable';

const epic: Epic<any> = (actions$, state$) => {
  const requestUsers$ = actions$.pipe();

  return merge(requestUsers$);
};

export default epic;