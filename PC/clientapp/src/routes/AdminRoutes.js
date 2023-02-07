import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from '../components/Loadable';
import { Typography } from '@mui/material';

// dashboard routing
const DashboardUsers = Loadable(lazy(() => import('pages/adminPages/Users')));
const NotFoundPage = Loadable(lazy(() => import('pages/shared/NotFound/404')));
const EditProfile = Loadable(lazy(() => import('pages/shared/EditProfile/EditProfile')));

const AdminRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '',
            element: <DashboardUsers />
        },
        {
            path: '/editProfile',
            element: <EditProfile />
        },
        {
            path: '*',
            element: <NotFoundPage />
        }
    ]
};

export default AdminRoutes;
