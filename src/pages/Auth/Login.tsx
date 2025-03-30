// src/pages/Login.tsx

import React, { useState } from 'react';
import { Box, Typography, Button, Checkbox, FormControlLabel, IconButton } from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material';
import { colors } from '../../styles/theme';
import Input from '../../components/common/Input';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { login } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../../utils/toast';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema, LoginFormData } from '../../validations/authSchemas';

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await dispatch(login(data));
      showToast.success('Login successful!');
      window.location.href = '/dashboard';
    } catch (error: any) {
      showToast.error(error.message || 'Login failed');
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

      {/* Right side with login form */}
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
            <img src="/assets/logo/logo-name-1344x476.png" alt="HalaDesk" style={{ height: '120px' }} />
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
              sx={{ mb: 2 }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                }
                sx={{ color: colors.text.dark }}
                label="Remember me"
              />
              <Button color="primary" sx={{ textTransform: 'none', color: colors.text.dark, fontWeight: 'bold' }}>
                Forgot Password?
              </Button>
            </Box>

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
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>

            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Typography variant="body2" sx={{ color: colors.text.secondary, mb: 1 }}>
                OR
              </Typography>
              <Button 
                onClick={() => navigate('/register')}
                sx={{ textTransform: 'none', color: colors.text.dark, fontWeight: 'bold' }}
              >
                Register
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
