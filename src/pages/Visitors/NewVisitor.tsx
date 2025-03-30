import React from 'react';
import {
  Box,
  Typography,
  Modal,
  Grid,
  IconButton,
  Button,
} from '@mui/material';
import { 
  Close as CloseIcon,
  Person,
  Phone,
  LocationOn,
  Badge,
  Cake,
} from '@mui/icons-material';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/datepicker.css";
import { colors, borderRadius } from '../../styles/theme';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createVisitor, VisitorCreatePayload } from '../../services/visitorService';
import { showToast } from '../../utils/toast';

interface NewVisitorProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const schema = yup.object({
  fullname: yup.string().required('Full name is required'),
  id_number: yup.string().required('ID number is required'),
  birthday: yup.date().required('Birthday is required'),
  gender: yup.string().oneOf(['male', 'female', 'other']).required('Gender is required'),
  region: yup.string().required('Region is required'),
  expire_date: yup.date().required('Expiry date is required'),
  phone: yup.string().required('Phone number is required'),
});

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

const NewVisitor: React.FC<NewVisitorProps> = ({ open, onClose, onSuccess }) => {
  const { control, register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: VisitorCreatePayload) => {
    try {
      await createVisitor(data);
      showToast.success('Visitor created successfully');
      reset();
      onSuccess?.();
      onClose();
    } catch (error) {
      showToast.error('Failed to create visitor');
    }
  };

  const CustomDateInput = React.forwardRef(({ value, onClick, error, label, icon }: any, ref) => (
    <Box onClick={onClick} ref={ref} sx={{ cursor: 'pointer' }}>
      <Input
        value={value}
        readOnly
        error={error}
        placeholder={`Select ${label}`}
        startIcon={icon}
        sx={{ cursor: 'pointer' }}
      />
    </Box>
  ));

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
          <Typography variant="h6" sx={{ color: colors.text.dark }}>Add New Visitor</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" sx={{ color: colors.text.dark }} mb={1}>
                Full Name
              </Typography>
              <Input
                {...register('fullname')}
                error={!!errors.fullname}
                helperText={errors.fullname?.message}
                startIcon={<Person sx={{ color: colors.text.secondary }} />}
                placeholder="Enter full name"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" sx={{ color: colors.text.dark }} mb={1}>
                ID Number
              </Typography>
              <Input
                {...register('id_number')}
                error={!!errors.id_number}
                helperText={errors.id_number?.message}
                startIcon={<Badge sx={{ color: colors.text.secondary }} />}
                placeholder="Enter ID number"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" sx={{ color: colors.text.dark }} mb={1}>
                Birthday
              </Typography>
              <Controller
                control={control}
                name="birthday"
                render={({ field: { onChange, value } }) => (
                  <DatePicker
                    selected={value}
                    onChange={onChange}
                    dateFormat="dd/MM/yyyy"
                    customInput={
                      <CustomDateInput
                        error={!!errors.birthday}
                        label="birthday"
                        icon={<Cake sx={{ color: colors.text.secondary }} />}
                      />
                    }
                  />
                )}
              />
              {errors.birthday && (
                <Typography variant="caption" color="error">
                  {errors.birthday.message}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" sx={{ color: colors.text.dark }} mb={1}>
                Gender
              </Typography>
              <Controller
                control={control}
                name="gender"
                render={({ field }) => (
                  <Select
                    {...field}
                    error={!!errors.gender}
                    helperText={errors.gender?.message}
                    options={genderOptions}
                    placeholder="Select gender"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" sx={{ color: colors.text.dark }} mb={1}>
                Region
              </Typography>
              <Input
                {...register('region')}
                error={!!errors.region}
                helperText={errors.region?.message}
                startIcon={<LocationOn sx={{ color: colors.text.secondary }} />}
                placeholder="Enter region"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" sx={{ color: colors.text.dark }} mb={1}>
                Expiry Date
              </Typography>
              <Controller
                control={control}
                name="expire_date"
                render={({ field: { onChange, value } }) => (
                  <DatePicker
                    selected={value}
                    onChange={onChange}
                    dateFormat="dd/MM/yyyy"
                    customInput={
                      <CustomDateInput
                        error={!!errors.expire_date}
                        label="expiry date"
                        icon={<Cake sx={{ color: colors.text.secondary }} />}
                      />
                    }
                  />
                )}
              />
              {errors.expire_date && (
                <Typography variant="caption" color="error">
                  {errors.expire_date.message}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" sx={{ color: colors.text.dark }} mb={1}>
                Phone Number
              </Typography>
              <Input
                {...register('phone')}
                error={!!errors.phone}
                helperText={errors.phone?.message}
                startIcon={<Phone sx={{ color: colors.text.secondary }} />}
                placeholder="Enter phone number"
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  onClick={onClose}
                  sx={{ 
                    color: colors.text.secondary,
                    bgcolor: colors.background.paper,
                    '&:hover': { bgcolor: colors.background.paper }
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    bgcolor: colors.primary.main,
                    borderRadius: borderRadius.main,
                    fontWeight: 'bold',
                    '&:hover': { bgcolor: colors.primary.dark }
                  }}
                >
                  Create Visitor
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default NewVisitor; 