import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Stack,
  Avatar,
  IconButton,
  Grid,
} from '@mui/material';
import {
  Edit as EditIcon,
  Person,
  Badge,
  Email,
  Phone,
  LocationOn,
  LocationCity,
} from '@mui/icons-material';
import { borderRadius, colors } from '../../styles/theme';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Settings from './Settings';
import Security from './Security';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  getProfile,
  updateProfile,
  Profile as ProfileType,
  ProfileUpdatePayload,
} from '../../services/profileService';
import { showToast } from '../../utils/toast';

// Define Yup schema for validation
const schema = yup.object({
  fullname: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  idNumber: yup.string().required('ID number is required'),
  city: yup.string().required('City is required'),
  address: yup.string().required('Address is required'),
});

// Define the form's data shape
interface ProfileData {
  fullname: string;
  idNumber: string;
  email: string;
  city: string;
  phone: string;
  address: string;
}

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'settings' | 'security'>('profile');

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ProfileData>({
    resolver: yupResolver(schema),
    defaultValues: {
      fullname: '',
      idNumber: '',
      email: '',
      city: '',
      phone: '',
      address: '',
    },
  });

  // Fetch profile data on mount
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const profile: ProfileType = await getProfile();
      reset({
        fullname: profile.fullname,
        idNumber: profile.idNumber,
        email: profile.email,
        city: profile.city || '',
        phone: profile.phone,
        address: profile.address || '',
      });
    } catch (error) {
      showToast.error('Failed to fetch profile');
    }
  };

  const onSubmit = async (data: ProfileUpdatePayload) => {
    try {
      const response = await updateProfile(data);
      showToast.success('Profile updated successfully');
      await fetchProfile(); // Refresh profile data after update
    } catch (error) {
      console.error('Update error:', error);
      showToast.error('Failed to update profile');
    }
  };

  const cityOptions = [
    { value: 'Dubai', label: 'Dubai' },
    { value: 'Abu Dhabi', label: 'Abu Dhabi' },
    { value: 'Sharjah', label: 'Sharjah' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'settings':
        return <Settings />;
      case 'security':
        return <Security />;
      default:
        return (
          <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-start' }}>
            {/* Profile Image with Edit Button */}
            <Box sx={{ position: 'relative' }}>
              <Avatar
                src="/path-to-profile-image.jpg"
                sx={{
                  width: 120,
                  height: 120,
                  border: `4px solid ${colors.background.paper}`,
                }}
              />
              <IconButton
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  bgcolor: colors.primary.main,
                  color: 'white',
                  '&:hover': { bgcolor: colors.primary.dark },
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Box>

            {/* Form */}
            <Box sx={{ flexGrow: 1 }}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 'bold', color: colors.text.dark }}
                      mb={1}
                    >
                      Your Name
                    </Typography>
                    <Input
                      {...register('fullname')}
                      error={!!errors.fullname}
                      helperText={errors.fullname?.message}
                      startIcon={<Person sx={{ color: colors.text.secondary }} />}
                      placeholder="Enter your full name"
                      border={`1px solid ${colors.border.main}`}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 'bold', color: colors.text.dark }}
                      mb={1}
                    >
                      ID Number
                    </Typography>
                    <Input
                      {...register('idNumber')}
                      error={!!errors.idNumber}
                      helperText={errors.idNumber?.message}
                      startIcon={<Badge sx={{ color: colors.text.secondary }} />}
                      placeholder="Enter your ID number"
                      border={`1px solid ${colors.border.main}`}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 'bold', color: colors.text.dark }}
                      mb={1}
                    >
                      Email
                    </Typography>
                    <Input
                      {...register('email')}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      startIcon={<Email sx={{ color: colors.text.secondary }} />}
                      placeholder="Enter your email"
                      border={`1px solid ${colors.border.main}`}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 'bold', color: colors.text.dark }}
                      mb={1}
                    >
                      City
                    </Typography>
                    <Controller
                      name="city"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={cityOptions}
                          startIcon={<LocationCity sx={{ color: colors.text.secondary }} />}
                          border={`1px solid ${colors.border.main}`}
                        />
                      )}
                    />
                    {errors.city && (
                      <Typography variant="caption" color="error">
                        {errors.city.message}
                      </Typography>
                    )}
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 'bold', color: colors.text.dark }}
                      mb={1}
                    >
                      Phone Number
                    </Typography>
                    <Input
                      {...register('phone')}
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                      startIcon={<Phone sx={{ color: colors.text.secondary }} />}
                      placeholder="Enter your phone number"
                      border={`1px solid ${colors.border.main}`}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 'bold', color: colors.text.dark }}
                      mb={1}
                    >
                      Address
                    </Typography>
                    <Input
                      {...register('address')}
                      error={!!errors.address}
                      helperText={errors.address?.message}
                      startIcon={<LocationOn sx={{ color: colors.text.secondary }} />}
                      placeholder="Enter your address"
                      border={`1px solid ${colors.border.main}`}
                    />
                  </Grid>
                </Grid>

                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      bgcolor: colors.primary.main,
                      color: 'white',
                      px: 4,
                      py: 1.5,
                      borderRadius: borderRadius.main,
                      '&:hover': { bgcolor: colors.primary.dark },
                    }}
                  >
                    Save
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        );
    }
  };

  return (
    <Box p={3}>
      <Stack direction="row" spacing={2} mb={4}>
        <Button
          variant={activeTab === 'profile' ? 'contained' : 'text'}
          onClick={() => setActiveTab('profile')}
          sx={
            activeTab === 'profile'
              ? {
                  bgcolor: colors.primary.main,
                  color: 'white',
                  fontWeight: 'bold',
                  '&:hover': { bgcolor: colors.primary.dark },
                  borderRadius: borderRadius.top,
                }
              : { color: colors.text.secondary }
          }
        >
          Edit Profile
        </Button>
        <Button
          variant={activeTab === 'settings' ? 'contained' : 'text'}
          onClick={() => setActiveTab('settings')}
          sx={
            activeTab === 'settings'
              ? {
                  bgcolor: colors.primary.main,
                  color: 'white',
                  fontWeight: 'bold',
                  '&:hover': { bgcolor: colors.primary.dark },
                  borderRadius: borderRadius.top,
                }
              : { color: colors.text.secondary }
          }
        >
          Settings
        </Button>
        <Button
          variant={activeTab === 'security' ? 'contained' : 'text'}
          onClick={() => setActiveTab('security')}
          sx={
            activeTab === 'security'
              ? {
                  bgcolor: colors.primary.main,
                  color: 'white',
                  fontWeight: 'bold',
                  '&:hover': { bgcolor: colors.primary.dark },
                  borderRadius: borderRadius.top,
                }
              : { color: colors.text.secondary }
          }
        >
          Password & Security
        </Button>
      </Stack>
      {renderContent()}
    </Box>
  );
};

export default Profile;
