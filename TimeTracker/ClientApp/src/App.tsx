import React from 'react';
import { LoginPage } from './components/profile/LoginPage';
import { Layout } from './components/layout/Layout';
import { UserListPage } from './components/users/UserListPage';
import { routes } from './behavior/routing';
import { NotFound } from './components/common/NotFound';
import { UserCreationPage } from './components/userCreation/UserCreationPage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Page } from './components/common/Page';
import { PermissionType } from './behavior/profile/types';
import { WorktimePage } from './components/worktimePage/WorktimePage';
import { DaysOffPage } from './components/daysOff/DaysOffPage';
import { ApprovalsPage } from './components/approvals/ApprovalsPage';
import { UserDetailsPage } from './components/userDetails/UserDetailsPage';
import { UserDaysOffPage } from './components/userDaysOff/UserDaysOffPage';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path={routes.login} element={<LoginPage />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to={routes.users.list} />} />
            <Route
              path={routes.users.creation}
              element={
                <Page requiredPermissions={[PermissionType.ManageUsers]}>
                  <UserCreationPage />
                </Page>
              }
            />
            <Route
              index
              path={routes.users.list}
              element={
                <Page requiredPermissions={[PermissionType.ManageUsers]}>
                  <UserListPage />
                </Page>
              }
            />
            <Route
              path={routes.users.details}
              element={
                <Page requiredPermissions={[PermissionType.ManageUsers]}>
                  <UserDetailsPage />
                </Page>
              }
            />
            <Route
              index
              path={routes.daysoff}
              element={
                <Page>
                  <DaysOffPage />
                </Page>
              }
            />
            <Route
              index
              path={routes.approvals}
              element={
                <Page>
                  <ApprovalsPage />
                </Page>
              }
            />
            <Route
              index
              path={routes.worktime}
              element={
                <Page>
                  <WorktimePage />
                </Page>
              }
            />
            <Route
              index
              path={routes.users.daysoff}
              element={
                <Page requiredPermissions={[PermissionType.ManageUsers]}>
                  <UserDaysOffPage />
                </Page>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter >
    </>
  );
};

export default App;
