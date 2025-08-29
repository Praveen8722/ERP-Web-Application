import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  Paper,
  Grid,
  Pagination,
  CircularProgress as MuiCircularProgress
} from '@mui/material';
import Sidebar from "./common/Sidebar";
import Header from "./common/Header";
import EmpContext from '../context/EmpContext';

const CircularProgressWithLabel = ({ value, total, color }) => (
  <Box sx={{ position: 'relative', display: 'inline-flex', m: 1 }}>
    <MuiCircularProgress
      variant="determinate"
      value={(value / total) * 100}
      size={80}
      thickness={4}
      sx={{ color }}
    />
    <Box
      sx={{
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="caption" component="div" color="text.secondary">
        {`${value}/${total}`}
      </Typography>
    </Box>
  </Box>
);

const LeaveCard = ({ type, available, used, total, color, typeColor, typeFontWeight, borderTopColor }) => (
  <Paper
    elevation={3}
    sx={{ textAlign: 'center', p: 2, m: 1, width: '100%', maxWidth: '337px', borderTop: `3px solid ${borderTopColor}` }}
  >
    <Typography
      variant="h6"
      component="div"
      sx={{ color: typeColor, fontWeight: typeFontWeight }}
    >
      {type}
    </Typography>
    <CircularProgressWithLabel value={available} total={total} color={color} />
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', mt: '-3rem' }}>
      <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 'bold' }}>
        Available - {available}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
        Used - {used}
      </Typography>
    </Box>
  </Paper>
);

const LeaveBalances = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [leaveTypes, setLeaveTypes] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getLeaveBalances } = useContext(EmpContext);
  const itemsPerPage = 6;

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    const fetchLeaveBalances = async () => {
      try {
        setLoading(true);
        const response = await getLeaveBalances();
        setLeaveTypes(response.resultData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveBalances();
  }, [getLeaveBalances]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const paginatedLeaveTypes = leaveTypes
    ? leaveTypes.slice((page - 1) * itemsPerPage, page * itemsPerPage)
    : [];

  return (
    <div style={{ display: "flex" }}>
      <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
      <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <Header collapsed={collapsed} toggleSidebar={toggleSidebar} />
        <Paper
          elevation={3}
          sx={{
            position: "fixed",
            marginTop: "70px",
            zIndex: 2000,
            width: collapsed ? "calc(100% - 100px)" : "calc(100% - 270px)",
            marginLeft: collapsed ? "100px" : "270px",
          }}
        >
          <Typography variant="h6" sx={{ padding: "10px" }}>
            Leave Balances
          </Typography>
        </Paper>
        <main
          style={{
            padding: "20px",
            width: collapsed ? "calc(100% - 100px)" : "calc(100% - 270px)",
            marginLeft: collapsed ? "100px" : "270px",
            marginTop: "130px",
            flexGrow: 1,
            background: "white",
          }}
        >
          {children}
          <Paper
            sx={{
              width: { xs: '100%', md: '80%' },
              mt: { xs: '2rem', md: '3rem' },
              ml: { xs: 0, md: '10%' },
              border: '2px solid grey',
              overflow: 'hidden'
            }}
          >
            <Box sx={{ p: 3 }}>
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <CircularProgress />
                </Box>
              ) : error ? (
                <Typography color="error">{error}</Typography>
              ) : (
                <>
                  <Grid container spacing={2} justifyContent="center">
                    {paginatedLeaveTypes.map((leave, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <LeaveCard {...leave} />
                      </Grid>
                    ))}
                  </Grid>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                    <Pagination
                      count={Math.ceil(leaveTypes.length / itemsPerPage)}
                      page={page}
                      onChange={handleChange}
                      color="primary"
                    />
                  </Box>
                </>
              )}
            </Box>
          </Paper>
        </main>
      </div>
    </div>
  );
};

export default LeaveBalances;
