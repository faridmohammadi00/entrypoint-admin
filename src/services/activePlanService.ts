import api from './api';

export interface ActivePlan {
  id: string;
  userId: string;
  planId: string;
}

// Create an active plan
export const createActivePlan = async (data: { userId: string; planId: string }): Promise<ActivePlan> => {
  const response = await api.post('/api/activeplan/active-plans', data);
  return response.data;
};

// Get active plans for a user
export const getActivePlansByUser = async (userId: string): Promise<ActivePlan[]> => {
  const response = await api.get(`/api/activeplan/active-plans/${userId}`);
  return response.data;
};

// Cancel an active plan
export const cancelActivePlan = async (id: string, data: { userId: string; planId: string }): Promise<ActivePlan> => {
  const response = await api.put(`/api/activeplan/active-plans/${id}/cancel`, data);
  return response.data;
};
