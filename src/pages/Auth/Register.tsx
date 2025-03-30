import React, { useState } from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock, Person, Badge, Phone } from '@mui/icons-material';
import { colors } from '../../styles/theme';
import Input from '../../components/common/Input';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { register as registerUser } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../../utils/toast';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema, RegisterFormData } from '../../validations/authSchemas';

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await dispatch(registerUser(data));
      showToast.success('Registration successful!');
      navigate('/login');
    } catch (error: any) {
      showToast.error(error.message || 'Registration failed');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
      }}
    >
      {/* Left side with logo and background */}
      <Box
        sx={{
          width: '50%',
          background: colors.background.gradient.red,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
        }}
      >
        <img 
          src="/assets/logo/logo-1400x1053.png" 
          alt="HalaDesk" 
          style={{ 
            maxWidth: '80%',
            maxHeight: '80%',
            objectFit: 'contain',
          }} 
        />
      </Box>

      {/* Right side with registration form */}
      <Box
        sx={{
          width: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
          bgcolor: colors.background.default,
        }}
      >
        <Box sx={{ width: '100%', maxWidth: '440px' }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <img src="/assets/logo/logo-name-1344x476.png" alt="HalaDesk" style={{ height: '40px' }} />
          </Box>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="body1" sx={{ mb: 2, color: colors.text.dark, fontWeight: 'bold' }}>Email</Typography>
            <Input
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
              placeholder="you@gmail.com"
              startIcon={<Email sx={{ color: colors.text.secondary }} />}
              sx={{ mb: 3 }}
            />

            <Typography variant="body1" sx={{ mb: 2, color: colors.text.dark, fontWeight: 'bold' }}>Full Name</Typography>
            <Input
              {...register('fullname')}
              error={!!errors.fullname}
              placeholder="First Name / Last Name"
              startIcon={<Person sx={{ color: colors.text.secondary }} />}
              sx={{ mb: 3 }}
            />

            <Typography variant="body1" sx={{ mb: 2, color: colors.text.dark, fontWeight: 'bold' }}>Id Number</Typography>
            <Input
              {...register('idNumber')}
              error={!!errors.idNumber}
              helperText={errors.idNumber?.message}
              placeholder="Enter your ID Number"
              startIcon={<Badge sx={{ color: colors.text.secondary }} />}
              sx={{ mb: 3 }}
            />

            <Typography variant="body1" sx={{ mb: 2, color: colors.text.dark, fontWeight: 'bold' }}>Phone Number</Typography>
            <Input
              {...register('phone')}
              error={!!errors.phone}
              helperText={errors.phone?.message}
              placeholder="+971555555555"
              startIcon={<Phone sx={{ color: colors.text.secondary }} />}
              sx={{ mb: 3 }}
            />

            <Typography variant="body1" sx={{ mb: 2, color: colors.text.dark, fontWeight: 'bold' }}>Password</Typography>
            <Input
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              startIcon={<Lock sx={{ color: colors.text.secondary }} />}
              endIcon={
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              }
              sx={{ mb: 3 }}
            />

            <Typography variant="body1" sx={{ mb: 2, color: colors.text.dark, fontWeight: 'bold' }}>Confirm Password</Typography>
            <Input
              {...register('confirmPassword')}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              startIcon={<Lock sx={{ color: colors.text.secondary }} />}
              endIcon={
                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              }
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                bgcolor: colors.primary.main,
                py: 1.5,
                borderRadius: '10px',
                '&:hover': {
                  bgcolor: colors.primary.dark
                }
              }}
            >
              {loading ? 'Registering...' : 'Register'}
            </Button>

            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Typography variant="body2" sx={{ color: colors.text.secondary, mb: 1 }}>
                OR
              </Typography>
              <Button 
                fullWidth
                variant="outlined"
                startIcon={<img src="/assets/icons/google/svg/light/web_light_rd_na.svg" alt="Google" style={{ width: 24 }} />}
                sx={{ 
                  textTransform: 'none',
                  color: colors.text.primary,
                  borderColor: colors.border.main,
                  borderRadius: '10px',
                  '&:hover': {
                    borderColor: colors.border.dark,
                    bgcolor: colors.background.paper,
                  }
                }}
              >
                Register with Google
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
