import React from 'react';
import {
  Box,
  Typography,
  Modal,
  Grid,
  IconButton,
  Chip,
} from '@mui/material';
import { 
  Close as CloseIcon,
  Person,
  Phone,
  LocationOn,
  Badge,
  Cake,
  CalendarMonth,
} from '@mui/icons-material';
import { colors } from '../../styles/theme';
import { Visitor } from '../../services/visitorService';
import { formatDate } from '../../utils/dateUtils';

interface ViewVisitorProps {
  open: boolean;
  onClose: () => void;
  visitor: Visitor | null;
}

const InfoItem: React.FC<{ label: string; value: string; icon: React.ReactNode }> = ({ 
  label, 
  value, 
  icon 
}) => (
  <Grid item xs={12} md={6}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
      {icon}
      <Typography variant="subtitle2" sx={{ color: colors.text.secondary }}>
        {label}
      </Typography>
    </Box>
    <Typography variant="body1" sx={{ color: colors.text.dark, ml: 4 }}>
      {value}
    </Typography>
  </Grid>
);

const ViewVisitor: React.FC<ViewVisitorProps> = ({ open, onClose, visitor }) => {
  if (!visitor) return null;

  return (
    <Modal open={open} onClose={onClose}>
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
          <Typography variant="h6" sx={{ color: colors.text.dark }}>Visitor Details</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Grid container spacing={3}>
          <InfoItem
            label="Full Name"
            value={visitor.fullname}
            icon={<Person sx={{ color: colors.text.secondary }} />}
          />
          <InfoItem
            label="ID Number"
            value={visitor.id_number}
            icon={<Badge sx={{ color: colors.text.secondary }} />}
          />
          <InfoItem
            label="Birthday"
            value={formatDate(visitor.birthday)}
            icon={<Cake sx={{ color: colors.text.secondary }} />}
          />
          <InfoItem
            label="Gender"
            value={visitor.gender}
            icon={<Person sx={{ color: colors.text.secondary }} />}
          />
          <InfoItem
            label="Region"
            value={visitor.region}
            icon={<LocationOn sx={{ color: colors.text.secondary }} />}
          />
          <InfoItem
            label="Phone"
            value={visitor.phone}
            icon={<Phone sx={{ color: colors.text.secondary }} />}
          />
          <InfoItem
            label="First Visit"
            value={formatDate(visitor.firstVisit)}
            icon={<CalendarMonth sx={{ color: colors.text.secondary }} />}
          />
          <InfoItem
            label="Last Visit"
            value={formatDate(visitor.lastVisit)}
            icon={<CalendarMonth sx={{ color: colors.text.secondary }} />}
          />
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <CalendarMonth sx={{ color: colors.text.secondary }} />
              <Typography variant="subtitle2" sx={{ color: colors.text.secondary }}>
                Status
              </Typography>
            </Box>
            <Box sx={{ ml: 4 }}>
              <Chip 
                label={visitor.status}
                size="small"
                sx={{ 
                  bgcolor: visitor.status === 'active' 
                    ? colors.status.success + '20'
                    : colors.status.error + '20',
                  color: visitor.status === 'active'
                    ? colors.status.success
                    : colors.status.error,
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default ViewVisitor; 