import { default as rootReducer } from './rootReducer';
import { default as rootEpic } from './rootEpic';
import { configureStore } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';

const epicMiddleware = createEpicMiddleware();

const store = configureStore({ reducer: rootReducer, middleware: [epicMiddleware, routerMiddleware(createBrowserHistory())] });
epicMiddleware.run(rootEpic);

export type RootState = ReturnType<typeof store.getState>
export default store;