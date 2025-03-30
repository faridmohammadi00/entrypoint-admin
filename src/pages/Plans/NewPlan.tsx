import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Plan , createPlan } from '../../services/planService';
import Input from '../../components/common/Input';
import { borderRadius, colors } from '../../styles/theme';

interface NewPlanProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const NewPlan: React.FC<NewPlanProps> = ({ open, onClose, onSuccess }) => {
  const [plan, setPlan] = useState<Plan>({
    planName: '',
    buildingCredit: 0,
    userCredit: 0,
    price: 0,
    status: 'active',
    monthlyVisits: 0,
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await createPlan(plan);
      onSuccess();
      onClose();
      // Reset form
      setPlan({ planName: '', buildingCredit: 0, userCredit: 0, price: 0, status: 'active', monthlyVisits: 0 });
    } catch (error) {
      console.error('Error creating plan:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth sx={{ borderRadius: borderRadius.main }}>
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ fontWeight: 'bold' }}>New Plan</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={3} py={2}>
            <Input
              label="Plan Name"
              value={plan.planName}
              onChange={(e) => setPlan({ ...plan, planName: e.target.value })}
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
            <Input
              label="Monthly Visits"
              type="number"
              value={plan.monthlyVisits}
              onChange={(e) => setPlan({ ...plan, monthlyVisits: parseFloat(e.target.value) })}
              required
            />
            <Input
              label="Price"
              type="number"
              value={plan.price}
              onChange={(e) => setPlan({ ...plan, price: parseFloat(e.target.value) })}
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} sx={{ color: colors.primary.main }}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: colors.primary.main, borderRadius: borderRadius.main, fontWeight: 'bold' }}
            disabled={saving}
          >
            {saving ? 'Creating...' : 'Create Plan'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default NewPlan; 