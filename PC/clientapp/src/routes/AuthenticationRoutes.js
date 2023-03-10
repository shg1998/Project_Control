import { lazy } from 'react';

// project imports
import Loadable from '../components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('pages/shared/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('pages/shared/authentication/authentication3/Register3')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/',
            element: <AuthLogin3 />
        },
        {
            path: '/register',
            element: <AuthRegister3 />
        },
        {
            path: '*',
            element: <AuthLogin3 />
        }
    ]
};

export default AuthenticationRoutes;
