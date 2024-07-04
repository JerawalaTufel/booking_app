const initialState = {
    bookings: [],
    loading: false,
    error: null,
  };
  
  const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_BOOKINGS_REQUEST':
      case 'CREATE_BOOKING_REQUEST':
      case 'UPDATE_BOOKING_REQUEST':
      case 'DELETE_BOOKING_REQUEST':
        return { ...state, loading: true, error: null };
      case 'FETCH_BOOKINGS_SUCCESS':
        return { ...state, loading: false, bookings: action.payload.bookings };
      case 'CREATE_BOOKING_SUCCESS':
        return { ...state, loading: false, bookings: [...state.bookings, action.payload.booking] };
      case 'UPDATE_BOOKING_SUCCESS':
        return {
          ...state,
          loading: false,
          bookings: state.bookings.map((booking) =>
            booking.id === action.payload.booking.id ? action.payload.booking : booking
          ),
        };
      case 'DELETE_BOOKING_SUCCESS':
        return {
          ...state,
          loading: false,
          bookings: state.bookings.filter((booking) => booking.id !== action.payload.id),
        };
      case 'FETCH_BOOKINGS_FAILURE':
      case 'CREATE_BOOKING_FAILURE':
      case 'UPDATE_BOOKING_FAILURE':
      case 'DELETE_BOOKING_FAILURE':
        return { ...state, loading: false, error: action.payload.error };
      default:
        return state;
    }
  };
  
  export default bookingReducer;
  