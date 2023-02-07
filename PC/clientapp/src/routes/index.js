import { useRoutes } from 'react-router-dom';

// routes
import AdminRoutes from './AdminRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import { useUserState } from 'context/UserContext';
import UserRoutes from './UserRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    let { isAuthenticated, isAdmin } = useUserState();
    let routes = AuthenticationRoutes;
    if (isAuthenticated) {
        if (isAdmin) routes = AdminRoutes;
        else routes = UserRoutes;
    }
    return useRoutes([routes]);
}
