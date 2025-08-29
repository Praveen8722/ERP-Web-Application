import React, { useRef, useContext, useState, useEffect } from 'react';
import { Box, Paper, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import AdminContext from '../context/AdminContext';

const workHistoryData = [
  { date: '2024-08-09', projectName: 'ERP System', workHours: 8 },
  { date: '2024-08-08', projectName: 'IRP Integration', workHours: 6 },
  { date: '2024-08-07', projectName: 'Alfa Website', workHours: 7 },
];

const WorkHistory = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const [projects, setProjects] = useState([]);
  const { getEmployee, createProject, getStatus, getProject } = useContext(AdminContext);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeDropdown && !event.target.closest(`#dropdown-${activeDropdown}`)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await getEmployee();
        setEmployees(response.resultData || []);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    const fetchStatusOptions = async () => {
      try {
        const response = await getStatus();
        setStatusOptions(response.resultData || []);
      } catch (error) {
        console.error("Error fetching status options:", error);
      }
    };

    const fetchProjects = async () => {
      try {
        const response = await getProject();
        setProjects(response.resultData || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchEmployees();
    fetchStatusOptions();
    fetchProjects();
  }, [getEmployee, getStatus, getProject]);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <main style={{
            width: '70rem',
            marginTop: "80px",
            flexGrow: 1,
            background: "white",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          }}>
          {children}
          <TableContainer component={Paper} sx={{ padding: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: '600', color: '#2596be',fontSize:'16px'}}>Date</TableCell>
                  <TableCell align="center" sx={{ fontWeight: '600', color: '#2596be',fontSize:'16px'}}>Project Name</TableCell>
                  <TableCell align="center" sx={{ fontWeight: '600', color: '#2596be',fontSize:'16px'}}>No. of Work Hours</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {workHistoryData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{row.date}</TableCell>
                    <TableCell align="center" >{row.projectName}</TableCell>
                    <TableCell align="center" >{row.workHours}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </main>
      </div>
    </div>
  );
};

export default WorkHistory;
