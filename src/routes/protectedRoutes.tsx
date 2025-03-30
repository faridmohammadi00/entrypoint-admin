import { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import Dashboard from '../pages/Dashboard';
import Users from '../pages/Users/Users';
import UserDetails from '../pages/Users/UserDetails';
import Settings from '../pages/Settings/Settings';
import Pricing from '../pages/Settings/Pricing';
import Profile from '../pages/Profile/Profile';
import Buildings from '../pages/Buildings/Buildings';
import Visitors from '../pages/Visitors/Visitors';
import Visits from '../pages/Visits/Visits';
import Plans from '../pages/Plans/Plans';

export const protectedRoutes: RouteObject[] = [
  {
    path: '/',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'users',
        children: [
          {
            index: true,
            element: <Users />,
          },
          {
            path: ':id',
            element: <UserDetails />,
          },
        ],
      },
      {
        path: 'buildings',
        element: <Buildings />,
      },
      {
        path: 'visitors',
        element: <Visitors />,
      },
      {
        path: 'visits',
        element: <Visits />,
      },
      {
        path: 'plans',
        element: <Plans />,
      },
      {
        path: 'settings',
        children: [
          {
            index: true,
            element: <Settings />,
          },
          {
            path: 'pricing',
            element: <Pricing />,
          },
          {
            path: 'profile',
            element: <Profile />,
          },
        ],
      },
      {
        path: 'reports',
        element: <div>Reports Page</div>,
      },
    ],
  },
]; 