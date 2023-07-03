import React from 'react';
import { LoginPage } from './components/profile/LoginPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { UsersPage } from './components/users/UsersPage';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Layout />}>
            <Route path="/users" element={<UsersPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;