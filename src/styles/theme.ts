export const colors = {
  // Primary Colors
  primary: {
    main: '#E90C0C',      // Brand red
    light: '#FF3333',     // Lighter red
    dark: '#CC0000',      // Darker red
    gradient: 'linear-gradient(135deg, #E90C0C 0%, #C80000 100%)', // Red gradient
    contrastText: '#FFFFFF'
  },

  // Secondary Colors
  secondary: {
    main: '#2A3547',      // Dark blue-gray
    light: '#3A485E',     // Light blue-gray
    dark: '#1A2233',      // Darker blue-gray
    contrastText: '#FFFFFF'
  },

  // Background Colors
  background: {
    default: '#FFFFFF',   // White
    paper: '#F5F6F8',     // Light gray background
    sidebar: '#2A3547',   // Sidebar background
    gradient: {
      red: 'linear-gradient(135deg, #E90C0C 0%, #C80000 100%)',
    },
  },

  // Text Colors
  text: {
    primary: '#2A3547',   // Primary text
    secondary: '#707C94', // Secondary text
    disabled: '#A3AED0',  // Disabled text
    white: '#FFFFFF',     // White text
    sidebar: '#A3AED0',   // Sidebar text color
    dark: '#2A3547',     // Dark text color
  },

  // Status Colors
  status: {
    success: '#00C292',   // Green
    warning: '#FEC90F',   // Yellow
    error: '#E90C0C',     // Red
    info: '#0085DB',      // Blue
  },

  // Border Colors
  border: {
    light: '#EEF2F6',    // Light border
    main: '#E6E9F0',     // Main border
    dark: '#CBD5E1',     // Dark border
  },

  // Admin Layout Specific Colors
  layout: {
    header: {
      background: '#FFFFFF',
      text: '#2A3547',
      search: {
        background: '#F5F6F8',
        text: '#707C94',
        placeholder: '#A3AED0',
      },
    },
    sidebar: {
      background: '#FFFFFF',
      text: '#FFFFFF',
      activeItem: {
        background: '#1A2233',
        text: '#FFFFFF',
      },
      hoverItem: {
        background: '#3A485E',
        text: '#FFFFFF',
      },
    },
    content: {
      background: '#F5F6F8',
    },
  }
};

// You can add more theme-related constants here
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
};

export const borderRadius = {
  sm: '4px',
  md: '8px',
  lg: '16px',
  xl: '24px',
  round: '50%',
  main: '10px',
  top: '10px 10px 0 0',
};

export const shadows = {
  sm: '0 1px 3px rgba(0,0,0,0.12)',
  md: '0 4px 6px rgba(0,0,0,0.1)',
  lg: '0 10px 15px rgba(0,0,0,0.1)',
};

// Usage example in components:
// import { colors } from '@/styles/theme';
// sx={{ backgroundColor: colors.primary.main }} 