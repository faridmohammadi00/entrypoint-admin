import React from 'react';
import { Card, Typography, Box, Stack, Button } from '@mui/material';
import { colors } from '../../styles/theme';

interface Feature {
  name: string;
  included: boolean;
}

interface PricingCardProps {
  title: string;
  price: number;
  features: Feature[];
  isPopular?: boolean;
  onGetStarted?: () => void;
  onFreeTrial?: () => void;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  features,
  isPopular,
  onGetStarted,
  onFreeTrial,
}) => {
  return (
    <Card
      sx={{
        p: 4,
        width: '100%',
        maxWidth: 350,
        textAlign: 'center',
        borderRadius: 4,
        bgcolor: 'white',
        boxShadow: isPopular ? '0 8px 24px rgba(0,0,0,0.12)' : '0 4px 12px rgba(0,0,0,0.05)',
      }}
    >
      <Typography variant="h5" sx={{ mb: 1, fontWeight: 'bold' }}>
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Monthly
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography 
          component="span" 
          sx={{ 
            fontSize: '48px', 
            fontWeight: 'bold',
            color: colors.primary.main 
          }}
        >
          {price}
        </Typography>
        <Typography 
          component="span" 
          sx={{ 
            fontSize: '20px',
            color: colors.primary.main 
          }}
        >
          AED
        </Typography>
      </Box>

      <Stack spacing={2} sx={{ mb: 4 }}>
        {features.map((feature) => (
          <Typography
            key={feature.name}
            sx={{
              color: feature.included ? 'text.primary' : 'text.disabled',
            }}
          >
            {feature.name}
          </Typography>
        ))}
      </Stack>

      <Button
        variant={isPopular ? 'contained' : 'outlined'}
        onClick={onGetStarted}
        sx={{
          width: '100%',
          py: 1.5,
          mb: 2,
          borderRadius: '50px',
          bgcolor: isPopular ? colors.primary.main : 'transparent',
          borderColor: colors.primary.main,
          color: isPopular ? 'white' : colors.primary.main,
          '&:hover': {
            bgcolor: isPopular ? colors.primary.dark : 'rgba(234, 6, 6, 0.04)',
          },
        }}
      >
        Get Started
      </Button>

      <Typography
        variant="body2"
        onClick={onFreeTrial}
        sx={{
          textDecoration: 'underline',
          cursor: 'pointer',
          color: 'text.primary',
        }}
      >
        Start Your 15 Day Free Trial
      </Typography>
    </Card>
  );
};

export default PricingCard; 