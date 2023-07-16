import React from 'react';
import { LoginPage } from './components/profile/LoginPage';
import { Layout } from './components/layout/Layout';
import { UserListPage } from './components/users/UserListPage';
import { routes } from './behavior/routing';
import { NotFound } from './components/common/NotFound';
import { CreationForm } from './components/creationForm/CreationForm';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Page } from './components/common/Page';
import { PermissionType } from './behavior/profile/types';
import {Timer} from './components/worktimePage/Timer';
import {WorktimePage} from './components/worktimePage/WorktimePage';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route index path={routes.worktime} element={<WorktimePage />} />
            <Route index path={routes.login} element={<LoginPage />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to={routes.users.list} />} />
            <Route
              path={routes.users.creation}
              element={
                <Page requiredPermissions={[PermissionType.ManageUsers]}>
                  <CreationForm />
                </Page>
              } />
            <Route
              index
              path={routes.users.list}
              element={
                <Page requiredPermissions={[PermissionType.ManageUsers]}>
                  <UserListPage />
                </Page>} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter >
    </>
  );
};

export default App;
