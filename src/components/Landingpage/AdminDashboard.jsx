import React, { useState } from 'react';
import { Typography, Container, Box, Grid, IconButton } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const AdminDashboard = () => {
    const [scrollIndex, setScrollIndex] = useState(0);
    const images = [
        "/assets/img/Dashboard3.png",
        "/assets/img/Dashboard2.png",
        "/assets/img/Dashboard1.png",
        "/assets/img/Dashboard2.png",
        "/assets/img/Dashboard1.png",
        "/assets/img/Dashboard3.png"
        // Add more image paths as needed
    ];

    const scrollLeft = () => {
        setScrollIndex(Math.max(scrollIndex - 3, 0));
    };

    const scrollRight = () => {
        setScrollIndex(Math.min(scrollIndex + 3, images.length - 3));
    };

    return (
        <Container>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 6, mt: 4 }}>
                <Typography variant='h3' fontFamily={'Poppins, sans-serif'} sx={{ fontWeight: '600', color: '#6777F0' }}>
                    Admin Dashboard Preview
                </Typography>
            </Box>
            <Grid container spacing={2}>
                {images.slice(scrollIndex, scrollIndex + 3).map((image, index) => (
                    <Grid key={index} item xs={12} sm={6} md={4}>
                        <Box
                            component="img"
                            src={image}
                            alt={`Image ${index + 1}`}
                            sx={{
                                width: '100%',
                                borderRadius: '20px',
                                outline: '1px solid',
                                outlineColor: 'rgba(191, 204, 217, 0.5)',
                                boxShadow: '0 0 12px 8px rgba(156, 204, 252, 0.2)',
                            }}
                        />
                    </Grid>
                ))}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <IconButton onClick={scrollLeft} disabled={scrollIndex === 0}>
                    <NavigateBeforeIcon />
                </IconButton>
                <IconButton onClick={scrollRight} disabled={scrollIndex >= images.length - 3}>
                    <NavigateNextIcon />
                </IconButton>
            </Box>
        </Container>
    );
};

export default AdminDashboard ;
