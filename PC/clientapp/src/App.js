import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import { UserProvider } from 'context/UserContext';
import { ToastContainer } from 'react-toastify';

// ==============================|| APP ||============================== //

const App = () => {
    const customization = useSelector((state) => state.customization);

    return (
        <>
            <ToastContainer />
            <UserProvider>
                <StyledEngineProvider injectFirst>
                    <ThemeProvider theme={themes(customization)}>
                        <CssBaseline />
                        <NavigationScroll>
                            <Routes />
                        </NavigationScroll>
                    </ThemeProvider>
                </StyledEngineProvider>
            </UserProvider>
        </>
    );
};

export default App;
