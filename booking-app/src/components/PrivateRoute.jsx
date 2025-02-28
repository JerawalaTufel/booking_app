// components/PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { token } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      element={token ? <Element /> : <Navigate to="/login" replace />}
    />
  );
};

export default PrivateRoute;
