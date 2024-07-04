import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import store from './store';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import BookingListPage from './components/BookingListPage';
import BookingFormPage from './components/BookingFormPage';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const token = useSelector((state) => state.auth.token);
  return token ? <Element /> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/bookings" element={<PrivateRoute element={BookingListPage} />} />
          <Route path="/booking/create" element={<PrivateRoute element={BookingFormPage} />} />
          <Route path="/booking/edit/:id" element={<PrivateRoute element={BookingFormPage} />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
