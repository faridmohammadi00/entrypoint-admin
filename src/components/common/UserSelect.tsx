import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, Box, Typography } from '@mui/material';
import { getAllUsers, User } from '../../services/userService';
import { Person } from '@mui/icons-material';
import { borderRadius, colors } from '../../styles/theme';

interface UserSelectProps {
  value: string;
  onChange: (userId: string) => void;
  error?: boolean;
  helperText?: string;
}

const UserSelect: React.FC<UserSelectProps> = ({ value, onChange, error, helperText }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getAllUsers();
      setUsers(response);
      if (value) {
        const user = response.find(u => u._id === value);
        setSelectedUser(user || null);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Autocomplete
      value={selectedUser}
      onChange={(_, newValue) => {
        setSelectedUser(newValue);
        onChange(newValue?._id || '');
      }}
      options={users}
      getOptionLabel={(option) => `${option.fullname} (${option.email})`}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          error={error}
          helperText={helperText}
          placeholder="Select Manager"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: borderRadius.main,
              backgroundColor: colors.background.paper,
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none'
              }
            }
          }}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <Person sx={{ color: colors.text.secondary, mr: 1 }} />
            ),
          }}
        />
      )}
      renderOption={(props, option) => (
        <Box 
          component="li" 
          {...props} 
          sx={{ 
            borderBottom: 'none',
            '&:hover': {
              backgroundColor: colors.background.paper
            }
          }}
        >
          <Box>
            <Typography variant="body1">{option.fullname}</Typography>
            <Typography variant="caption" color="textSecondary">
              {option.email} • {option.phone}
            </Typography>
          </Box>
        </Box>
      )}
      sx={{
        '& .MuiAutocomplete-listbox': {
          '& .MuiAutocomplete-option': {
            border: 'none',
            '&:hover': {
              backgroundColor: colors.background.paper
            }
          }
        }
      }}
    />
  );
};

export default UserSelect; 