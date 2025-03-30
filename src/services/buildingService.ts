import api from './api';

interface BuildingUser {
  _id: string;
  fullname: string;
  email: string;
}

export interface Building {
  _id: string;
  name: string;
  type: string;
  userId: BuildingUser;
  city: string;
  address: string;
  createdAt: string;
  status: string;
  latitude: number;
  longitude: number;
}

export interface BuildingCreatePayload {
  name: string;
  type: string;
  userId: string;
  city: string;
  address: string;
  latitude: number;
  longitude: number;
}

export interface BuildingUpdatePayload {
  name?: string;
  type?: string;
  userId?: string;
  city?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
}

// Get all buildings (admin)
export const getAllBuildings = async (): Promise<Building[]> => {
  const response = await api.get('/admin/buildings');
  return response.data;
};

// Get a building by ID (admin)
export const getBuildingById = async (id: string): Promise<Building> => {
  const response = await api.get(`/admin/buildings/${id}`);
  return response.data;
};

// Create a new building (admin)
export const createBuilding = async (data: BuildingCreatePayload): Promise<Building> => {
  const response = await api.post('/admin/buildings', data);
  return response.data;
};

// Update a building (admin)
export const updateBuilding = async (id: string, data: BuildingUpdatePayload): Promise<Building> => {
  const response = await api.put(`/admin/buildings/${id}`, data);
  return response.data;
};

// Delete a building (admin)
export const deleteBuilding = async (id: string): Promise<void> => {
  await api.delete(`/admin/buildings/${id}`);
};

// Activate a building (admin)
export const activateBuilding = async (id: string): Promise<Building> => {
  const response = await api.put(`/admin/buildings/${id}/activate`);
  return response.data;
};

// Inactivate a building (admin)
export const inactivateBuilding = async (id: string): Promise<Building> => {
  const response = await api.put(`/admin/buildings/${id}/inactivate`);
  return response.data;
};
