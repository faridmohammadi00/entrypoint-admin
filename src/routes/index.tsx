import { useRoutes } from 'react-router-dom';
import { publicRoutes } from './publicRoutes';
import { protectedRoutes } from './protectedRoutes';
import { ProtectedRoute } from '../middleware/authMiddleware';

export const AppRoutes = () => {
  const routes = [
    ...publicRoutes,
    {
      element: <ProtectedRoute>{protectedRoutes[0].element}</ProtectedRoute>,
      children: protectedRoutes[0].children,
    },
  ];

  return useRoutes(routes);
};
