import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookings } from '../actions/bookingActions'; // Import logout action
import {  logout } from '../actions/authActions'; // Import logout action

import { Link } from 'react-router-dom';

const BookingListPage = () => {
  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector((state) => state.booking);

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Bookings</h2>
      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      <Link to="/booking/create" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-4 inline-block">
        Create Booking
      </Link>
      <button onClick={handleLogout} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-4 inline-block">
        LogOut
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-gray-200 border">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm border border-gray-200">Name</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm border border-gray-200">Email</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm border border-gray-200">Booking Type</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm border border-gray-200">Booking Date</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm border border-gray-200">Booking Slot</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm border border-gray-200">Booking Time</th>
              <th className="py-3 px-4 uppercase font-semibold text-sm border border-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-b border-gray-200">
                <td className="py-3 px-4 border border-gray-200">{booking.name}</td>
                <td className="py-3 px-4 border border-gray-200">{booking.email}</td>
                <td className="py-3 px-4 border border-gray-200">{booking.booking_type}</td>
                <td className="py-3 px-4 border border-gray-200">{booking.booking_date}</td>
                <td className="py-3 px-4 border border-gray-200">{booking.booking_slot}</td>
                <td className="py-3 px-4 border border-gray-200">{booking.booking_time}</td>
                <td className="py-3 px-4 border border-gray-200">
                  <Link to={`/booking/edit/${booking.id}`} className="text-blue-500 hover:text-blue-600">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingListPage;
