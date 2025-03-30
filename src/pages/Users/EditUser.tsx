import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Modal,
  Grid,
  IconButton,
} from '@mui/material';
import { 
  Close as CloseIcon, 
  Person, 
  Email, 
  Phone, 
  Badge,
} from '@mui/icons-material';
import { borderRadius, colors } from '../../styles/theme';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { updateUser, User, UserUpdatePayload } from '../../services/userService';
import { showToast } from '../../utils/toast';

interface EditUserProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  user: User | null;
}

const schema = yup.object({
  fullname: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  idNumber: yup.string().required('ID number is required'),
  role: yup.string().oneOf(['user', 'doorman', 'admin']).required('Role is required'),
  status: yup.string().oneOf(['active', 'inactive']).required('Status is required'),
});

const EditUser: React.FC<EditUserProps> = ({ open, onClose, onSuccess, user }) => {
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState(user?.role || '');
  const [selectedStatus, setSelectedStatus] = useState(user?.status || '');

  console.log('EditUser received user:', user); // Debug log

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<UserUpdatePayload>({
    resolver: yupResolver(schema),
    defaultValues: user ? {
      fullname: user.fullname,
      email: user.email,
      phone: user.phone,
      idNumber: user.idNumber,
      role: user.role,
      status: user.status,
    } : undefined
  });

  // Reset form when user changes
  useEffect(() => {
    if (user) {
      console.log('Resetting form with user data:', user);
      reset({
        fullname: user.fullname,
        email: user.email,
        phone: user.phone,
        idNumber: user.idNumber,
        role: user.role,
        status: user.status,
      });
      setSelectedRole(user.role);
      setSelectedStatus(user.status);
    }
  }, [user, reset]);

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedRole(value);
    setValue('role', value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedStatus(value);
    setValue('status', value);
  };

  const onSubmit = async (data: UserUpdatePayload) => {
    console.log('Form submitted with data:', data);
    console.log('Current user:', user);

    if (!user?._id) {
      console.error('Missing user ID. User object:', user);
      showToast.error('User ID is missing');
      return;
    }

    try {
      setLoading(true);
      const updateData = {
        fullname: data.fullname,
        email: data.email,
        phone: data.phone,
        idNumber: data.idNumber,
        role: selectedRole,
        status: selectedStatus,
      };

      console.log('Sending update request:', {
        userId: user._id,
        updateData
      });

      await updateUser(user._id, updateData);
      showToast.success('User updated successfully');
      onSuccess?.();
      onClose();
    } catch (error: any) {
      console.error('Update failed:', error);
      showToast.error(error?.response?.data?.message || 'Failed to update user');
    } finally {
      setLoading(false);
    }
  };

  // Don't render if no user is provided
  if (!user || !user._id) {
    console.log('No valid user provided to EditUser');
    return null;
  }

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="edit-user-modal">
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: 800,
        bgcolor: 'background.paper',
        borderRadius: '10px',
        p: 4,
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ color: colors.text.dark }}>Edit User</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: colors.text.dark }} mb={1}>
                Full Name
              </Typography>
              <Input
                {...register('fullname')}
                error={!!errors.fullname}
                helperText={errors.fullname?.message}
                startIcon={<Person sx={{ color: colors.text.secondary }} />}
                placeholder="Enter full name"
                border={`1px solid ${colors.border.main}`}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: colors.text.dark }} mb={1}>
                Email
              </Typography>
              <Input
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
                startIcon={<Email sx={{ color: colors.text.secondary }} />}
                placeholder="Enter email"
                border={`1px solid ${colors.border.main}`}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: colors.text.dark }} mb={1}>
                Phone
              </Typography>
              <Input
                {...register('phone')}
                error={!!errors.phone}
                helperText={errors.phone?.message}
                startIcon={<Phone sx={{ color: colors.text.secondary }} />}
                placeholder="Enter phone number"
                border={`1px solid ${colors.border.main}`}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: colors.text.dark }} mb={1}>
                ID Number
              </Typography>
              <Input
                {...register('idNumber')}
                defaultValue={user?.idNumber}
                error={!!errors.idNumber}
                helperText={errors.idNumber?.message}
                startIcon={<Badge sx={{ color: colors.text.secondary }} />}
                placeholder="Enter ID number"
                border={`1px solid ${colors.border.main}`}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: colors.text.dark }} mb={1}>
                Role
              </Typography>
              <Select
                name="role"
                value={selectedRole}
                onChange={handleRoleChange}
                error={!!errors.role}
                options={[
                  { value: 'user', label: 'User' },
                  { value: 'doorman', label: 'Doorman' },
                  { value: 'admin', label: 'Admin' },
                ]}
                placeholder="Select role"
                border={`1px solid ${colors.border.main}`}
              />
              {errors.role && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
                  {errors.role.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: colors.text.dark }} mb={1}>
                Status
              </Typography>
              <Select
                name="status"
                value={selectedStatus}
                onChange={handleStatusChange}
                error={!!errors.status}
                options={[
                  { value: 'active', label: 'Active' },
                  { value: 'inactive', label: 'Inactive' },
                ]}
                placeholder="Select status"
                border={`1px solid ${colors.border.main}`}
              />
              {errors.status && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
                  {errors.status.message}
                </Typography>
              )}
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button
              onClick={onClose}
              disabled={loading}
              sx={{
                color: colors.text.secondary,
                '&:hover': { bgcolor: 'transparent' },
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                bgcolor: colors.primary.main,
                color: 'white',
                px: 4,
                py: 1.5,
                borderRadius: borderRadius.main,
                '&:hover': { bgcolor: colors.primary.dark },
              }}
            >
              {loading ? 'Updating...' : 'Update User'}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default EditUser; 