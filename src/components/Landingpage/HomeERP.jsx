import { Box, Typography, Grid } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import React from 'react';

const HomeERP = () => {

    const [isHovered, setIsHovered] = React.useState(false);
    const [isHovered1, setIsHovered1] = React.useState(false);

    return (
        <Box sx={{ m: { xs: 0, sm: 6 } }}>
            <Box mt={11}
                sx={{
                    backgroundColor: '#6777F0',
                    color: 'white',
                    textAlign: 'center',
                    padding: '50px 20px',
                    borderRadius: '20px',
                    position: 'relative',
                }}
            >
                <Box sx={{ m: { xs: 0, sm: 7 } }}>
                    <Typography variant="h2" gutterBottom sx={{ fontWeight: '600', fontSize: { xs: '2rem', md: '3rem' } }} fontFamily={'Poppins, sans-serif'}>
                        Engage, appraise and delight every employee!
                    </Typography>
                    <Typography variant="h6" component="p" gutterBottom sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }} fontFamily={'Poppins, sans-serif'}>
                        The most trusted full-suite HRMS for your people operations
                    </Typography>

                    <Grid container spacing={4} justifyContent="center" sx={{ marginTop: '30px' }}>
                        <Grid item xs={12} sm={4} md={2}>
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <BusinessIcon fontSize="large" />
                                <Typography variant="h5" component="p" sx={{ marginTop: '10px' }} fontFamily={'Poppins, sans-serif'}>
                                    23,000+
                                </Typography>
                                <Typography variant="body1" component="p" fontFamily={'Poppins, sans-serif'}>
                                    Companies
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4} md={2}>
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <ReceiptIcon fontSize="large" />
                                <Typography variant="h5" component="p" sx={{ marginTop: '10px' }} fontFamily={'Poppins, sans-serif'}>
                                    2,00,000+
                                </Typography>
                                <Typography variant="body1" component="p" fontFamily={'Poppins, sans-serif'}>
                                    Payslips / month
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4} md={2}>
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <PeopleAltIcon fontSize="large" />
                                <Typography variant="h5" component="p" sx={{ marginTop: '10px' }} fontFamily={'Poppins, sans-serif'}>
                                    23,00,000+
                                </Typography>
                                <Typography variant="body1" component="p" fontFamily={'Poppins, sans-serif'}>
                                    Users
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>

                    <Box sx={{ marginTop: '30px', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'center' }}>
                        <button
                            style={{
                                padding: '18px 30px',
                                backgroundColor: isHovered ? '#6777F0' : '#310052',
                                color: 'white',
                                border: isHovered ? '2px solid black' : 'none',
                                borderRadius: '80px',
                                fontSize: '16px',
                                fontWeight: '100',
                                fontFamily:'Poppins, sans-serif',
                                cursor: 'pointer',
                                marginBottom: { xs: '10px', md: '0' },
                                marginRight:'1rem'
                            }}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            Start a ERP Free Account
                        </button>
                        <button
                            style={{
                                padding: '18px 30px',
                                backgroundColor: isHovered1 ? '#FCE6FF' : 'white',
                                color: 'black',
                                border: isHovered1 ? '2px solid white' : '2px solid black',
                                borderRadius: '80px',
                                fontSize: '16px',
                                fontWeight: '100',
                                fontFamily:'Poppins, sans-serif',
                                cursor: 'pointer',
                                marginLeft: { xs: '0', md: '25px' }
                            }}
                            onMouseEnter={() => setIsHovered1(true)}
                            onMouseLeave={() => setIsHovered1(false)}
                        >
                            Talk to Us!
                        </button>
                    </Box>
                </Box>
                {/* <Box sx={{
                    position: 'absolute',
                    width: { xs: '100%', sm: '80%', md: '90%' },
                    height: { xs: '200px', sm: '400px', md: '600px' },
                    bottom: { xs: '-20%', sm: '-40%', md: '-90%' },
                    right: { xs: '0', sm: '10%', md: '5%' },
                    borderRadius: '20px',
                    overflow: 'hidden'
                }}>
                    <video
                        src="https://www.datocms-assets.com/40521/1715166944-homepagev1_herovideo.mp4" // Replace with your video source
                        autoPlay
                        loop
                        muted
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </Box> */}
            </Box>
            
        </Box>
    );
}

export default HomeERP;
