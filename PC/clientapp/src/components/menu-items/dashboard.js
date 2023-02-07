// assets
import { IconDashboard, IconUsers, IconAdjustments } from '@tabler/icons';

// constant
const icons = { IconDashboard, IconUsers, IconAdjustments };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: '',
    type: 'group',
    children: [
        {
            id: 'users',
            title: 'کاربران',
            type: 'item',
            url: '/',
            icon: icons.IconUsers,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
