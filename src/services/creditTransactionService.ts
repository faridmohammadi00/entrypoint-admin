import api from './api';

export interface CreditTransaction {
  id?: string;
  userId: string;
  amount: number;
  type: string;
}

// Create a credit transaction
export const createCreditTransaction = async (data: CreditTransaction): Promise<CreditTransaction> => {
  const response = await api.post('/api/credittransaction/credit-transactions', data);
  return response.data;
};

// Get all credit transactions
export const getCreditTransactions = async (): Promise<CreditTransaction[]> => {
  const response = await api.get('/api/credittransaction/credit-transactions');
  return response.data;
};

// Get a credit transaction by ID
export const getCreditTransactionById = async (id: string): Promise<CreditTransaction> => {
  const response = await api.get(`/api/credittransaction/credit-transactions/${id}`);
  return response.data;
};

// Delete a credit transaction
export const deleteCreditTransaction = async (id: string): Promise<void> => {
  await api.delete(`/api/credittransaction/credit-transactions/${id}`);
};

// Restore a credit transaction
export const restoreCreditTransaction = async (id: string, data: CreditTransaction): Promise<CreditTransaction> => {
  const response = await api.put(`/api/credittransaction/credit-transactions/${id}/restore`, data);
  return response.data;
};
