import React, { useState } from 'react';
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
  Lock, 
  Phone, 
  Badge,
  Visibility,
  VisibilityOff 
} from '@mui/icons-material';
import { colors } from '../../styles/theme';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createUser, CreateUserPayload } from '../../services/userService';
import { showToast } from '../../utils/toast';

interface NewUserProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const schema = yup.object({
  fullname: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  phone: yup.string().required('Phone number is required'),
  idNumber: yup.string().required('ID number is required'),
  role: yup.string().oneOf(['user', 'doorman', 'admin']).required('Role is required'),
});

const NewUser: React.FC<NewUserProps> = ({ open, onClose, onSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<CreateUserPayload>({
    resolver: yupResolver(schema)
  });

  const roleOptions = [
    { value: 'user', label: 'User' },
    { value: 'doorman', label: 'Doorman' },
    { value: 'admin', label: 'Admin' },
  ];

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedRole(value);
    setValue('role', value); // Update form value
  };

  const onSubmit = async (data: CreateUserPayload) => {
    try {
      setLoading(true);
      await createUser(data);
      showToast.success('User created successfully');
      reset();
      onSuccess?.();
      onClose();
    } catch (error: any) {
      showToast.error(error.message || 'Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="new-user-modal"
    >
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
          <Typography variant="h6" sx={{ color: colors.text.dark }}>Add New User</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
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
                Password
              </Typography>
              <Input
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
                type={showPassword ? 'text' : 'password'}
                startIcon={<Lock sx={{ color: colors.text.secondary }} />}
                endIcon={
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                }
                placeholder="Enter password"
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
                value={selectedRole}
                onChange={handleRoleChange}
                error={!!errors.role}
                helperText={errors.role?.message}
                options={roleOptions}
                placeholder="Select role"
                border={`1px solid ${colors.border.main}`}
              />
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
                borderRadius: '10px',
                '&:hover': { bgcolor: colors.primary.dark },
              }}
            >
              {loading ? 'Creating...' : 'Add User'}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default NewUser;
