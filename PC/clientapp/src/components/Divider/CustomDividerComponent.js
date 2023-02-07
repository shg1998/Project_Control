import React, { useEffect } from 'react';
import { Box, Button, Divider, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { CustomDivider } from '../StyledComponent';

const CustomDividerComponent = (props) => {
    return (
        <>
            <Grid item xs={12}>
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex'
                    }}
                >
                    <CustomDivider orientation="horizontal" />
                    <Button
                        className={'button'}
                        variant="outlined"
                        sx={{
                            cursor: 'unset',
                            m: 2,
                            py: 0.5,
                            px: 7,
                            borderColor: `gray !important`,
                            color: `${props.theme.palette.grey[900]}!important`,
                            fontWeight: 500,
                            borderRadius: `${props.customization.borderRadius}px`,
                            boxShadow: '0 2px 9px 0 black'
                        }}
                        disableRipple
                        disabled
                    >
                        {props.caption}
                    </Button>
                    <CustomDivider orientation="horizontal" />
                </Box>
            </Grid>
        </>
    );
};

CustomDividerComponent.propTypes = {
    theme: PropTypes.object.isRequired,
    caption: PropTypes.string.isRequired,
    customization: PropTypes.object.isRequired
};

export default CustomDividerComponent;
