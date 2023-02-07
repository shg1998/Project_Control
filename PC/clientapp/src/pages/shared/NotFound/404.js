import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import logo from 'assets/images/notfound.png';

export default function Error() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh'
            }}
        >
            <Container maxWidth="md">
                <Grid container spacing={2}>
                    <Grid xs={6}>
                        <Typography variant="h1">404</Typography>
                        <Typography variant="h4">صفحه مد نظر شما یافت نشد!!</Typography>
                        <br />
                        <Button href={'/'} variant="contained">
                            رفتن به صفحه اصلی
                        </Button>
                    </Grid>
                    <Grid xs={6}>
                        {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                        <img
                            src={logo}
                            alt="404 Page Image"
                            width={600}
                            height={500}
                            style={{ borderRadius: '50px', boxShadow: '6px 6px 10px #ccc' }}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
