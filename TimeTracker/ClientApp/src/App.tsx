import React from 'react';
import { LoginPage } from './components/profile/LoginPage';
import { Layout } from './components/layout/Layout';
import { UserListPage } from './components/users/UserListPage';
import { routes } from './behavior/routing';
import { NotFound } from './components/common/NotFound';
import {CreationForm} from './components/creationForm/CreationForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={routes.register} element={<CreationForm />} />
          <Route path={routes.login} element={<LoginPage />} />
          <Route path="/" element={<Layout />}>
            <Route path={routes.users} element={<UserListPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter >
    </>
  );
};

export default App;
