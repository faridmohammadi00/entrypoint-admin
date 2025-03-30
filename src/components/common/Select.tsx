import React from 'react';
import {
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
  InputAdornment,
  MenuItem,
  FormControl
} from '@mui/material';
import { KeyboardArrowDown as ArrowDownIcon } from '@mui/icons-material';
import { colors } from '../../styles/theme';

interface SelectProps extends Omit<MuiSelectProps, 'variant'> {
  startIcon?: React.ReactNode;
  border?: string;
  options: Array<{
    value: string | number;
    label: string;
  }>;
}

const Select: React.FC<SelectProps> = ({
  startIcon,
  border,
  options,
  placeholder,
  sx,
  value,
  ...props
}) => {
  return (
    <FormControl fullWidth>
      <MuiSelect
        value={value || ''}
        displayEmpty
        {...props}
        IconComponent={ArrowDownIcon}
        startAdornment={
          startIcon && (
            <InputAdornment position="start">
              {startIcon}
            </InputAdornment>
          )
        }
        renderValue={(selected) => {
          if (!selected || selected === '') {
            return <span style={{ color: colors.text.secondary }}>{placeholder}</span>;
          }
          return selected;
        }}
        sx={{
          borderRadius: '10px',
          backgroundColor: colors.background.paper,
          border: border,
          '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
          '& .MuiSelect-icon': { 
            color: colors.text.secondary,
            right: '12px'
          },
          ...sx
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
};

export default Select; 