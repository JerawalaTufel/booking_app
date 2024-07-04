import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import authReducer from './reducers/authReducer';
import bookingReducer from './reducers/bookingReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth: authReducer,
  booking: bookingReducer,
});

// Initial state can be defined if needed
const initialState = {};

// Create store with root reducer, initial state, and middleware
const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk)
);

export default store;
