import api from './api';
import { 
  loginStart, loginSuccess, loginFailure,
  registerStart, registerSuccess, registerFailure 
} from '../features/auth/authSlice';
import type { AppDispatch } from '../app/store';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  fullName: string;
  idNumber: string;
  phone: string;
  password: string;
}

export const login = (credentials: LoginCredentials) => async (dispatch: AppDispatch) => {
  try {
    dispatch(loginStart());
    const response = await api.post('/user/login', credentials);
    dispatch(loginSuccess(response.data));
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Authentication failed';
    dispatch(loginFailure(errorMessage));
    throw new Error(errorMessage);
  }
};

export const register = (data: RegisterData) => async (dispatch: AppDispatch) => {
  try {
    dispatch(registerStart());
    const response = await api.post('/user/register', data);
    dispatch(registerSuccess());
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Registration failed';
    dispatch(registerFailure(errorMessage));
    throw new Error(errorMessage);
  }
};

export const checkAuth = () => async (dispatch: AppDispatch) => {
  try {
    const response = await api.get('/auth/me');
    dispatch(loginSuccess(response.data));
    return response.data;
  } catch (error) {
    dispatch(loginFailure('Session expired'));
    throw error;
  }
}; 