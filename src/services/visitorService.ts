import api from './api';

export interface Visitor {
  _id: string;
  fullname: string;
  birthday: string;
  firstVisit: string;
  lastVisit: string;
  gender: string;
  region: string;
  status: string;
  id_number: string;
  expire_date: string;
  phone: string;
}

export interface VisitorCreatePayload {
  fullname: string;
  birthday: string;
  gender: string;
  region: string;
  id_number: string;
  expire_date: string;
  phone: string;
}

export interface VisitorUpdatePayload {
  fullname?: string;
  birthday?: string;
  gender?: string;
  region?: string;
  id_number?: string;
  expire_date?: string;
  phone?: string;
}

// Get all visitors (Admin only)
export const getAllVisitors = async (): Promise<Visitor[]> => {
  const response = await api.get('/admin/visitors');
  return response.data;
};

// Get a visitor by ID (Admin only)
export const getVisitorById = async (id: string): Promise<Visitor> => {
  const response = await api.get(`/admin/visitors/${id}`);
  return response.data;
};

// Create a visitor (Admin only)
export const createVisitor = async (data: VisitorCreatePayload): Promise<Visitor> => {
  const response = await api.post('/admin/visitors', data);
  return response.data;
};

// Update a visitor (Admin only)
export const updateVisitor = async (id: string, data: VisitorUpdatePayload): Promise<Visitor> => {
  const response = await api.put(`/admin/visitors/${id}`, data);
  return response.data;
};

// Delete a visitor (Admin only)
export const deleteVisitor = async (id: string): Promise<void> => {
  await api.delete(`/admin/visitors/${id}`);
};

// Activate a visitor (Admin only)
export const activateVisitor = async (id: string): Promise<Visitor> => {
  const response = await api.put(`/admin/visitors/${id}/activate`);
  return response.data;
};

// Inactivate a visitor (Admin only)
export const inactivateVisitor = async (id: string): Promise<Visitor> => {
  const response = await api.put(`/admin/visitors/${id}/inactivate`);
  return response.data;
};
