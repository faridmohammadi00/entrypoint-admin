import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Box,
  Tooltip,
} from '@mui/material';
import {
  CheckCircle as CompleteIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';
import { colors } from '../../styles/theme';
import { Visit, completeVisit, cancelVisit } from '../../services/visitService';
import { formatDate } from '../../utils/dateUtils';
import { showToast } from '../../utils/toast';

interface VisitTableProps {
  visits: Visit[];
  onSuccess?: () => void;
}

const VisitTable: React.FC<VisitTableProps> = ({ visits, onSuccess }) => {
  const handleStatusChange = async (visit: Visit, newStatus: 'completed' | 'cancelled') => {
    try {
      if (newStatus === 'completed') {
        await completeVisit(visit._id);
        showToast.success('Visit marked as completed');
      } else {
        await cancelVisit(visit._id);
        showToast.success('Visit cancelled');
      }
      onSuccess?.();
    } catch (error) {
      showToast.error('Failed to update visit status');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return colors.status.success;
      case 'cancelled':
        return colors.status.error;
      default:
        return colors.status.warning;
    }
  };

  return (
    <>
      <TableContainer 
        component={Paper} 
        sx={{ 
          boxShadow: 'none',
          height: 'calc(100vh - 280px)',
          overflowY: 'auto'
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Visitor</TableCell>
              <TableCell>Building</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visits.map((visit) => (
              <TableRow key={visit._id}>
                <TableCell>{visit._id}</TableCell>
                <TableCell>{visit.visitorId}</TableCell>
                <TableCell>{visit.buildingId}</TableCell>
                <TableCell>{formatDate(visit.date)}</TableCell>
                <TableCell>
                  <Chip 
                    label={visit.status}
                    size="small"
                    sx={{ 
                      bgcolor: getStatusColor(visit.status) + '20',
                      color: getStatusColor(visit.status),
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {visit.status === 'pending' && (
                      <>
                        <Tooltip title="Mark as Complete">
                          <IconButton 
                            size="small" 
                            onClick={() => handleStatusChange(visit, 'completed')}
                            sx={{ color: colors.status.success }}
                          >
                            <CompleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Cancel Visit">
                          <IconButton 
                            size="small" 
                            onClick={() => handleStatusChange(visit, 'cancelled')}
                            sx={{ color: colors.status.error }}
                          >
                            <CancelIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        mt: 2
      }}>
        <Box>
          Showing 1-10 of {visits.length}
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton size="small">
            {'<'}
          </IconButton>
          <IconButton size="small">
            {'>'}
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default VisitTable; 