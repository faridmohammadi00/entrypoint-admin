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
  Person as PersonIcon,
  CheckCircleOutline,
  Block as BlockIcon,
} from '@mui/icons-material';
import { colors } from '../../styles/theme';
import { User } from '../../services/userService';
import { activateUser, inactivateUser } from '../../services/userService';
import { showToast } from '../../utils/toast';

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onActivate?: (user: User) => void;
  onInactivate?: (user: User) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onSuccess }) => {
  const handleActivate = async (user: User) => {
    try {
      await activateUser(user._id);
      showToast.success('User activated successfully');
      onSuccess?.();
    } catch (error) {
      showToast.error('Failed to activate user');
    }
  };

  const handleInactivate = async (user: User) => {
    try {
      await inactivateUser(user._id);
      showToast.success('User inactivated successfully');
      onSuccess?.();
    } catch (error) {
      showToast.error('Failed to inactivate user');
    }
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>ID Number</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user._id}</TableCell>
                <TableCell>{user.fullname}</TableCell>
                <TableCell>
                  <Chip 
                    label={user.email}
                    size="small"
                    sx={{ 
                      bgcolor: colors.background.paper,
                      color: colors.text.secondary,
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Chip 
                    label={user.phone}
                    size="small"
                    sx={{ 
                      bgcolor: colors.background.paper,
                      color: colors.text.secondary,
                    }}
                  />
                </TableCell>
                <TableCell>{user.idNumber}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Chip 
                    label={user.status}
                    size="small"
                    sx={{ 
                      bgcolor: user.status === 'active' 
                        ? colors.status.success + '20'
                        : colors.status.error + '20',
                      color: user.status === 'active'
                        ? colors.status.success
                        : colors.status.error,
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton size="small" onClick={() => onEdit(user)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    {user.status === 'inactive' ? (
                      <IconButton 
                        size="small" 
                        onClick={() => handleActivate(user)}
                        sx={{ color: colors.status.success }}
                      >
                        <CheckCircleOutline fontSize="small" />
                      </IconButton>
                    ) : (
                      <IconButton 
                        size="small" 
                        onClick={() => handleInactivate(user)}
                        sx={{ color: colors.status.error }}
                      >
                        <BlockIcon fontSize="small" />
                      </IconButton>
                    )}
                    <IconButton size="small">
                      <PersonIcon fontSize="small" />
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

export default UserTable; 