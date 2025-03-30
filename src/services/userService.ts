import api from './api';

export interface User {
  _id: string;
  fullname: string;
  email: string;
  phone: string;
  idNumber: string;
  role: 'user' | 'doorman' | 'admin';
  status: 'active' | 'inactive';
}

export interface UserRegisterPayload {
  fullname: string;
  email: string;
  password: string;
  phone: string;
  idNumber: string;
}

export interface UserLoginPayload {
  email: string;
  password: string;
}

export interface UserUpdatePayload {
  fullname: string;
  email: string;
  phone: string;
  idNumber: string;
  role: 'user' | 'doorman' | 'admin';
  status: 'active' | 'inactive';
}

export interface CreateUserPayload {
  fullname: string;
  email: string;
  password: string;
  phone: string;
  idNumber: string;
  role: 'user' | 'doorman' | 'admin';
  status?: 'active' | 'inactive';
}

// Register a new user
export const registerUser = async (data: UserRegisterPayload): Promise<any> => {
  const response = await api.post('/api/user/register', data);
  return response.data;
};

// Login a user
export const loginUser = async (data: UserLoginPayload): Promise<any> => {
  const response = await api.post('/api/user/login', data);
  return response.data;
};

// Create a new user (admin only)
export const createUser = async (data: CreateUserPayload): Promise<User> => {
  const response = await api.post('/admin/users', data);
  return response.data;
};

// Get all users (admin only)
export const getAllUsers = async (): Promise<User[]> => {
  const response = await api.get('/admin/users');
  return response.data;
};

// Get user by ID (admin only)
export const getUserById = async (id: string): Promise<User> => {
  const response = await api.get(`/api/admin/users/${id}`);
  return response.data;
};

// Update user (admin only)
export const updateUser = async (id: string, data: UserUpdatePayload): Promise<User> => {
  console.log('updateUser called with:', { id, data });
  const response = await api.put(`/admin/users/${id}`, data);
  return response.data;
};

// Delete user (admin only)
export const deleteUser = async (id: string): Promise<void> => {
  await api.delete(`/api/admin/users/${id}`);
};

// Activate user (admin only)
export const activateUser = async (id: string): Promise<User> => {
  const response = await api.put(`/admin/users/${id}/activate`);
  return response.data;
};

// Inactivate user (admin only)
export const inactivateUser = async (id: string): Promise<User> => {
  const response = await api.put(`/admin/users/${id}/inactivate`);
  return response.data;
};
