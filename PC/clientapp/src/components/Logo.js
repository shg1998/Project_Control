// material-ui
import { useTheme } from '@mui/material/styles';
import logo from 'assets/images/logo.png';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
    const theme = useTheme();

    const handleClickOnLogo = () => {
        window.open('https://saadatco.com');
    };

    return (
        /**
         * if you want to use image instead of svg uncomment following, and comment out <svg> element.
         *
         * <img src={logo} alt="Berry" width="100" />
         *
         */
        <div onClick={handleClickOnLogo} onKeyDown={handleClickOnLogo} role={'link'} tabIndex="0">
            <img src={logo} alt="Saadat" width="160" />
        </div>
    );
};

export default Logo;
