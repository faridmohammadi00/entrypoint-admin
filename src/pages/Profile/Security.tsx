import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  IconButton,
} from '@mui/material';
import { Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { colors, borderRadius } from '../../styles/theme';
import Input from '../../components/common/Input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { changePassword, ChangePasswordPayload } from '../../services/profileService';
import { showToast } from '../../utils/toast';


const schema = yup.object({
  currentPassword: yup.string().required('Current password is required'),
  newPassword: yup.string().required('New password is required'),
  confirmPassword: yup.string().required('Confirm password is required'),
});

const Security: React.FC = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ChangePasswordPayload>({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: ChangePasswordPayload) => {
    try {
      await changePassword(data);
      showToast.success('Password changed successfully');
      reset();
    } catch (error: any) {
      showToast.error(error.response.data.message);
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: colors.text.dark }} mb={1}>
              Current Password
            </Typography>
            <Input
              type={showCurrentPassword ? 'text' : 'password'}
              {...register('currentPassword')}
              error={!!errors.currentPassword}
              helperText={errors.currentPassword?.message}
              startIcon={<Lock sx={{ color: colors.text.secondary }} />}
              endIcon={
                <IconButton onClick={() => setShowCurrentPassword(!showCurrentPassword)} edge="end">
                  {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              }
              placeholder="Enter current password"
              border={`1px solid ${colors.border.main}`}
            />
          </Grid>
          <Grid item xs={12} md={6} />

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: colors.text.dark }} mb={1}>
              New Password
            </Typography>
            <Input
              type={showNewPassword ? 'text' : 'password'}
              {...register('newPassword')}
              error={!!errors.newPassword}
              helperText={errors.newPassword?.message}
              startIcon={<Lock sx={{ color: colors.text.secondary }} />}
              endIcon={
                <IconButton onClick={() => setShowNewPassword(!showNewPassword)} edge="end">
                  {showNewPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              }
              placeholder="Enter new password"
              border={`1px solid ${colors.border.main}`}
            />
          </Grid>
          <Grid item xs={12} md={6} />

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: colors.text.dark }} mb={1}>
              Confirm New Password
            </Typography>
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              {...register('confirmPassword')}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              startIcon={<Lock sx={{ color: colors.text.secondary }} />}
              endIcon={
                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              }
              placeholder="Confirm new password"
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
            Change Password
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Security; 