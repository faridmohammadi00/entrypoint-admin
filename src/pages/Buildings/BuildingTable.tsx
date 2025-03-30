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
} from '@mui/material';
import {
  Edit as EditIcon,
  LocationOn,
  Delete as DeleteIcon,
  RemoveRedEye as ViewIcon,
} from '@mui/icons-material';
import { colors } from '../../styles/theme';
import { activateBuilding, Building, inactivateBuilding } from '../../services/buildingService';
import { formatDate } from '../../utils/dateUtils';
import { showToast } from '../../utils/toast';

interface BuildingTableProps {
  buildings: Building[];
  onView: (building: Building) => void;
  onEdit: (building: Building) => void;
  onSuccess?: () => void;
}

const BuildingTable: React.FC<BuildingTableProps> = ({ buildings, onView, onEdit, onSuccess }) => {
  const handleToggleStatus = async (building: Building) => {
    try {
      if (building.status === 'active') {
        await inactivateBuilding(building._id);
        showToast.success('Building inactivated successfully');
      } else {
        await activateBuilding(building._id);
        showToast.success('Building activated successfully');
      }
      onSuccess?.();
    } catch (error) {
      showToast.error('Failed to update building status');
    }
  };

  return (
    <>
      <TableContainer 
        component={Paper} 
        sx={{ 
          boxShadow: 'none',
          height: 'calc(100vh - 280px)',
          overflowY: 'auto',
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Building Name</TableCell>
              <TableCell>Manager</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {buildings.map((building) => (
              <TableRow key={building._id}>
                <TableCell>{building._id}</TableCell>
                <TableCell>{building.name}</TableCell>
                <TableCell>{building.userId?.fullname || 'N/A'}</TableCell>
                <TableCell>{building.address}</TableCell>
                <TableCell>{formatDate(building.createdAt)}</TableCell>
                <TableCell>
                  <Chip 
                    label={building.status}
                    size="small"
                    sx={{ 
                      bgcolor: building.status === 'active' 
                        ? colors.status.success + '20'
                        : colors.status.error + '20',
                      color: building.status === 'active'
                        ? colors.status.success
                        : colors.status.error,
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton size="small" onClick={() => onView(building)}>
                      <ViewIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small">
                      <LocationOn fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => onEdit(building)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      onClick={() => handleToggleStatus(building)}
                      sx={{ 
                        color: building.status === 'active' 
                          ? colors.status.error 
                          : colors.status.success 
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
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
        mt: 2,
        px: 2,
      }}>
        <div>Showing 1-10 of 78</div>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton size="small" disabled>
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

export default BuildingTable; 