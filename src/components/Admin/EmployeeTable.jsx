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
  Grid,
  Box,
} from "@mui/material";
import { FilterList, CloudUpload, CloudDownload } from "@mui/icons-material";

const employees = [
  { id: 87, name: "Praveen" },
  { id: 86, name: "Ankit" },
  { id: 92, name: "Salman" },
  { id: 10, name: "Kartik" },
  { id: 87, name: "Praveen" },
  { id: 86, name: "Ankit" },
  { id: 92, name: "Salman" },
  { id: 10, name: "Kartik" },
  { id: 87, name: "Praveen" },
  { id: 86, name: "Ankit" },
  { id: 92, name: "Salman" },
];

const employees1 = [
  {
    Changes: "",
    location: "Bangaluru",
    ptLocation: "Karnataka",
    Department: "Software Engineer",
    Designation: "Frontend Developer",
    PAN: "BQD12345",
    PFNumber: "123456",
    ESICNumber: "123456",
    UANNumber: "123456",
    BankName: "SBI",
    IFSCCode: "SBI123456",
    BankAccount: "876543219",
    PaymentMode: "Bank",
    WorkingDays: "31/24",
    PayoutStatus: "Pay",
    Gross: "22,222",
    PayStatus: "Pay",
    Basic: "1,234",
    HRA: "4,444",
    SpacialAllowance: "00",
    Gratuity: "00",
    IncomeTax: "00",
    PFEmployer: "1,876",
    PFEmployee: "1,876",
    PT: "400",
  },
  {
    Changes: "",
    location: "Bangaluru",
    ptLocation: "Karnataka",
    Department: "Software Engineer",
    Designation: "Frontend Developer",
    PAN: "BQD12345",
    PFNumber: "123456",
    ESICNumber: "123456",
    UANNumber: "123456",
    BankName: "SBI",
    IFSCCode: "SBI123456",
    BankAccount: "876543219",
    PaymentMode: "Bank",
    WorkingDays: "31/24",
    PayoutStatus: "Pay",
    Gross: "22,222",
    PayStatus: "Pay",
    Basic: "1,234",
    HRA: "4,444",
    SpacialAllowance: "00",
    Gratuity: "00",
    IncomeTax: "00",
    PFEmployer: "1,876",
    PFEmployee: "1,876",
    PT: "400",
  },
  {
    Changes: "",
    location: "Bangaluru",
    ptLocation: "Karnataka",
    Department: "Software Engineer",
    Designation: "Frontend Developer",
    PAN: "BQD12345",
    PFNumber: "123456",
    ESICNumber: "123456",
    UANNumber: "123456",
    BankName: "SBI",
    IFSCCode: "SBI123456",
    BankAccount: "876543219",
    PaymentMode: "Bank",
    WorkingDays: "31/24",
    PayoutStatus: "Pay",
    Gross: "22,222",
    PayStatus: "Pay",
    Basic: "1,234",
    HRA: "4,444",
    SpacialAllowance: "00",
    Gratuity: "00",
    IncomeTax: "00",
    PFEmployer: "1,876",
    PFEmployee: "1,876",
    PT: "400",
  },
  {
    Changes: "",
    location: "Bangaluru",
    ptLocation: "Karnataka",
    Department: "Software Engineer",
    Designation: "Frontend Developer",
    PAN: "BQD12345",
    PFNumber: "123456",
    ESICNumber: "123456",
    UANNumber: "123456",
    BankName: "SBI",
    IFSCCode: "SBI123456",
    BankAccount: "876543219",
    PaymentMode: "Bank",
    WorkingDays: "31/24",
    PayoutStatus: "Pay",
    Gross: "22,222",
    PayStatus: "Pay",
    Basic: "1,234",
    HRA: "4,444",
    SpacialAllowance: "00",
    Gratuity: "00",
    IncomeTax: "00",
    PFEmployer: "1,876",
    PFEmployee: "1,876",
    PT: "400",
  },
  {
    Changes: "",
    location: "Bangaluru",
    ptLocation: "Karnataka",
    Department: "Software Engineer",
    Designation: "Frontend Developer",
    PAN: "BQD12345",
    PFNumber: "123456",
    ESICNumber: "123456",
    UANNumber: "123456",
    BankName: "SBI",
    IFSCCode: "SBI123456",
    BankAccount: "876543219",
    PaymentMode: "Bank",
    WorkingDays: "31/24",
    PayoutStatus: "Pay",
    Gross: "22,222",
    PayStatus: "Pay",
    Basic: "1,234",
    HRA: "4,444",
    SpacialAllowance: "00",
    Gratuity: "00",
    IncomeTax: "00",
    PFEmployer: "1,876",
    PFEmployee: "1,876",
    PT: "400",
  },
  {
    Changes: "",
    location: "Bangaluru",
    ptLocation: "Karnataka",
    Department: "Software Engineer",
    Designation: "Frontend Developer",
    PAN: "BQD12345",
    PFNumber: "123456",
    ESICNumber: "123456",
    UANNumber: "123456",
    BankName: "SBI",
    IFSCCode: "SBI123456",
    BankAccount: "876543219",
    PaymentMode: "Bank",
    WorkingDays: "31/24",
    PayoutStatus: "Pay",
    Gross: "22,222",
    PayStatus: "Pay",
    Basic: "1,234",
    HRA: "4,444",
    SpacialAllowance: "00",
    Gratuity: "00",
    IncomeTax: "00",
    PFEmployer: "1,876",
    PFEmployee: "1,876",
    PT: "400",
  },
  {
    Changes: "",
    location: "Bangaluru",
    ptLocation: "Karnataka",
    Department: "Software Engineer",
    Designation: "Frontend Developer",
    PAN: "BQD12345",
    PFNumber: "123456",
    ESICNumber: "123456",
    UANNumber: "123456",
    BankName: "SBI",
    IFSCCode: "SBI123456",
    BankAccount: "876543219",
    PaymentMode: "Bank",
    WorkingDays: "31/24",
    PayoutStatus: "Pay",
    Gross: "22,222",
    PayStatus: "Pay",
    Basic: "1,234",
    HRA: "4,444",
    SpacialAllowance: "00",
    Gratuity: "00",
    IncomeTax: "00",
    PFEmployer: "1,876",
    PFEmployee: "1,876",
    PT: "400",
  },
  {
    Changes: "",
    location: "Bangaluru",
    ptLocation: "Karnataka",
    Department: "Software Engineer",
    Designation: "Frontend Developer",
    PAN: "BQD12345",
    PFNumber: "123456",
    ESICNumber: "123456",
    UANNumber: "123456",
    BankName: "SBI",
    IFSCCode: "SBI123456",
    BankAccount: "876543219",
    PaymentMode: "Bank",
    WorkingDays: "31/24",
    PayoutStatus: "Pay",
    Gross: "22,222",
    PayStatus: "Pay",
    Basic: "1,234",
    HRA: "4,444",
    SpacialAllowance: "00",
    Gratuity: "00",
    IncomeTax: "00",
    PFEmployer: "1,876",
    PFEmployee: "1,876",
    PT: "400",
  },
  {
    Changes: "",
    location: "Bangaluru",
    ptLocation: "Karnataka",
    Department: "Software Engineer",
    Designation: "Frontend Developer",
    PAN: "BQD12345",
    PFNumber: "123456",
    ESICNumber: "123456",
    UANNumber: "123456",
    BankName: "SBI",
    IFSCCode: "SBI123456",
    BankAccount: "876543219",
    PaymentMode: "Bank",
    WorkingDays: "31/24",
    PayoutStatus: "Pay",
    Gross: "22,222",
    PayStatus: "Pay",
    Basic: "1,234",
    HRA: "4,444",
    SpacialAllowance: "00",
    Gratuity: "00",
    IncomeTax: "00",
    PFEmployer: "1,876",
    PFEmployee: "1,876",
    PT: "400",
  },
  {
    Changes: "",
    location: "Bangaluru",
    ptLocation: "Karnataka",
    Department: "Software Engineer",
    Designation: "Frontend Developer",
    PAN: "BQD12345",
    PFNumber: "123456",
    ESICNumber: "123456",
    UANNumber: "123456",
    BankName: "SBI",
    IFSCCode: "SBI123456",
    BankAccount: "876543219",
    PaymentMode: "Bank",
    WorkingDays: "31/24",
    PayoutStatus: "Pay",
    Gross: "22,222",
    PayStatus: "Pay",
    Basic: "1,234",
    HRA: "4,444",
    SpacialAllowance: "00",
    Gratuity: "00",
    IncomeTax: "00",
    PFEmployer: "1,876",
    PFEmployee: "1,876",
    PT: "400",
  },
  {
    Changes: "",
    location: "Bangaluru",
    ptLocation: "Karnataka",
    Department: "Software Engineer",
    Designation: "Frontend Developer",
    PAN: "BQD12345",
    PFNumber: "123456",
    ESICNumber: "123456",
    UANNumber: "123456",
    BankName: "SBI",
    IFSCCode: "SBI123456",
    BankAccount: "876543219",
    PaymentMode: "Bank",
    WorkingDays: "31/24",
    PayoutStatus: "Pay",
    Gross: "22,222",
    PayStatus: "Pay",
    Basic: "1,234",
    HRA: "4,444",
    SpacialAllowance: "00",
    Gratuity: "00",
    IncomeTax: "00",
    PFEmployer: "1,876",
    PFEmployee: "1,876",
    PT: "400",
  },
];

