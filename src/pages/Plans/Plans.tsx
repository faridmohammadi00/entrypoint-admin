import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Plan, getPlans } from '../../services/planService';
import PlanTable from './PlanTable';
import AddIcon from '@mui/icons-material/Add';
import { borderRadius, colors } from '../../styles/theme';
import NewPlan from './NewPlan';
import EditPlan from './EditPlan';
import ViewPlan from './ViewPlan';

const Plans: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [isNewPlanOpen, setIsNewPlanOpen] = useState(false);
  const [editPlanId, setEditPlanId] = useState<string | null>(null);
  const [viewPlanId, setViewPlanId] = useState<string | null>(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const data = await getPlans();
      setPlans(data);
    } catch (error) {
      console.error('Error fetching plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setIsNewPlanOpen(true);
  };

  const handleCloseNewPlan = () => {
    setIsNewPlanOpen(false);
  };

  const handleEditPlan = (planId: string) => {
    setEditPlanId(planId);
  };

  const handleCloseEditPlan = () => {
    setEditPlanId(null);
  };

  const handleViewPlan = (planId: string) => {
    setViewPlanId(planId);
  };

  const handleCloseViewPlan = () => {
    setViewPlanId(null);
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: colors.secondary.dark }}>Plans</Typography>
        <Button
          variant="contained"
          sx={{ backgroundColor: colors.primary.main, borderRadius: borderRadius.main, fontWeight: 'bold' }}
          startIcon={<AddIcon />}
          onClick={handleAddNew}
        >
          Add New Plan
        </Button>
      </Box>
      <PlanTable 
        plans={plans} 
        loading={loading} 
        onRefresh={fetchPlans}
        onEdit={handleEditPlan}
        onView={handleViewPlan}
      />
      <NewPlan 
        open={isNewPlanOpen} 
        onClose={handleCloseNewPlan} 
        onSuccess={fetchPlans}
      />
      <EditPlan
        open={!!editPlanId}
        planId={editPlanId}
        onClose={handleCloseEditPlan}
        onSuccess={fetchPlans}
      />
      <ViewPlan
        open={!!viewPlanId}
        planId={viewPlanId}
        onClose={handleCloseViewPlan}
        onEdit={(planId) => {
          handleCloseViewPlan();
          handleEditPlan(planId);
        }}
      />
    </Box>
  );
};

export default Plans;
