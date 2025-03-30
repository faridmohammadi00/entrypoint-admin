import api from './api';

export interface DoormanAssignment {
  userId: string;
  buildingId: string;
}

// Assign a doorman
export const assignDoorman = async (data: DoormanAssignment): Promise<any> => {
  const response = await api.post('/api/doorman/assign', data);
  return response.data;
};

// Remove a doorman
export const removeDoorman = async (): Promise<any> => {
  const response = await api.delete('/api/doorman/remove');
  return response.data;
};

// Get all doormen for a building
export const getDoormenByBuilding = async (buildingId: string): Promise<any> => {
  const response = await api.get(`/api/doorman/${buildingId}/doormen`);
  return response.data;
};

// Get a specific doorman by buildingId and userId
export const getDoormanByUser = async (buildingId: string, userId: string): Promise<any> => {
  const response = await api.get(`/api/doorman/${buildingId}/doorman/${userId}`);
  return response.data;
};
