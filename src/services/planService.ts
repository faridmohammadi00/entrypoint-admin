import api from './api';

export interface Plan {
  _id?: string;
  planName: string;
  buildingCredit: number;
  userCredit: number;
  monthlyVisits: number;
  price: number;
  status?: 'active' | 'inactive';
}

// Create a new plan
export const createPlan = async (data: Plan): Promise<Plan> => {
  const response = await api.post('/admin/plans', data);
  return response.data;
};

// Get all plans
export const getPlans = async (): Promise<Plan[]> => {
  const response = await api.get('/admin/plans');
  return response.data;
};

// Get a plan by ID
export const getPlanById = async (id: string): Promise<Plan> => {
  const response = await api.get(`/admin/plans/${id}`);
  return response.data;
};

// Update a plan
export const updatePlan = async (id: string, data: Plan): Promise<Plan> => {
  const response = await api.put(`/admin/plans/${id}`, data);
  return response.data;
};

// Delete a plan
export const deletePlan = async (id: string): Promise<void> => {
  await api.delete(`/admin/plans/${id}`);
};

// Activate a plan
export const activatePlan = async (id: string): Promise<void> => {
  await api.put(`/admin/plans/${id}/activate`);
};

// Inactivate a plan
export const inactivatePlan = async (id: string): Promise<void> => {
  await api.put(`/admin/plans/${id}/inactivate`);
};
