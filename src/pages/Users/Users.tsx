import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
} from '@mui/material';
import {
  FilterList as FilterIcon,
  Add as AddIcon,
  KeyboardArrowDown as ArrowDownIcon,
} from '@mui/icons-material';
import { borderRadius, colors } from '../../styles/theme';
import NewUser from './NewUser';
import EditUser from './EditUser';
import UserTable from './UserTable';
import { getAllUsers, User } from '../../services/userService';
import { showToast } from '../../utils/toast';

const Users: React.FC = () => {
  const [date, setDate] = useState('');
  const [gender, setGender] = useState('');
  const [region, setRegion] = useState('');
  const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getAllUsers();
      setUsers(response);
    } catch (error) {
      showToast.error('Failed to fetch users');
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = (user: User) => {
    console.log('Selected user for edit:', user); // Debug log
    if (!user || !user._id) {
      showToast.error('Invalid user data');
      return;
    }
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleResetFilter = () => {
    setDate('');
    setGender('');
    setRegion('');
  };

  return (
    <Box>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3 
      }}>
        <ButtonGroup 
          variant="outlined" 
          sx={{ 
            '& .MuiButtonGroup-grouped': {
              borderColor: colors.border.main,
              '&:hover': {
                borderColor: colors.border.main,
              }
            },
            height: '40px',
          }}
        >
          <Button
            startIcon={<FilterIcon />}
            sx={{ 
              color: colors.text.secondary,
              bgcolor: colors.background.paper,
              borderRadius: borderRadius.main,
              fontWeight: 'bold',
              px: 2,
              '&:hover': {
                bgcolor: colors.background.paper,
              }
            }}
          >
            Filter By
          </Button>

          <Button
            endIcon={<ArrowDownIcon />}
            sx={{ 
              color: colors.text.secondary,
              bgcolor: colors.background.paper,
              fontWeight: 'bold',
              px: 2,
              '&:hover': {
                bgcolor: colors.background.paper,
              }
            }}
          >
            Date
          </Button>

          <Button
            endIcon={<ArrowDownIcon />}
            sx={{ 
              color: colors.text.secondary,
              bgcolor: colors.background.paper,
              px: 2,
              fontWeight: 'bold',
              '&:hover': {
                bgcolor: colors.background.paper,
              }
            }}
          >
            Gender
          </Button>

          <Button
            endIcon={<ArrowDownIcon />}
            sx={{ 
              color: colors.text.secondary,
              bgcolor: colors.background.paper,
              px: 2,
              fontWeight: 'bold',
              '&:hover': {
                bgcolor: colors.background.paper,
              }
            }}
          >
            Region
          </Button>

          <Button
            startIcon={<span style={{ color: colors.primary.main }}>↻</span>}
            onClick={handleResetFilter}
            sx={{ 
              color: colors.primary.main,
              bgcolor: colors.background.paper,
              borderRadius: borderRadius.main,
              fontWeight: 'bold',
              px: 2,
              '&:hover': {
                bgcolor: colors.background.paper,
              }
            }}
          >
            Reset Filter
          </Button>
        </ButtonGroup>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsNewUserModalOpen(true)}
          sx={{
            bgcolor: colors.primary.main,
            borderRadius: borderRadius.main,
            fontWeight: 'bold',
            '&:hover': { bgcolor: colors.primary.dark }
          }}
        >
          Add New User
        </Button>
      </Box>

      <UserTable 
        users={users} 
        onEdit={handleEditUser}
        onSuccess={fetchUsers}
      />
      
      <NewUser 
        open={isNewUserModalOpen} 
        onClose={() => setIsNewUserModalOpen(false)}
        onSuccess={fetchUsers}
      />

      <EditUser 
        open={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedUser(null); // Clear selected user when closing
        }}
        onSuccess={fetchUsers}
        user={selectedUser}
      />
    </Box>
  );
};

export default Users;
