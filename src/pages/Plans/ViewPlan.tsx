import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  Chip,
} from '@mui/material';
import { Plan, getPlanById } from '../../services/planService';
import EditIcon from '@mui/icons-material/Edit';
import { borderRadius } from '../../styles/theme';
import { colors } from '../../styles/theme';

interface ViewPlanProps {
  open: boolean;
  planId: string | null;
  onClose: () => void;
  onEdit: (planId: string) => void;
}

const ViewPlan: React.FC<ViewPlanProps> = ({ open, planId, onClose, onEdit }) => {
  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (planId) {
      fetchPlan();
    }
  }, [planId]);

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

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogContent>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
            <CircularProgress />
          </Box>
        ) : !plan ? (
          <Typography>Plan not found</Typography>
        ) : (
          <Card elevation={0}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {plan.planName}
              </Typography>
              <Typography variant="h6" color="primary" gutterBottom>
                {plan.price}<small>AED</small>
              </Typography>
              <Typography variant="h6" gutterBottom>
                Building Credit: {plan.buildingCredit}
              </Typography>
              <Typography variant="h6" gutterBottom>
                User Credit: {plan.userCredit}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Monthly Visits: {plan.monthlyVisits}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Status: {' '}
                <Chip 
                  label={plan.status}
                  size="small"
                  sx={{ 
                    bgcolor: plan.status === 'inactive' 
                      ? colors.status.error + '20'    
                      : colors.status.success + '20',
                    color: plan.status === 'inactive' 
                      ? colors.status.error
                      : colors.status.success,
                  }}
                />
              </Typography>
            </CardContent>
          </Card>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: colors.primary.main }}>Close</Button>
        {plan && (
          <Button
            variant="contained"
            sx={{ backgroundColor: colors.primary.main, borderRadius: borderRadius.main, fontWeight: 'bold' }}
            startIcon={<EditIcon />}
            onClick={() => onEdit(planId!)}
          >
            Edit Plan
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ViewPlan; 