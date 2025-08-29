import React, { useState } from 'react'
import Sidebar from "./common/Sidebar";
import Header from "./common/Header";
import { Paper, Typography, Box, TextField, Button, InputLabel, FormControl, Alert, Select, MenuItem, Grid, Divider } from "@mui/material";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import AssignmentIcon from '@mui/icons-material/Assignment';


const Empsalarystructure = () => {
    const [collapsed, setCollapsed] = useState(false);
    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
            <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <Header collapsed={collapsed} toggleSidebar={toggleSidebar} />
                <Paper
                    elevation={3}
                    sx={{
                        position: 'fixed',
                        top: '70px',
                        zIndex: 2000,
                        width: collapsed ? 'calc(100% - 100px)' : 'calc(100% - 270px)',
                        marginLeft: collapsed ? '100px' : '270px',
                    }}
                >
                    <Typography variant="h6" sx={{ padding: '10px' }}>
                        Employee Salary
                    </Typography>
                </Paper>
                <main
                    style={{
                        padding: '20px',
                        width: collapsed ? 'calc(100% - 100px)' : 'calc(100% - 270px)',
                        marginLeft: collapsed ? '100px' : '270px',
                        marginTop: '130px',
                        flexGrow: 1,
                        background: 'white',
                    }}
                >
                    <Paper sx={{ border: '2px solid #2596be' }}>
                        <Box sx={{ p: '1rem' }}>
                            <Grid sx={{ display: 'flex', justifyContent: 'space-between', mb: '1rem' }}>
                                <Typography variant='h6' sx={{ fontWeight: '600', color: 'gray' }}>
                                    Payslip for the month of october 2024
                                </Typography>
                                <Box>
                                    <PictureAsPdfIcon />
                                    <AssignmentIcon />
                                </Box>
                            </Grid>
                            <Divider sx={{ bgcolor: '#2596be', mb: '1rem' }} />
                            <Grid >
                                <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}  >
                                    <Typography variant='h6' sx={{ fontWeight: '600', color: 'gray' }}>
                                        invoice#34578
                                    </Typography>
                                    <Typography >
                                        Status :
                                        <Button variant="contained" color="success" sx={{ ml: '1rem' }} >
                                            Success
                                        </Button>
                                    </Typography>
                                </Grid>
                                <Typography>
                                    Salary Month:aug,2024
                                </Typography>
                            </Grid>
                            <Grid sx={{ display: 'flex', justifyContent: 'space-between', mt: '1rem' }}>
                                <Grid sx={{ width: '15rem' }}>
                                    <Typography variant='h6' sx={{ fontWeight: '600', color: 'gray' }}>
                                        ERP
                                    </Typography>
                                    <Typography>68798 abc E-city, Karnataka Bengaluru ,BDA-87654 GST No:29687897</Typography>
                                </Grid>
                                <Grid sx={{ width: '15rem', mr: { xs: '0', md: '-3rem' } }}>
                                    <Typography variant='h6' sx={{ fontWeight: '600', color: 'gray' }}>
                                        Praveen Reddy
                                    </Typography>
                                    <Typography>Employee id:567678  online Date:24 aug 2024 praveen@gmail.com</Typography>
                                </Grid>
                            </Grid>
                            <Grid sx={{ display: 'flex', justifyContent: 'space-between', mt: '1rem',gap:'44rem' }}>
                                <Grid container direction="column" spacing={2}>
                                    <Grid item>
                                        <Typography variant='h6' sx={{ fontWeight: '600', color: 'gray' }}>
                                            Earnings
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <TextField label="Basic Salary" variant="outlined" />
                                    </Grid>
                                    <Grid item>
                                        <TextField label="HRA" variant="outlined" />
                                    </Grid>
                                    <Grid item>
                                        <TextField label="Conveyance" variant="outlined" />
                                    </Grid>
                                    <Grid item>
                                        <TextField label="Other Allowence" variant="outlined" />
                                    </Grid>
                                    <Grid item>
                                        <TextField label="Total Earnings" variant="outlined" />
                                    </Grid>
                                </Grid>
                                <Grid container direction="column" spacing={2}>
                                    <Grid item>
                                        <Typography variant='h6' sx={{ fontWeight: '600', color: 'gray' }}>
                                            Deductions
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <TextField label="T.D.S" variant="outlined" />
                                    </Grid>
                                    <Grid item>
                                        <TextField label="Provident fund" variant="outlined" />
                                    </Grid>
                                    <Grid item>
                                        <TextField label="ESI" variant="outlined" />
                                    </Grid>
                                    <Grid item>
                                        <TextField label="Loan" variant="outlined" />
                                    </Grid>
                                    <Grid item>
                                        <TextField label="Total Deductions" variant="outlined" />
                                    </Grid>
                                </Grid>

                            </Grid>
                        </Box>
                    </Paper>

                </main>
            </div>
        </div>

    )
}

export default Empsalarystructure
