import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from "./common/Sidebar";
import Header from "./common/Header";
import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Pagination,
  Box,
  TableSortLabel,
  Typography
} from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import AdminContext from '../context/AdminContext';

const statusColors = {
  Approved: 'green',
  Rejected: 'red',
  Pending: 'orange',
};

const Leaveapproval = ({ children }) => {
  const { getLeaveorg } = useContext(AdminContext);
  const [rows, setRows] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate(); 

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedRows = [...rows].sort((a, b) => {
    if (order === 'asc') {
      return a[orderBy] < b[orderBy] ? -1 : 1;
    } else {
      return a[orderBy] > b[orderBy] ? -1 : 1;
    }
  });

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const leave = await getLeaveorg();
        console.log(leave);
        setRows(leave.resultData.map(item => ({
          id: item._id,
          name: item.empid.fullName,
          leaveType: item.leaveType.leaveTypeName,
          from: new Date(item.startDate).toLocaleDateString(),
          to: new Date(item.endDate).toLocaleDateString(),
          days: `${item.noofDays} Days`,
          reason: item.reason,
          status: item.status
        })));
      } catch (error) {
        console.error("Error fetching leave types:", error);
      }
    };
    fetchLeave();
  }, [getLeaveorg]);

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
            Leave Detail
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

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sortDirection={orderBy === 'name' ? order : false}>
                    <TableSortLabel
                      active={orderBy === 'name'}
                      direction={orderBy === 'name' ? order : 'asc'}
                      onClick={() => handleRequestSort('name')}
                    >
                      Employee Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sortDirection={orderBy === 'leaveType' ? order : false}>
                    <TableSortLabel
                      active={orderBy === 'leaveType'}
                      direction={orderBy === 'leaveType' ? order : 'asc'}
                      onClick={() => handleRequestSort('leaveType')}
                    >
                      Leave Type
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sortDirection={orderBy === 'from' ? order : false}>
                    <TableSortLabel
                      active={orderBy === 'from'}
                      direction={orderBy === 'from' ? order : 'asc'}
                      onClick={() => handleRequestSort('from')}
                    >
                      From
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sortDirection={orderBy === 'to' ? order : false}>
                    <TableSortLabel
                      active={orderBy === 'to'}
                      direction={orderBy === 'to' ? order : 'asc'}
                      onClick={() => handleRequestSort('to')}
                    >
                      To
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sortDirection={orderBy === 'days' ? order : false}>
                    <TableSortLabel
                      active={orderBy === 'days'}
                      direction={orderBy === 'days' ? order : 'asc'}
                      onClick={() => handleRequestSort('days')}
                    >
                      No of days
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sortDirection={orderBy === 'reason' ? order : false}>
                    <TableSortLabel
                      active={orderBy === 'reason'}
                      direction={orderBy === 'reason' ? order : 'asc'}
                      onClick={() => handleRequestSort('reason')}
                    >
                      Reason
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sortDirection={orderBy === 'status' ? order : false}>
                    <TableSortLabel
                      active={orderBy === 'status'}
                      direction={orderBy === 'status' ? order : 'asc'}
                      onClick={() => handleRequestSort('status')}
                    >
                      Status
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>View</TableCell> 
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedRows.map((row) => (
                  <TableRow key={row.id} sx={{ height: '60px' }}>
                    <TableCell sx={{ padding: '4px' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar alt={row.name} src={`/static/images/avatar/${row.id}.jpg`} sx={{ width: 24, height: 24, marginRight: 1 }} /> {row.name}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ padding: '4px' }}>{row.leaveType}</TableCell>
                    <TableCell sx={{ padding: '4px' }}>{row.from}</TableCell>
                    <TableCell sx={{ padding: '4px' }}>{row.to}</TableCell>
                    <TableCell sx={{ padding: '4px' }}>{row.days}</TableCell>
                    <TableCell sx={{ padding: '4px' }}>{row.reason}</TableCell>
                    <TableCell sx={{ padding: '4px' }}>
                      <Button
                        variant="contained"
                        style={{ backgroundColor: statusColors[row.status] }}
                        onClick={(event) => handleClick(event, row)}
                      >
                        {row.status}
                      </Button>
                    </TableCell>
                    <TableCell sx={{ padding: '4px' }}>
                      <IconButton
                        onClick={() => navigate('/leave-details', { state: { id: row.id } })}
                      >
                        <RemoveRedEyeIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Pagination count={10} color="primary" />
          </TableContainer>
        </main>
      </div>
    </div>
  );
};

export default Leaveapproval;
