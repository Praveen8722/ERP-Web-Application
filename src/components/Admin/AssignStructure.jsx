import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Divider,
  FormControlLabel,
  Grid,
  Box,
  IconButton,
  Typography,
  Switch,
  TablePagination,
} from "@mui/material";
import { FilterList, CloudUpload, CloudDownload, MarkEmailRead } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/material/styles";

const CustomSwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          content: "'Monthly'",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          position: 'absolute',
          color: '#fff',
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#aab4be', 
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#003892', 
      width: 32,
      height: 32,
      '&:before': {
        content: "'Annual'",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        position: 'absolute',
        color: '#fff',
        fontSize: 10,
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#003892', 
      borderRadius: 20 / 2,
    },
  }));
  
  const SwitchWithInnerLabels = () => (
    <Box display="flex" alignItems="center">
      <CustomSwitch />
    </Box>
  );
  
  const AssignStructure = () => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    const handleEdit = (employee) => {
    };

    
  const employees = [
    { id: 1, name: "Praveen" },
    { id: 2, name: "Ankit" },
    { id: 3, name: "kartik" },
    { id: 4, name: "salman" },
    { id: 5, name: "Praveen" },
    { id: 6, name: "Ankit" },
    { id: 7, name: "Praveen" },
    { id: 8, name: "Ankit" },
    { id: 9, name: "Praveen" },
    { id: 10, name: "Ankit" },
    { id: 11, name: "Praveen" },
    { id: 12, name: "Ankit" },
    
  ];

  const employees1 = [
    {
      location: "Bengaluru",
      Designation: "Frontend Developer",
      RulesApplied: "Salary Structure",
      CTCWage: "300000",
      Basic: "25000",
      HRA: "5000",
      SpacialAllowance: "0",
      Gratuity: "0",
      PFEmployer: "15000",
    },
    {
        location: "Bengaluru",
        Designation: "Frontend Developer",
        RulesApplied: "Salary Structure",
        CTCWage: "300000",
        Basic: "25000",
        HRA: "5000",
        SpacialAllowance: "0",
        Gratuity: "0",
        PFEmployer: "15000",
      },
      {
        location: "Bengaluru",
        Designation: "Frontend Developer",
        RulesApplied: "Salary Structure",
        CTCWage: "300000",
        Basic: "25000",
        HRA: "5000",
        SpacialAllowance: "0",
        Gratuity: "0",
        PFEmployer: "15000",
      },
      {
        location: "Bengaluru",
        Designation: "Frontend Developer",
        RulesApplied: "Salary Structure",
        CTCWage: "300000",
        Basic: "25000",
        HRA: "5000",
        SpacialAllowance: "0",
        Gratuity: "0",
        PFEmployer: "15000",
      },
      {
        location: "Bengaluru",
        Designation: "Frontend Developer",
        RulesApplied: "Salary Structure",
        CTCWage: "300000",
        Basic: "25000",
        HRA: "5000",
        SpacialAllowance: "0",
        Gratuity: "0",
        PFEmployer: "15000",
      },
      {
        location: "Bengaluru",
        Designation: "Frontend Developer",
        RulesApplied: "Salary Structure",
        CTCWage: "300000",
        Basic: "25000",
        HRA: "5000",
        SpacialAllowance: "0",
        Gratuity: "0",
        PFEmployer: "15000",
      },
      {
        location: "Bengaluru",
        Designation: "Frontend Developer",
        RulesApplied: "Salary Structure",
        CTCWage: "300000",
        Basic: "25000",
        HRA: "5000",
        SpacialAllowance: "0",
        Gratuity: "0",
        PFEmployer: "15000",
      },
      {
        location: "Bengaluru",
        Designation: "Frontend Developer",
        RulesApplied: "Salary Structure",
        CTCWage: "300000",
        Basic: "25000",
        HRA: "5000",
        SpacialAllowance: "0",
        Gratuity: "0",
        PFEmployer: "15000",
      },
      {
        location: "Bengaluru",
        Designation: "Frontend Developer",
        RulesApplied: "Salary Structure",
        CTCWage: "300000",
        Basic: "25000",
        HRA: "5000",
        SpacialAllowance: "0",
        Gratuity: "0",
        PFEmployer: "15000",
      },
      {
        location: "Bengaluru",
        Designation: "Frontend Developer",
        RulesApplied: "Salary Structure",
        CTCWage: "300000",
        Basic: "25000",
        HRA: "5000",
        SpacialAllowance: "0",
        Gratuity: "0",
        PFEmployer: "15000",
      },
      {
        location: "Bengaluru",
        Designation: "Frontend Developer",
        RulesApplied: "Salary Structure",
        CTCWage: "300000",
        Basic: "25000",
        HRA: "5000",
        SpacialAllowance: "0",
        Gratuity: "0",
        PFEmployer: "15000",
      },
      {
        location: "Bengaluru",
        Designation: "Frontend Developer",
        RulesApplied: "Salary Structure",
        CTCWage: "300000",
        Basic: "25000",
        HRA: "5000",
        SpacialAllowance: "0",
        Gratuity: "0",
        PFEmployer: "15000",
      },
  ];

  const employees2 = [
    { id: 1 },
    { id: 2 },
    { id: 1 },
    { id: 2 },
    { id: 1 },
    { id: 2 },
    { id: 1 },
    { id: 2 },
    { id: 1 },
    { id: 1 },
    { id: 2 },
    { id: 1 },
  ];

 

  return (
    <Paper sx={{ width: "100%" }}>
       <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          padding: "16px",
        }}
      >
        <TextField
          label="Search..."
          variant="outlined"
          size="small"
          sx={{ width: { xs: "100%", md: "30%" }, mb: { xs: "16px", md: "0" } }}
        />
        <Box display="flex" alignItems="center" gap={1}>
          <MarkEmailRead />
           <Typography variant="body1" style={{ whiteSpace: 'nowrap',fontWeight:'600',color:'grey' }}>
           Assign Structure
           </Typography>

          <FormControlLabel
            control={<SwitchWithInnerLabels />}
            labelPlacement="start"
          />
        </Box>
        <Grid
          container
          spacing={1}
          sx={{
            justifyContent: { xs: "center", md: "flex-end" },
            alignItems: "center",
          }}
        >
          <Grid item>
            <Button variant="contained" startIcon={<FilterList />}>
              Filter Employees
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="error" startIcon={<CloudUpload />}>
              Import
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" startIcon={<CloudDownload />}>
              Export
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <Box sx={{ display: "flex", flexDirection: "column", height: '300px', overflow: 'auto' }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <TableContainer
            component={Paper}
            sx={{
              width: "25%",
              boxShadow: "5px 0px 5px 2px rgba(0, 0, 0, 0.3)",
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    padding="checkbox"
                    sx={{
                      borderRight: "1px solid #ddd",
                      fontWeight: "bold",
                      fontSize: "16px",
                      color: "#333",
                    }}
                  >
                    <input type="checkbox" />
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: "1px solid #ddd",
                      fontWeight: "bold",
                      fontSize: "16px",
                      color: "#1976D2",
                    }}
                  >
                    ID
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: "1px solid #ddd",
                      fontWeight: "bold",
                      fontSize: "16px",
                      color: "#1976D2",
                    }}
                  >
                    Employee Name
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell
                      padding="checkbox"
                      style={{ borderRight: "1px solid #ddd" }}
                    >
                      <input type="checkbox" />
                    </TableCell>
                    <TableCell style={{ borderRight: "1px solid #ddd" }}>
                      {employee.id}
                    </TableCell>
                    <TableCell
                      style={{
                        borderRight: "1px solid #ddd",
                        fontWeight: "bold",
                        color: "#078480",
                      }}
                    >
                      {employee.name}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TableContainer
            component={Paper}
            sx={{
              width: "67.2%",
              overflowX: "auto",
            }}
          >
            <Table
              sx={{
                minWidth: "100rem",
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      borderRight: "1px solid #ddd",
                      fontWeight: "bold",
                      fontSize: "16px",
                      color: "#1976D2",
                    }}
                  >
                    Location
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: "1px solid #ddd",
                      fontWeight: "bold",
                      fontSize: "16px",
                      color: "#1976D2",
                    }}
                  >
                    Designation
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: "1px solid #ddd",
                      fontWeight: "bold",
                      fontSize: "16px",
                      color: "#1976D2",
                    }}
                  >
                    Rules Applied
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: "1px solid #ddd",
                      fontWeight: "bold",
                      fontSize: "16px",
                      color: "#1976D2",
                    }}
                  >
                    CTC / Wage
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: "1px solid #ddd",
                      fontWeight: "bold",
                      fontSize: "16px",
                      color: "#1976D2",
                    }}
                  >
                    Basic
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: "1px solid #ddd",
                      fontWeight: "bold",
                      fontSize: "16px",
                      color: "#1976D2",
                    }}
                  >
                    HRA
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: "1px solid #ddd",
                      fontWeight: "bold",
                      fontSize: "16px",
                      color: "#1976D2",
                    }}
                  >
                    Special Allowance
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: "1px solid #ddd",
                      fontWeight: "bold",
                      fontSize: "16px",
                      color: "#1976D2",
                    }}
                  >
                    Gratuity
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: "1px solid #ddd",
                      fontWeight: "bold",
                      fontSize: "16px",
                      color: "#1976D2",
                    }}
                  >
                    PF Employer
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees1.map((employee, index) => (
                  <TableRow key={index}>
                    <TableCell style={{ borderRight: "1px solid #ddd" }}>
                      {employee.location}
                    </TableCell>
                    <TableCell style={{ borderRight: "1px solid #ddd" }}>
                      {employee.Designation}
                    </TableCell>
                    <TableCell style={{ borderRight: "1px solid #ddd" }}>
                      {employee.RulesApplied}
                    </TableCell>
                    <TableCell style={{ borderRight: "1px solid #ddd" }}>
                      {employee.CTCWage}
                    </TableCell>
                    <TableCell style={{ borderRight: "1px solid #ddd" }}>
                      {employee.Basic}
                    </TableCell>
                    <TableCell style={{ borderRight: "1px solid #ddd" }}>
                      {employee.HRA}
                    </TableCell>
                    <TableCell style={{ borderRight: "1px solid #ddd" }}>
                      {employee.SpacialAllowance}
                    </TableCell>
                    <TableCell style={{ borderRight: "1px solid #ddd" }}>
                      {employee.Gratuity}
                    </TableCell>
                    <TableCell style={{ borderRight: "1px solid #ddd" }}>
                      {employee.PFEmployer}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TableContainer
            component={Paper}
            sx={{
              width: "6%",
              boxShadow: "-5px 0px 5px 2px rgba(0, 0, 0, 0.3)",
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      borderRight: "1px solid #ddd",
                      fontWeight: "bold",
                      fontSize: "16px",
                      color: "#1976D2",
                      textAlign: "center",
                    }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody >
                {employees2.map((employee) => (
                  <TableRow key={employee.id} >
                    <TableCell
                      style={{
                        borderRight: "1px solid #ddd",
                        textAlign: "center",
                      }}
                      
                    >
                      <IconButton
                        aria-label="edit"
                        onClick={() => handleEdit(employee)}
                        sx={{height:'1rem'}}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={employees1.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default AssignStructure;
