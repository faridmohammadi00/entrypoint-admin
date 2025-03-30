import api from './api';

export interface Visit {
  _id: string;
  visitorId: string;
  buildingId: string;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface VisitCreatePayload {
  visitorId: string;
  buildingId: string;
  date: string;
}

export interface VisitUpdatePayload {
  visitorId?: string;
  buildingId?: string;
  date?: string;
}

// Get all visits (Admin only)
export const getAllVisits = async (): Promise<Visit[]> => {
  const response = await api.get('/admin/visits');
  return response.data;
};

// Get a visit by ID (Admin only)
export const getVisitById = async (id: string): Promise<Visit> => {
  const response = await api.get(`/admin/visits/${id}`);
  return response.data;
};

// Create a visit (Admin only)
export const createVisit = async (data: VisitCreatePayload): Promise<Visit> => {
  const response = await api.post('/admin/visits', data);
  return response.data;
};

// Update a visit (Admin only)
export const updateVisit = async (id: string, data: VisitUpdatePayload): Promise<Visit> => {
  const response = await api.put(`/admin/visits/${id}`, data);
  return response.data;
};

// Delete a visit (Admin only)
export const deleteVisit = async (id: string): Promise<void> => {
  await api.delete(`/admin/visits/${id}`);
};

// Complete a visit (Admin only)
export const completeVisit = async (id: string): Promise<Visit> => {
  const response = await api.put(`/admin/visits/${id}/complete`);
  return response.data;
};

// Cancel a visit (Admin only)
export const cancelVisit = async (id: string): Promise<Visit> => {
  const response = await api.put(`/admin/visits/${id}/cancel`);
  return response.data;
};
