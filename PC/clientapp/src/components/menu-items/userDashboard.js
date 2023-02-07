// assets
import { IconDashboard, IconBuildingHospital, IconDeviceHeartMonitor, IconUsers } from '@tabler/icons';

// constant
const icons = { IconDashboard, IconBuildingHospital, IconDeviceHeartMonitor, IconUsers };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const userDashboard = {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Central Viewer',
            type: 'item',
            url: '/',
            icon: icons.IconDeviceHeartMonitor,
            breadcrumbs: false
        }
    ]
};

export default userDashboard;
