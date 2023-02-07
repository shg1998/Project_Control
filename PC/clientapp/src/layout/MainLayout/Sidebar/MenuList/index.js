// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import menuItem from 'components/menu-items';
import { useUserState } from '../../../../context/UserContext';
import userMenuItems from '../../../../components/menu-items/userMenuItems';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
    let { isAdmin } = useUserState();
    let collection = isAdmin ? menuItem : userMenuItems;
    const navItems = collection.items.map((item) => {
        switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={item} />;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    return <>{navItems}</>;
};

export default MenuList;
