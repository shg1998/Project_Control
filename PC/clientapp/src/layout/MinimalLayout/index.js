import { Outlet } from 'react-router-dom';

// project imports
import Customization from '../Customization';
import { useCallback } from 'react';
import { loadFull } from 'tsparticles';
import Particles from 'react-particles';

// ==============================|| MINIMAL LAYOUT ||============================== //

const options = {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                area: 800
            }
        },
        color: {
            value: ['#2EB67D', '#ECB22E', '#E01E5B', '#36C5F0']
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.6
        },
        size: {
            value: { min: 1, max: 8 }
        },
        links: {
            enable: true,
            distance: 150,
            color: '#808080',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 5,
            direction: 'none',
            random: false,
            straight: false,
            outModes: 'out'
        }
    },
    interactivity: {
        events: {
            onHover: {
                enable: true,
                mode: 'grab'
            },
            onClick: {
                enable: true,
                mode: 'push'
            }
        },
        modes: {
            grab: {
                distance: 140,
                links: {
                    opacity: 1
                }
            },
            push: {
                quantity: 4
            }
        }
    }
};

const MinimalLayout = () => {
    const particlesInit = useCallback(async (engine) => {
        await loadFull(engine);
    }, []);
    return (
        <>
            <Particles options={options} init={particlesInit} />
            <Outlet />
            {/*<Customization />*/}
        </>
    );
};

export default MinimalLayout;
