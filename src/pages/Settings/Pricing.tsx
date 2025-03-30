import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import PricingCard from '../../components/pricing/PricingCard';
import { colors } from '../../styles/theme';

const pricingPlans = [
  {
    title: 'Basic',
    price: 149,
    features: [
      { name: '1 Building', included: true },
      { name: '3 Doormans', included: true },
      { name: '3000 Monthly Visits', included: true },
      { name: 'Analytics Report', included: false },
      { name: 'Public API Access', included: false },
      { name: 'Plugins Integration', included: false },
    ],
  },
  {
    title: 'Popular',
    price: 449,
    isPopular: true,
    features: [
      { name: '3 Buildings', included: true },
      { name: '9 Doormans', included: true },
      { name: '10,000 Monthly Visits', included: true },
      { name: 'Analytics Report', included: true },
      { name: 'Public API Access', included: false },
      { name: 'Plugins Integration', included: false },
    ],
  },
  {
    title: 'Pro Plan',
    price: 849,
    features: [
      { name: '10 Building', included: true },
      { name: '30 Doormans', included: true },
      { name: '50,000 Monthly Visits', included: true },
      { name: 'Analytics Report', included: true },
      { name: 'Public API Access', included: true },
      { name: 'Plugins Integration', included: true },
    ],
  },
];

const Pricing: React.FC = () => {
  const handleGetStarted = (planTitle: string) => {
    console.log(`Get Started clicked for ${planTitle}`);
    // Add your logic here
  };

  const handleFreeTrial = (planTitle: string) => {
    console.log(`Free Trial clicked for ${planTitle}`);
    // Add your logic here
  };

  return (
    <Box p={3} sx={{ overflowX: 'hidden' }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: colors.text.dark }}>Plan & Pricing</Typography>
      
      <Stack direction="row" spacing={3} justifyContent="center">
        {pricingPlans.map((plan) => (
          <PricingCard
            key={plan.title}
            {...plan}
            onGetStarted={() => handleGetStarted(plan.title)}
            onFreeTrial={() => handleFreeTrial(plan.title)}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default Pricing;
