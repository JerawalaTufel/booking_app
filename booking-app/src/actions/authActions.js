import axios from 'axios';

// Create an Axios instance with a default base URL
const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

export const login = (credentials) => async (dispatch) => {
  dispatch({ type: 'LOGIN_REQUEST' });
  try {
    const { data } = await apiClient.post('/login', credentials);
    dispatch({ type: 'LOGIN_SUCCESS', payload: data });
    
    localStorage.setItem('token', data.token);
  } catch (error) {
    console.log(error);
    dispatch({ type: 'LOGIN_FAILURE', payload: { error: error.response.statusText } });
  }
};

export const register = (userInfo) => async (dispatch) => {
  dispatch({ type: 'REGISTER_REQUEST' });
  try {
    const { data } = await apiClient.post('/register', userInfo);
    dispatch({ type: 'REGISTER_SUCCESS', payload: data });
    localStorage.setItem('token', data.token);
  } catch (error) {
    dispatch({ type: 'REGISTER_FAILURE', payload: { error: error.response.data.message } });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch({ type: 'LOGOUT' });
};
