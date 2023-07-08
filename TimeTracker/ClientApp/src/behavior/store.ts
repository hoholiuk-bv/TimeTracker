import { default as rootReducer } from './rootReducer';
import { default as rootEpic } from './rootEpic';
import { configureStore } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';

const epicMiddleware = createEpicMiddleware();

const store = configureStore({ reducer: rootReducer, middleware: [epicMiddleware] });
epicMiddleware.run(rootEpic);

export type RootState = ReturnType<typeof store.getState>
export default store;
