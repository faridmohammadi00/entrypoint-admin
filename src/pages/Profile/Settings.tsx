import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Stack,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { colors } from '../../styles/theme';
import Select from '../../components/common/Select';
import { AccessTime } from '@mui/icons-material';

interface NotificationSettings {
  digitalCurrency: boolean;
  merchantOrder: boolean;
  recommendations: boolean;
}

const Settings: React.FC = () => {
  const [timeZone, setTimeZone] = useState('GMT-12:00');
  const [notifications, setNotifications] = useState<NotificationSettings>({
    digitalCurrency: true,
    merchantOrder: false,
    recommendations: true,
  });

  const timeZoneOptions = [
    { value: 'GMT-12:00', label: '(GMT-12:00) International Date Line West' },
    { value: 'GMT-11:00', label: '(GMT-11:00) Midway Island, Samoa' },
    { value: 'GMT-10:00', label: '(GMT-10:00) Hawaii' },
    // Add more time zones as needed
  ];

  const handleNotificationChange = (setting: keyof NotificationSettings) => {
    setNotifications(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 3, color: colors.text.dark }}>Time Zone</Typography>
      <Select
        value={timeZone}
        onChange={(e) => setTimeZone(e.target.value as string)}
        options={timeZoneOptions}
        startIcon={<AccessTime sx={{ color: colors.text.secondary }} />}
        border={`1px solid ${colors.border.main}`}
        placeholder="Select Time Zone"
        sx={{ mb: 4 }}
      />

      <Typography variant="h6" sx={{ mb: 3, color: colors.text.dark }}>Notification</Typography>
      <Stack spacing={2}>
        <FormControlLabel
          control={
            <Switch
              checked={notifications.digitalCurrency}
              onChange={() => handleNotificationChange('digitalCurrency')}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: colors.primary.main,
                  '&:hover': { backgroundColor: 'rgba(233, 12, 12, 0.08)' },
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: colors.primary.main,
                },
              }}
            />
          }
          label="I send or receive digita currency"
          sx={{ color: colors.text.primary }}
        />
        <FormControlLabel
          control={
            <Switch
              checked={notifications.merchantOrder}
              onChange={() => handleNotificationChange('merchantOrder')}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: colors.primary.main,
                  '&:hover': { backgroundColor: 'rgba(233, 12, 12, 0.08)' },
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: colors.primary.main,
                },
              }}
            />
          }
          label="I receive merchant order"
          sx={{ color: colors.text.primary }}
        />
        <FormControlLabel
          control={
            <Switch
              checked={notifications.recommendations}
              onChange={() => handleNotificationChange('recommendations')}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: colors.primary.main,
                  '&:hover': { backgroundColor: 'rgba(233, 12, 12, 0.08)' },
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: colors.primary.main,
                },
              }}
            />
          }
          label="There are recommendation for my account"
          sx={{ color: colors.text.primary }}
        />
      </Stack>

      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          sx={{
            bgcolor: colors.primary.main,
            color: 'white',
            px: 4,
            py: 1.5,
            borderRadius: '10px',
            '&:hover': { bgcolor: colors.primary.dark },
          }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default Settings; 