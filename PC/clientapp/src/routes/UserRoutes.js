import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from '../components/Loadable';
import UserMainLayout from '../layout/MainLayout';

// const MainUserPage = Loadable(lazy(() => import('views/pages/userPages/MainUserPage')));
const EditProfile = Loadable(lazy(() => import('pages/shared/EditProfile/EditProfile')));
const MainPage = Loadable(lazy(() => import('pages/userPages/MainPage/index')));

const UserRoutes = {
    path: '/',
    element: <UserMainLayout />,
    children: [
        {
            path: '/',
            element: <MainPage />
        },
        {
            path: '/editProfile',
            element: <EditProfile />
        }
        // {
        //     path: '/',
        //     element: <MainUserPage />
        // }
        // {
        //     path: 'dashboard',
        //     children: [
        //         {
        //             path: 'default',
        //             element: <DashboardDefault />
        //         },
        //         {
        //             path: 'users',
        //             element: <DashboardUsers />
        //         },
        //         {
        //             path: 'centrals',
        //             element: <DashboardCentrals />
        //         },
        //         {
        //             path: 'hospitals',
        //             element: <DashboardHospitals />
        //         }
        //     ]
        // },
        // {
        //     path: 'utils',
        //     children: [
        //         {
        //             path: 'util-typography',
        //             element: <UtilsTypography />
        //         }
        //     ]
        // },
        // {
        //     path: 'utils',
        //     children: [
        //         {
        //             path: 'util-color',
        //             element: <UtilsColor />
        //         }
        //     ]
        // },
        // {
        //     path: 'utils',
        //     children: [
        //         {
        //             path: 'util-shadow',
        //             element: <UtilsShadow />
        //         }
        //     ]
        // },
        // {
        //     path: 'icons',
        //     children: [
        //         {
        //             path: 'tabler-icons',
        //             element: <UtilsTablerIcons />
        //         }
        //     ]
        // },
        // {
        //     path: 'icons',
        //     children: [
        //         {
        //             path: 'material-icons',
        //             element: <UtilsMaterialIcons />
        //         }
        //     ]
        // },
        // {
        //     path: 'sample-page',
        //     element: <SamplePage />
        // }
    ]
};

export default UserRoutes;
