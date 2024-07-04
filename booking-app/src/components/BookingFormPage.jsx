import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBooking, updateBooking } from '../actions/bookingActions'; // Include updateBooking action
import { useParams ,useNavigate} from 'react-router-dom';
import DatePicker from 'react-datepicker'; // Assuming you're using react-datepicker for date picker
import 'react-datepicker/dist/react-datepicker.css'; // Styles for react-datepicker

const BookingFormPage = ({ history }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook for navigation

  const { bookings, loading, error } = useSelector((state) => state.booking);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bookingType, setBookingType] = useState('Full day');
  const [bookingDate, setBookingDate] = useState(new Date());
  const [bookingSlot, setBookingSlot] = useState('Morning');
  const [bookingTime, setBookingTime] = useState('');

  useEffect(() => {
    if (id) {
      const booking = bookings.find((b) => b.id === id);
      if (booking) {
        setName(booking.name);
        setEmail(booking.email);
        setBookingType(booking.bookingType);
        setBookingDate(new Date(booking.bookingDate));
        setBookingSlot(booking.bookingSlot);
        setBookingTime(booking.bookingTime);
      }
    }
  }, [id, bookings]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookingData = { name, email, bookingType, bookingDate, bookingSlot, bookingTime };
    if (id) {
      dispatch(updateBooking(id, bookingData));
    } else {
      dispatch(createBooking(bookingData));
    }
    navigate('/bookings'); // Navigate to /bookings if token is present

  };

  return (
    <div>
      <h2>{id ? 'Edit Booking' : 'Create Booking'}</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="bookingType">Booking Type</label>
          <select
            id="bookingType"
            value={bookingType}
            onChange={(e) => setBookingType(e.target.value)}
            required
          >
            <option value="Full day">Full day</option>
            <option value="Half day">Half day</option>
          </select>
        </div>
        <div>
          <label htmlFor="bookingDate">Booking Date</label>
          <DatePicker
            id="bookingDate"
            selected={bookingDate}
            onChange={(date) => setBookingDate(date)}
            required
          />
        </div>
        <div>
          <label htmlFor="bookingSlot">Booking Slot</label>
          <select
            id="bookingSlot"
            value={bookingSlot}
            onChange={(e) => setBookingSlot(e.target.value)}
            required
          >
            <option value="Morning">Morning</option>
            <option value="Evening">Evening</option>
          </select>
        </div>
        <div>
          <label htmlFor="bookingTime">Booking Time</label>
          <input
            type="time"
            id="bookingTime"
            value={bookingTime}
            onChange={(e) => setBookingTime(e.target.value)}
            required
          />
        </div>
        <button type="submit">{id ? 'Update Booking' : 'Create Booking'}</button>

        </form>
    </div>
  );
};

export default BookingFormPage;
