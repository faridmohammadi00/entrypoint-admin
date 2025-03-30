import React from 'react';
import { TextField, TextFieldProps, InputAdornment } from '@mui/material';
import { colors } from '../../styles/theme';

interface InputProps extends Omit<TextFieldProps, 'variant'> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  border?: string;
}

const Input: React.FC<InputProps> = ({ 
  startIcon, 
  endIcon, 
  sx, 
  InputProps,
  border,
  ...props 
}) => {
  return (
    <TextField
      variant="outlined"
      fullWidth
      InputProps={{
        ...InputProps,
        startAdornment: startIcon && (
          <InputAdornment position="start">
            {startIcon}
          </InputAdornment>
        ),
        endAdornment: endIcon && (
          <InputAdornment position="end">
            {endIcon}
          </InputAdornment>
        ),
        sx: {
          borderRadius: '10px',
          border: border,
          '& fieldset': { border: 'none' },
          ...InputProps?.sx,
        }
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          backgroundColor: colors.background.paper,
        },
        ...sx
      }}
      {...props}
    />
  );
};

export default Input; 