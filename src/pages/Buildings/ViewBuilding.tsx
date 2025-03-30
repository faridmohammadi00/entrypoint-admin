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
  Business,
  LocationOn,
  Person,
} from '@mui/icons-material';
import { colors } from '../../styles/theme';
import { Building } from '../../services/buildingService';
import { formatDate } from '../../utils/dateUtils';
import Map from '../../components/common/Map';

interface ViewBuildingProps {
  open: boolean;
  onClose: () => void;
  building: Building | null;
}

const ViewBuilding: React.FC<ViewBuildingProps> = ({ open, onClose, building }) => {
  if (!building) return null;

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
          <Typography variant="h6" sx={{ color: colors.text.dark }}>Building Details</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" sx={{ color: colors.text.secondary }} mb={1}>
              Property Name
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Business sx={{ color: colors.text.secondary }} />
              <Typography variant="body1" sx={{ color: colors.text.dark }}>
                {building.name}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" sx={{ color: colors.text.secondary }} mb={1}>
              Property Type
            </Typography>
            <Typography variant="body1" sx={{ color: colors.text.dark, textTransform: 'capitalize' }}>
              {building.type}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" sx={{ color: colors.text.secondary }} mb={1}>
              Manager
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Person sx={{ color: colors.text.secondary }} />
              <Typography variant="body1" sx={{ color: colors.text.dark }}>
                {building.userId?.fullname}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" sx={{ color: colors.text.secondary }} mb={1}>
              Status
            </Typography>
            <Chip 
              label={building.status}
              size="small"
              sx={{ 
                bgcolor: building.status === 'active' 
                  ? colors.status.success + '20'
                  : colors.status.error + '20',
                color: building.status === 'active'
                  ? colors.status.success
                  : colors.status.error,
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" sx={{ color: colors.text.secondary }} mb={1}>
              City
            </Typography>
            <Typography variant="body1" sx={{ color: colors.text.dark, textTransform: 'capitalize' }}>
              {building.city}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" sx={{ color: colors.text.secondary }} mb={1}>
              Created At
            </Typography>
            <Typography variant="body1" sx={{ color: colors.text.dark }}>
              {formatDate(building.createdAt)}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2" sx={{ color: colors.text.secondary }} mb={1}>
              Address
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
              <LocationOn sx={{ color: colors.text.secondary }} />
              <Typography variant="body1" sx={{ color: colors.text.dark }}>
                {building.address}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2" sx={{ color: colors.text.secondary }} mb={1}>
              Location
            </Typography>
            <Box sx={{ height: 300 }}>
              <Map 
                position={[building.latitude, building.longitude]} 
                onPositionChange={() => {}} 
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default ViewBuilding; 