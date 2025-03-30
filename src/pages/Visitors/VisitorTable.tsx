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
  Edit as EditIcon,
  RemoveRedEye as ViewIcon,
  CheckCircle as ActiveIcon,
  Block as InactiveIcon,
} from '@mui/icons-material';
import { colors } from '../../styles/theme';
import { activateVisitor, Visitor, inactivateVisitor } from '../../services/visitorService';
import { formatDate } from '../../utils/dateUtils';
import { showToast } from '../../utils/toast';

interface VisitorTableProps {
  visitors: Visitor[];
  onEdit: (visitor: Visitor) => void;
  onSuccess?: () => void;
}

const VisitorTable: React.FC<VisitorTableProps> = ({ visitors, onEdit, onView, onSuccess }) => {
  const handleStatusChange = async (visitor: Visitor) => {
    try {
      if (visitor.status === 'active') {
        await inactivateVisitor(visitor._id);
        showToast.success('Visitor inactivated successfully');
      } else {
        await activateVisitor(visitor._id);
        showToast.success('Visitor activated successfully');
      }
      onSuccess?.();
    } catch (error) {
      showToast.error('Failed to update visitor status');
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
              <TableCell>Full Name</TableCell>
              <TableCell>Birthday</TableCell>
              <TableCell>First Visit</TableCell>
              <TableCell>Last Visit</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Region</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visitors.map((visitor) => (
              <TableRow key={visitor._id}>
                <TableCell>{visitor._id}</TableCell>
                <TableCell>{visitor.fullname}</TableCell>
                <TableCell>{formatDate(visitor.birthday)}</TableCell>
                <TableCell>{formatDate(visitor.firstVisit)}</TableCell>
                <TableCell>{formatDate(visitor.lastVisit)}</TableCell>
                <TableCell>{visitor.gender}</TableCell>
                <TableCell>{visitor.region}</TableCell>
                <TableCell>
                  <Chip 
                    label={visitor.status}
                    size="small"
                    sx={{ 
                      bgcolor: visitor.status === 'active' 
                        ? colors.status.success + '20'
                        : colors.status.error + '20',
                      color: visitor.status === 'active'
                        ? colors.status.success
                        : colors.status.error,
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton size="small" onClick={() => onView(visitor)}>
                      <ViewIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => onEdit(visitor)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <Tooltip title={visitor.status === 'active' ? 'Inactivate' : 'Activate'}>
                      <IconButton 
                        size="small" 
                        onClick={() => handleStatusChange(visitor)}
                        sx={{ 
                          color: visitor.status === 'active' 
                            ? colors.status.error 
                            : colors.status.success 
                        }}
                      >
                        {visitor.status === 'active' 
                          ? <InactiveIcon fontSize="small" />
                          : <ActiveIcon fontSize="small" />
                        }
                      </IconButton>
                    </Tooltip>
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
          Showing 1-10 of 78
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

export default VisitorTable; 