import React from 'react';
import {
  Box,
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import PowerOffIcon from '@mui/icons-material/PowerOff';
import { Plan, deletePlan, activatePlan, inactivatePlan } from '../../services/planService';
import { colors } from '../../styles/theme';

interface PlanTableProps {
  plans: Plan[];
  loading: boolean;
  onRefresh: () => void;
  onEdit: (planId: string) => void;
  onView: (planId: string) => void;
}

const PlanTable: React.FC<PlanTableProps> = ({ plans, onRefresh, onEdit, onView }) => {

  const handleView = (id: string) => {
    onView(id);
  };

  const handleEdit = (id: string) => {
    onEdit(id);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      try {
        await deletePlan(id);
        onRefresh();
      } catch (error) {
        console.error('Error deleting plan:', error);
      }
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: string | undefined) => {
    if (!id) return;
    try {
      if (currentStatus !== 'active') {
        await activatePlan(id);
      } else {
        await inactivatePlan(id);
      }
      onRefresh();
    } catch (error) {
      console.error('Error updating plan status:', error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Building Credit</TableCell>
            <TableCell>User Credit</TableCell>
            <TableCell>Monthly Visits</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {plans.map((plan) => (
            <TableRow key={plan._id}>
              <TableCell>{plan.planName}</TableCell>
              <TableCell>{plan.price}<small>AED</small></TableCell>
              <TableCell>{plan.buildingCredit}</TableCell>
              <TableCell>{plan.userCredit}</TableCell>
              <TableCell>{plan.monthlyVisits}</TableCell>
              <TableCell>
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
              </TableCell>  
              <TableCell align="right">
                <Box>
                  <Tooltip title="View">
                    <IconButton onClick={() => handleView(plan._id!)}>
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton onClick={() => handleEdit(plan._id!)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={plan.status === 'inactive' ? 'Activate' : 'Deactivate'}>
                    <IconButton 
                      onClick={() => handleToggleStatus(plan._id!, plan.status)}
                      color={plan.status === 'inactive' ? 'error' : 'success'}
                    >
                      {plan.status === 'inactive' ? <PowerSettingsNewIcon /> : <PowerOffIcon />}
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton onClick={() => handleDelete(plan._id!)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PlanTable; 