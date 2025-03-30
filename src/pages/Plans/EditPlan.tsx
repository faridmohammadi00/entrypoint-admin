import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from '@mui/material';
import { Plan, getPlanById, updatePlan } from '../../services/planService';
import Input from '../../components/common/Input';
import { borderRadius, colors } from '../../styles/theme';

interface EditPlanModalProps {
  open: boolean;
  planId: string | null;
  onClose: () => void;
  onSuccess: () => void;
}

const EditPlanModal: React.FC<EditPlanModalProps> = ({ open, planId, onClose, onSuccess }) => {
  const [plan, setPlan] = useState<Plan>({
    planName: '',
    price: 0,
    monthlyVisits: 0,
    buildingCredit: 0,
    userCredit: 0,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open && planId) {
      fetchPlan();
    }
  }, [open, planId]);

  const fetchPlan = async () => {
    try {
      const data = await getPlanById(planId!);
      setPlan(data);
    } catch (error) {
      console.error('Error fetching plan:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updatePlan(planId!, plan);
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error updating plan:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Plan</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {loading ? (
            <Box display="flex" justifyContent="center" p={3}>
              <CircularProgress />
            </Box>
          ) : (
            <Box display="flex" flexDirection="column" gap={3}>
              <Input
                label="Name"
                value={plan.planName}
                onChange={(e) => setPlan({ ...plan, planName: e.target.value })}
                required
              />
              <Input
                label="Price"
                type="number"
                value={plan.price}
                onChange={(e) => setPlan({ ...plan, price: parseFloat(e.target.value) })}
                required
              />
              <Input
                label="Monthly Visits"
                type="number"
                value={plan.monthlyVisits}
                onChange={(e) => setPlan({ ...plan, monthlyVisits: parseFloat(e.target.value) })}
                required
              />
              <Input
                label="Building Credit"
                type="number"
                value={plan.buildingCredit}
                onChange={(e) => setPlan({ ...plan, buildingCredit: parseFloat(e.target.value) })}
                required
              />
              <Input
                label="User Credit"
                type="number"
                value={plan.userCredit}
                onChange={(e) => setPlan({ ...plan, userCredit: parseFloat(e.target.value) })}
                required
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} sx={{ color: colors.primary.main }}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: colors.primary.main, borderRadius: borderRadius.main, fontWeight: 'bold' }}
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditPlanModal; 