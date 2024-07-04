import axios from 'axios';

// Create an Axios instance with a default base URL
const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

export const fetchBookings = () => async (dispatch) => { 
  const token  = localStorage.getItem('token');

  dispatch({ type: 'FETCH_BOOKINGS_REQUEST' });
  try { 
    const { data } = await apiClient.get('/bookings' , {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: 'FETCH_BOOKINGS_SUCCESS', payload: { bookings: data } });
  } catch (error) {
    dispatch({ type: 'FETCH_BOOKINGS_FAILURE', payload: { error: error.response.data.message } });
  }
};

  export const fetchBookingsOn = (id) => async (dispatch) => {  
    dispatch({ type: 'FETCH_BOOKINGS_REQUEST' });
    try {
      const { data } = await apiClient.get(`/bookings/${id}`);
      
      dispatch({ type: 'FETCH_BOOKINGS_SUCCESS', payload: { bookings: data } });
    } catch (error) {
      dispatch({ type: 'FETCH_BOOKINGS_FAILURE', payload: { error: error.response.data.message } });
    }
  };

export const createBooking = (booking) => async (dispatch, getState) => {
  dispatch({ type: 'CREATE_BOOKING_REQUEST' });
  try {
    const token  = localStorage.getItem('token');
    const { data } = await apiClient.post('/bookings', booking, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: 'CREATE_BOOKING_SUCCESS', payload: { booking: data } });
  } catch (error) {
    dispatch({ type: 'CREATE_BOOKING_FAILURE', payload: { error: error.response.data.message } });
  }
};

export const updateBooking = (id, booking) => async (dispatch, getState) => {
  dispatch({ type: 'UPDATE_BOOKING_REQUEST' });
  try {
    const token  = localStorage.getItem('token');
    
    const { data } = await apiClient.put(`/bookings/${id}`, booking, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: 'UPDATE_BOOKING_SUCCESS', payload: { booking: data } });
  } catch (error) {
    dispatch({ type: 'UPDATE_BOOKING_FAILURE', payload: { error: error.response.data.message } });
  }
};

export const deleteBooking = (id) => async (dispatch, getState) => {
  dispatch({ type: 'DELETE_BOOKING_REQUEST' });
  try {
    const { token } = getState().auth;
    await apiClient.delete(`/bookings/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: 'DELETE_BOOKING_SUCCESS', payload: { id } });
  } catch (error) {
    dispatch({ type: 'DELETE_BOOKING_FAILURE', payload: { error: error.response.data.message } });
  }
};
