import React from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { 
  Box, 
  AppBar, 
  Toolbar, 
  Typography, 
  Drawer, 
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  Avatar,
  IconButton,
  InputAdornment,
  TextField
} from '@mui/material';
import { 
  Dashboard as DashboardIcon,
  People as UsersIcon,
  Business as BuildingsIcon,
  Assessment as ReportIcon,
  Person as VisitorsIcon,
  Settings as SettingsIcon,
  AttachMoney,
  Person as ProfileIcon,
  Logout as LogoutIcon,
  Search as SearchIcon,
  KeyboardArrowDown as ArrowDownIcon,
  Menu as MenuIcon
} from '@mui/icons-material';
import { colors } from '../styles/theme';

const drawerWidth = 320;

interface MenuItem {
  title: string;
  path: string;
  icon: React.ReactNode;
}

const mainMenuItems: MenuItem[] = [
  { title: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
  { title: 'Users', path: '/users', icon: <UsersIcon /> },
  { title: 'Buildings', path: '/buildings', icon: <BuildingsIcon /> },
  { title: 'Visits Report', path: '/visits', icon: <ReportIcon /> },
  { title: 'Visitors', path: '/visitors', icon: <VisitorsIcon /> },
  { title: 'Plans', path: '/plans', icon: <AttachMoney /> },
];

const settingsMenuItems: MenuItem[] = [
  { title: 'Settings', path: '/settings', icon: <SettingsIcon /> },
  { title: 'Pricing', path: '/settings/pricing', icon: <AttachMoney /> },
  { title: 'Profile', path: '/settings/profile', icon: <ProfileIcon /> },
];

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // Add logout logic here
    navigate('/login');
  };

  const isActiveRoute = (path: string) => location.pathname === path;

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': { 
            width: drawerWidth, 
            boxSizing: 'border-box',
            backgroundColor: colors.layout.sidebar.background,
            color: colors.layout.sidebar.text,
            borderRight: `1px solid ${colors.border.dark}`,
            position: 'relative',
          },
        }}
      >
        <Toolbar>
          <img 
            src="/assets/logo/logo-name-1344x476.png" 
            alt="HalaDesk" 
            style={{ height: '52px' }} 
          />
        </Toolbar>
        
        {/* Main Menu Items */}
        <List sx={{ px: 2 }}>
          {mainMenuItems.map((item) => (
            <ListItem key={item.path} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: '8px',
                  backgroundColor: isActiveRoute(item.path) ? colors.primary.main : 'transparent',
                  '&:hover': {
                    backgroundColor: isActiveRoute(item.path) 
                      ? colors.primary.dark 
                      : colors.layout.sidebar.hoverItem.background,
                  },
                  py: 1,
                }}
              >
                <ListItemIcon sx={{ 
                  minWidth: 40,
                  color: isActiveRoute(item.path) 
                    ? colors.primary.contrastText 
                    : colors.text.secondary,
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.title} 
                  sx={{
                    color: isActiveRoute(item.path) 
                      ? colors.primary.contrastText 
                      : colors.text.primary,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2, borderColor: colors.border.light }} />
        
        {/* Settings Section */}
        <Typography 
          variant="subtitle2" 
          sx={{ 
            px: 3, 
            py: 1, 
            color: colors.text.secondary,
            fontWeight: 600 
          }}
        >
          SETTINGS
        </Typography>

        <List sx={{ px: 2 }}>
          {settingsMenuItems.map((item) => (
            <ListItem key={item.path} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: '8px',
                  backgroundColor: isActiveRoute(item.path) ? colors.primary.main : 'transparent',
                  '&:hover': {
                    backgroundColor: isActiveRoute(item.path) 
                      ? colors.primary.dark 
                      : colors.layout.sidebar.hoverItem.background,
                  },
                  py: 1,
                }}
              >
                <ListItemIcon sx={{ 
                  minWidth: 40,
                  color: isActiveRoute(item.path) 
                    ? colors.primary.contrastText 
                    : colors.text.secondary,
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.title}
                  sx={{
                    color: isActiveRoute(item.path) 
                      ? colors.primary.contrastText 
                      : colors.text.primary,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}

          {/* Logout Button */}
          <ListItem disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              onClick={handleLogout}
              sx={{
                borderRadius: '8px',
                '&:hover': {
                  backgroundColor: colors.layout.sidebar.hoverItem.background,
                },
                py: 1,
              }}
            >
              <ListItemIcon sx={{ 
                minWidth: 40,
                color: colors.text.secondary,
              }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Logout"
                sx={{ color: colors.text.primary }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      {/* Right side container */}
      <Box sx={{ 
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: `calc(100% - ${drawerWidth}px)`,
      }}>
        {/* Header */}
        <AppBar 
          position="static"
          sx={{ 
            backgroundColor: colors.layout.header.background,
            boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.05)',
            width: '100%',
          }}
        >
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton
                edge="start"
                sx={{ color: colors.text.secondary }}
              >
                <MenuIcon />
              </IconButton>
              <TextField
                placeholder="Search"
                size="small"
                sx={{
                  width: '320px',
                  backgroundColor: colors.background.paper,
                  borderRadius: '8px',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      border: 'none',
                    },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: colors.text.secondary }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar 
                sx={{ 
                  width: 36, 
                  height: 36,
                  bgcolor: colors.background.paper 
                }}
              />
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ textAlign: 'right', mr: 1 }}>
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      color: colors.text.primary,
                      fontWeight: 600,
                    }}
                  >
                    Super Admin
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: colors.text.secondary,
                      display: 'block',
                    }}
                  >
                    Admin
                  </Typography>
                </Box>
                <IconButton size="small">
                  <ArrowDownIcon sx={{ color: colors.text.secondary }} />
                </IconButton>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1,
            p: 3,
            backgroundColor: colors.layout.content.background,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
