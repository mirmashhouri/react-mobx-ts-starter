import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import {
  useConfigStore,
} from 'stores';
import {
  HomePage,
  AuthenticationErrorPage,
  FourZeroFourPage,
} from 'pages';
import { Spinner } from 'components/Spinner';
import { IRouter } from './types';

export const Router: IRouter = observer(() => {
  useConfigStore();

  return (
    <Routes>
      <Route
        element={
          <Suspense fallback={ <Spinner /> }>
            <HomePage />
          </Suspense> }
      />
      <Route
        path="/"
        element={
          <HomePage />
        }
      />
      <Route
        path="/auth-error"
        element={ <AuthenticationErrorPage /> }
      />
      <Route
        path="/404"
        element={ <FourZeroFourPage /> }
      />
      <Route
        path="/*"
        element={ <FourZeroFourPage /> }
      />
    </Routes>
  );
});
