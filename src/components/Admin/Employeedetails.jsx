import React, { useContext,useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Paper, Typography, Grid } from '@mui/material';
import Header from './common/Header';
import Sidebar from './common/Sidebar';
import { useLocation } from 'react-router-dom';
import AdminContext from '../context/AdminContext';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Card, CardContent, Avatar, IconButton,useTheme, useMediaQuery,Breadcrumbs } from '@mui/material';

const Employeedetails = ({ children }) => {
    const location = useLocation();
    const { id } = useParams();
    const [data, setData] = useState({});
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const {  getEmployeebyid,roleChanged } = useContext(AdminContext);
    const [collapsed, setCollapsed] = useState(false);
    const toggleSidebar = () => {
      setCollapsed(!collapsed);
    };

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await getEmployeebyid(id);
                setData(response.resultData);
            } catch (error) {
                console.error('Error fetching employee details:', error);
            }
        };

        fetchEmployee();
    }, []);

    return (
        <div style={{ display: 'flex' }}>
        <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
        <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <Header collapsed={collapsed} toggleSidebar={toggleSidebar} />
          <Paper
          elevation={3}
          sx={{
            position: "fixed",
            marginTop: "70px",
            zIndex: 2000,
            width: collapsed ? "calc(100% - 100px)" : "calc(100% - 270px)",
            marginLeft: collapsed ? "100px" : "270px",
            padding: "20px 10px",
          }}
        >
          <Breadcrumbs aria-label="breadcrumb">
            <Typography
              color="#abafdb"
              fontFamily={"revert"}
              fontSize={"22px"}
              fontWeight={"550"}
            >
              Employee Details
            </Typography>
          </Breadcrumbs>
        </Paper>
          <main style={{ 
             padding: "20px",
             width: collapsed ? "calc(100% - 100px)" : "calc(100% - 270px)",
             marginLeft: collapsed ? "100px" : "270px",
             marginTop: "80px",
             flexGrow: 1,
             background: "white",
            }}>
            {children}
            <>
            <Paper sx={{ width: { xs: '89%', md: '90%' }, marginTop: '2rem', padding: '1rem', ml: { xs: '0rem', md: '4rem' } }}>
                <Box sx={{ paddingBottom: '1rem' }}>

                    <Card sx={{ boxShadow: 'none', display: 'flex', alignItems: 'center', padding: '1rem', bgcolor: '#f5f5f6', marginTop: '1rem', flexDirection: { xs: 'column', md: 'row' } }}>
                        <Avatar
                            sx={{
                                width: { xs: 80, md: 120 },
                                height: { xs: 80, md: 120 },
                                marginRight: { xs: '0', md: '2rem' },
                                marginBottom: { xs: '1rem', md: '0' },
                            }}
                            alt="Smith Bruklin"
                            src="assets/img/image.png"
                        />
                        <CardContent sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                            <Typography variant="h6" noWrap color="#2e37a4" sx={{ fontSize: { xs: '20px', md: '25px' }, fontWeight: '600' }}>
                               { data.fullName}
                            </Typography>
                            <Typography variant="body2" color="#656cbf" sx={{ fontSize: { xs: '14px', md: '16px' }, fontWeight: '550' }}>
                            { data.role}
                            </Typography>
                        </CardContent>
                        <Box sx={{ flexGrow: { xs: '0', md: '1' }, display: { xs: 'none', md: 'block' } }} />
                        <Grid container alignItems="center" sx={{ justifyContent: { xs: 'center', md: 'flex-start' }, flexDirection: { xs: 'column', md: 'row' } }}>
                            <Grid item>
                                <Typography variant="body1" color="#00d3c7" sx={{ marginBottom: { xs: '0.5rem', md: '1.2rem' }, marginLeft: { md: '10rem' }, fontSize: { xs: '16px', md: '20px' }, fontWeight: '550' }}>
                                { data.role}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Card>
                </Box>
            </Paper>

            <Box
                sx={{
                    maxWidth: 480,
                    height: 300,
                    margin: 'left',
                    borderRadius: 2,
                    boxShadow: 3,
                    marginTop: '1rem',
                    ml: { xs: '0rem', md: '4rem' }
                }}
            >
                <Card
                    sx={{
                        height: '100%',
                        overflow: 'auto',
                        borderRadius: 2,
                        boxShadow: 3,
                    }}
                >
                    <CardContent>
                        <Typography
                            variant="h6"
                            component="div"
                            gutterBottom
                            sx={{ lineHeight: '3rem', fontSize: '16px', fontWeight: '600' }}
                        >
                            About me
                        </Typography>
                        <Typography
                            variant="body1"
                            component="p"
                            gutterBottom
                            sx={{ lineHeight: '1.5rem', fontSize: '15px', fontWeight: '600', color: '#9dabc5' }}
                        >
                            Hello, I am Smith Bruklin, a Gynaecologist at Sanjivni Hospital, Surat. I
                            love working with all the hospital staff and senior doctors.
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    component="p"
                                    sx={{ lineHeight: '2rem', fontSize: '16px', fontWeight: '600' }}
                                >
                                    Gender
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2" component="p" sx={{ lineHeight: '2rem', fontSize: '15px', fontWeight: '600', color: '#9dabc5' }}>
                                    Male
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    component="p"
                                    sx={{ lineHeight: '1.5rem', fontSize: '16px', fontWeight: '600' }}
                                >
                                    Operations Done
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2" component="p" sx={{ lineHeight: '1.5rem', fontSize: '15px', fontWeight: '600', color: '#9dabc5' }}>
                                    30+
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    component="p"
                                    sx={{ lineHeight: '1.5rem', fontSize: '16px', fontWeight: '600' }}
                                >
                                    Designation
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2" component="p" sx={{ lineHeight: '1.5rem', fontSize: '15px', fontWeight: '600', color: '#9dabc5' }}>
                                    Engineer
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Box>

            <Box
                sx={{
                    height: '100%',
                    overflow: 'hidden',
                    borderRadius: 2,
                    boxShadow: 3,
                    maxWidth: 900,
                    mt: { xs: 2, sm: '-18.5rem' }, 
                    position: 'relative',
                    ml: { xs: 0, sm: '35rem' },
                    p: { xs: 2, sm: 0 } 
                }}
            >
                <CardContent>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Box display="flex" alignItems="center">
                            <IconButton sx={{ marginRight: '0.3rem', mb: '0.7rem' }}>
                                <PersonIcon />
                            </IconButton>
                            <Typography
                                variant="h6"
                                component="div"
                                gutterBottom
                                sx={{ lineHeight: '3rem', fontSize: '16px', fontWeight: '600', color: "#2e37a4" }}
                            >
                                About me
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <IconButton sx={{ marginLeft: '0.3rem', mb: '0.7rem' }}>
                                <SettingsIcon />
                            </IconButton>
                            <Typography
                                variant="h6"
                                component="div"
                                gutterBottom
                                sx={{ lineHeight: '3rem', fontSize: '16px', fontWeight: '600', color: "#2e37a4" }}
                            >
                                Settings
                            </Typography>
                        </Box>
                    </Box>
                    <Box borderBottom={5} mt={1} mb={1} borderColor="#9dabc5" width="100%" />

                    <Grid container spacing={2} sx={{ flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' }, ml: { xs: 0, sm: '1.9rem' } }}>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="body2" color="textSecondary" component="p" sx={{ lineHeight: '2rem', fontSize: '16px', fontWeight: '600' }}>
                                Full Name
                            </Typography>
                            <Typography variant="body2" component="p" sx={{ lineHeight: '2rem', fontSize: '14px', fontWeight: '600', color: '#9dabc5' }}>
                            { data.fullName}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="body2" color="textSecondary" component="p" sx={{ lineHeight: '2rem', fontSize: '16px', fontWeight: '600' }}>
                                Mobile
                            </Typography>
                            <Typography variant="body2" component="p" sx={{ lineHeight: '2rem', fontSize: '14px', fontWeight: '600', color: '#9dabc5' }}>
                            { data.phone}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="body2" color="textSecondary" component="p" sx={{ lineHeight: '2rem', fontSize: '16px', fontWeight: '600' }}>
                                Email
                            </Typography>
                            <Typography variant="body2" component="p" sx={{ lineHeight: '2rem', fontSize: '14px', fontWeight: '600', color: '#9dabc5' }}>
                            { data.email}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="body2" color="textSecondary" component="p" sx={{ lineHeight: '2rem', fontSize: '16px', fontWeight: '600' }}>
                                Location
                            </Typography>
                            <Typography variant="body2" component="p" sx={{ lineHeight: '2rem', fontSize: '14px', fontWeight: '600', color: '#9dabc5' }}>
                                Los Angeles
                            </Typography>
                        </Grid>
                    </Grid>
                    <Typography
                        variant="h6"
                        component="div"
                        gutterBottom
                        sx={{ lineHeight: '1rem', fontSize: '13.5px', fontWeight: '600', ml: { md: '2.7rem', xs: '1rem' }, mt: '1rem' }}
                    >
                        Completed my graduation in Gynaecologist Medicine from the well known and renowned institution of India – SARDAR PATEL MEDICAL COLLEGE, BARODA in 2000-01, which was affiliated to M.S. University. I ranker in University exams from the same university from 1996-01.
                        <br /> <br />
                        Worked as Professor and Head of the department; Community medicine Department at Sterline Hospital, Rajkot, Gujarat from 2003-2015
                    </Typography>
                </CardContent>
            </Box>
        </>
           
          </main>
         
        </div>
      </div>
    );
}

export default Employeedetails;