const employees2 = [
  { lop: 0, netPay: 1, status: "Pending" },
  { lop: 0, netPay: 773, status: "Pending" },
  { lop: 0, netPay: 24933, status: "Pending" },
  { lop: 0, netPay: 19875, status: "On Hold" },
  { lop: 0, netPay: 1, status: "Pending" },
  { lop: 0, netPay: 773, status: "Pending" },
  { lop: 0, netPay: 24933, status: "Pending" },
  { lop: 0, netPay: 19875, status: "On Hold" },
  { lop: 0, netPay: 1, status: "Pending" },
  { lop: 0, netPay: 773, status: "Pending" },
  { lop: 0, netPay: 24933, status: "Pending" },
];

const EmployeeTable = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredEmployees, setFilteredEmployees] = useState(employees);
  
    const requestSearch = (searched) => {
      if (searched === "") {
        setFilteredEmployees(employees);
      } else {
        setFilteredEmployees(
          employees.filter((item) =>
            item.name.toLowerCase().includes(searched.toLowerCase())
          )
        );
      }
    };
  


  return (
      <Paper sx={{ width: "30%" }}>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          mr:'20rem'

        }}
      >
       <TextField
          label="Search..."
          variant="outlined"
          size="small"
          sx={{ width: { xs: "100%", md: "30%" }, mb: { xs: "16px", md: "0" } }}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            requestSearch(e.target.value);
          }}
        />
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
            <Button
              variant="contained"
              color="error"
              startIcon={<CloudUpload />}
            >
              Import
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              startIcon={<CloudDownload />}
            >
              Export
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" , height: '300px', overflow: 'auto',m:'1.5rem',border:'2px solid #C9C9C9'}}>
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
                    Employee Name
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
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredEmployees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell
                      padding="checkbox"
                      style={{ borderRight: "1px solid #ddd" }}
                    >
                      <input type="checkbox" />
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
                    <TableCell style={{ borderRight: "1px solid #ddd" }}>
                      {employee.id}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TableContainer
            component={Paper}
            sx={{
              width: "44%",
              overflowX: "auto",
            //   whiteSpace: "nowrap",
            //   border: "1px solid black" ,
              
            }}
          >
            <Table
              sx={{
                minWidth: "230rem",
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
                    Changes
                  </TableCell>
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
                    PT Location
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: "1px solid #ddd",
                      fontWeight: "bold",
                      fontSize: "16px",
                      color: "#1976D2",
                    }}
                  >
                    Department
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
                    PAN
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: "1px solid #ddd",
                      fontWeight: "bold",
                      fontSize: "16px",
                      color: "#1976D2",
                    }}
                  >
                    PF Number
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: "1px solid #ddd",
                      fontWeight: "bold",
                      fontSize: "16px",
                      color: "#1976D2",
                    }}
                  >
                    ESIC Number
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: "1px solid #ddd",
                      fontWeight: "bold",
                      fontSize: "16px",
                      color: "#1976D2",
                    }}
                  >
                    UAN Number
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: "1px solid #ddd",
                      fontWeight: "bold",
                      fontSize: "16px",
                      color: "#1976D2",
                    }}
                  >
                    Bank Name
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: "1px solid #ddd",
                      fontWeight: "bold",
                      fontSize: "16px",
                      color: "#1976D2",
                    }}
                  >
                    IFSC Code
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: "1px solid #ddd",
                      fontWeight: "bold",
                      fontSize: "16px",
                      color: "#1976D2",
                    }}
                  >
                    Bank Account
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: "1px solid #ddd",
                      fontWeight: "bold",
                      fontSize: "16px",
                      color: "#1976D2",
                    }}
                  >
                    Payment Mode
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: "1px solid #ddd",
                      fontWeight: "bold",
                      fontSize: "16px",
                      color: "#1976D2",
                    }}
                  >
                    Working Days
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: "1px solid #ddd",
                      fontWeight: "bold",
                      fontSize: "16px",
                      color: "#1976D2",
                    }}
                  >
                    Payout Status
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: "1px solid #ddd",
                      fontWeight: "bold",
                      fontSize: "16px",
                      color: "#1976D2",
                    }}
                  >
                    Gross
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: "1px solid #ddd",
                      fontWeight: "bold",
                      fontSize: "16px",
                      color: "#1976D2",
                    }}
                  >
                    Pay Status
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
                    Income Tax
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
                  <TableCell
                    sx={{
                      borderRight: "1px solid #ddd",
                      fontWeight: "bold",
                      fontSize: "16px",
                      color: "#1976D2",
                    }}
                  >
                    PF Employee
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: "1px solid #ddd",
                      fontWeight: "bold",
                      fontSize: "16px",
                      color: "#1976D2",
                    }}
                  >
                    PT
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees1.map((employee, index) => (
                  <TableRow key={index}>
                    <TableCell style={{ borderRight: "1px solid #ddd" }}>
                      {employee.Changes}
                    </TableCell>
                    <TableCell style={{ borderRight: "1px solid #ddd" }}>
                      {employee.location}
                    </TableCell>
                    <TableCell style={{ borderRight: "1px solid #ddd" }}>
                      {employee.ptLocation}
                    </TableCell>
                    <TableCell style={{ borderRight: "1px solid #ddd" }}>
                      {employee.Department}
                    </TableCell>
                    <TableCell style={{ borderRight: "1px solid #ddd" }}>
                      {employee.Designation}
                    </TableCell>
                    <TableCell style={{ borderRight: "1px solid #ddd" }}>
                      {employee.PAN}
                    </TableCell>
                    <TableCell style={{ borderRight: "1px solid #ddd" }}>
                      {employee.PFNumber}
                    </TableCell>
                    <TableCell style={{ borderRight: "1px solid #ddd" }}>
                      {employee.ESICNumber}
                    </TableCell>
                    <TableCell style={{ borderRight: "1px solid #ddd" }}>
                      {employee.UANNumber}
                    </TableCell>
                    <TableCell style={{ borderRight: "1px solid #ddd" }}>
                      {employee.BankName}
                    </TableCell>
                    <TableCell style={{ borderRight: "1px solid #ddd" }}>
                      {employee.IFSCCode}
                    </TableCell>
                    <TableCell style={{ borderRight: "1px solid #ddd" }}>
                      {employee.BankAccount}
                    </TableCell>
                    <TableCell style={{ borderRight: "1px solid #ddd" }}>
                      {employee.PaymentMode}
                    </TableCell>
                    <TableCell style={{ borderRight: "1px solid #ddd" }}>
                      {employee.WorkingDays}
                    </TableCell>
                    <TableCell style={{ borderRight: "1px solid #ddd" }}>
                      {employee.PayoutStatus}
                    </TableCell>
                    <TableCell style={{ borderRight: "1px solid #ddd" }}>
                      {employee.Gross}
                    </TableCell>
                    <TableCell style={{ borderRight: "1px solid #ddd" }}>
                      {employee.PayStatus}
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
                      {employee.IncomeTax}
                    </TableCell>
                    <TableCell style={{ borderRight: "1px solid #ddd" }}>
                      {employee.PFEmployer}
                    </TableCell>
                    <TableCell style={{ borderRight: "1px solid #ddd" }}>
                      {employee.PFEmployee}
                    </TableCell>
                    <TableCell style={{ borderRight: "1px solid #ddd" }}>
                      {employee.PT}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TableContainer
            component={Paper}
            sx={{
              width: "30%",
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
                    }}
                  >
                    Lop
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: "1px solid #ddd",
                      fontWeight: "bold",
                      fontSize: "16px",
                      color: "#1976D2",
                    }}
                  >
                    Net Pay
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: "1px solid #ddd",
                      fontWeight: "bold",
                      fontSize: "16px",
                      color: "#1976D2",
                    }}
                  >
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees2.map((employee, index) => (
                  <TableRow key={index}>
                    <TableCell style={{ borderRight: "1px solid #ddd" }}>
                      {employee.lop}
                    </TableCell>
                    <TableCell style={{ borderRight: "1px solid #ddd" }}>
                      {employee.netPay}
                    </TableCell>
                    <TableCell style={{ borderRight: "1px solid #ddd" }}>
                      {employee.status}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Paper>
  );
};

export default EmployeeTable;
