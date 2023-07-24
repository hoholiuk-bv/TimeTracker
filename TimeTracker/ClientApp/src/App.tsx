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
import { DaysOffPage } from './components/daysOff/DaysOffPage';
import { ApprovalsPage } from './components/approvals/ApprovalsPage';
import {UserDetails} from './components/userDetails/UserDetails';

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
            <Route
              path={routes.users.details}
              element={
                <Page requiredPermissions={[PermissionType.ManageUsers]}>
                  <UserDetails />
                </Page>
              } />
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
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter >
    </>
  );
};

export default App;
