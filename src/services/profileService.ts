import api from './api';

export interface Profile {
  _id: string;
  fullname: string;
  email: string;
  phone: string;
  idNumber: string;
  phoneConfirmed: boolean;
  emailConfirmed: boolean;
  date: string;
  city: string;
  address: string;
  status: 'active' | 'inactive';
  role: 'user' | 'doorman' | 'admin';
}

export interface ProfileUpdatePayload {
  fullname?: string;
  email?: string;
  phone?: string;
  idNumber?: string;
  city?: string;
  address?: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Get user profile
export const getProfile = async (): Promise<Profile> => {
  const response = await api.get('/profile');
  return response.data;
};

// Update user profile
export const updateProfile = async (data: ProfileUpdatePayload): Promise<Profile> => {
  const response = await api.put('/profile', data);
  return response.data;
};

// Change password
export const changePassword = async (data: ChangePasswordPayload): Promise<void> => {
  await api.put('/profile/change-password', data);
}; 