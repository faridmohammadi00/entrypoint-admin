import React, { useState, useEffect } from 'react';
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
  Business,
  Email,
  Phone,
  LocationOn,
  Person,
} from '@mui/icons-material';
import { colors } from '../../styles/theme';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import UserSelect from '../../components/common/UserSelect';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { updateBuilding, Building, BuildingUpdatePayload } from '../../services/buildingService';
import { showToast } from '../../utils/toast';
import Map from '../../components/common/Map';

interface EditBuildingProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  building: Building | null;
}

const schema = yup.object({
  name: yup.string().required('Property name is required'),
  type: yup.string().required('Property type is required'),
  userId: yup.string().required('Manager is required'),
  city: yup.string().required('City is required'),
  address: yup.string().required('Address is required'),
});

const EditBuilding: React.FC<EditBuildingProps> = ({ open, onClose, onSuccess, building }) => {
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState(building?.type || '');
  const [selectedCity, setSelectedCity] = useState(building?.city || '');
  const [position, setPosition] = useState<[number, number]>(
    building ? [building.latitude, building.longitude] : [25.2048, 55.2708]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<BuildingUpdatePayload>({
    resolver: yupResolver(schema),
    defaultValues: building ? {
      name: building.name,
      type: building.type,
      userId: building.userId?._id,
      city: building.city,
      address: building.address,
    } : undefined
  });

  useEffect(() => {
    if (building) {
      reset({
        name: building.name,
        type: building.type,
        userId: building.userId?._id,
        city: building.city,
        address: building.address,
      });
      setSelectedType(building.type);
      setSelectedCity(building.city);
      setPosition([building.latitude, building.longitude]);
    }
  }, [building, reset]);

  const propertyTypes = [
    { value: 'building', label: 'Building' },
    { value: 'complex', label: 'Complex' },
    { value: 'tower', label: 'Tower' },
  ];

  const cities = [
    { value: 'dubai', label: 'Dubai' },
    { value: 'abudhabi', label: 'Abu Dhabi' },
    { value: 'sharjah', label: 'Sharjah' },
  ];

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedType(value);
    setValue('type', value);
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedCity(value);
    setValue('city', value);
  };

  const onSubmit = async (data: BuildingUpdatePayload) => {
    if (!building?._id) {
      showToast.error('Building ID is missing');
      return;
    }

    try {
      setLoading(true);
      await updateBuilding(building._id, {
        ...data,
        latitude: position[0],
        longitude: position[1]
      });
      showToast.success('Building updated successfully');
      onSuccess?.();
      onClose();
    } catch (error: any) {
      showToast.error(error.message || 'Failed to update building');
    } finally {
      setLoading(false);
    }
  };

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
          <Typography variant="h6" sx={{ color: colors.text.dark }}>Edit Building</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: colors.text.dark }} mb={1}>
                Property Name
              </Typography>
              <Input
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
                startIcon={<Business sx={{ color: colors.text.secondary }} />}
                placeholder="Building Name / Property Name"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: colors.text.dark }} mb={1}>
                Property Type
              </Typography>
              <Select
                value={selectedType}
                onChange={handleTypeChange}
                error={!!errors.type}
                helperText={errors.type?.message}
                options={propertyTypes}
                placeholder="Building / Complex / Tower"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: colors.text.dark }} mb={1}>
                Manager
              </Typography>
              <UserSelect
                value={watch('userId')}
                onChange={(value) => setValue('userId', value)}
                error={!!errors.userId}
                helperText={errors.userId?.message}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: colors.text.dark }} mb={1}>
                City
              </Typography>
              <Select
                value={selectedCity}
                onChange={handleCityChange}
                error={!!errors.city}
                helperText={errors.city?.message}
                options={cities}
                placeholder="Select City"
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: colors.text.dark }} mb={1}>
                Address
              </Typography>
              <Input
                {...register('address')}
                error={!!errors.address}
                helperText={errors.address?.message}
                startIcon={<LocationOn sx={{ color: colors.text.secondary }} />}
                placeholder="No. 5, Some St. Area Name"
                multiline
                rows={2}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: colors.text.dark }} mb={1}>
                Location
              </Typography>
              <Box sx={{ height: 300 }}>
                <Map position={position} onPositionChange={(lat, lng) => setPosition([lat, lng])} />
              </Box>
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
              {loading ? 'Updating...' : 'Update Building'}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default EditBuilding; 