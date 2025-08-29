
import React, { useState } from 'react';
import Sidebar from './common/Sidebar';
import Header from './common/Header';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Tabs,
  Tab,
  Paper,
  Grid,
  useMediaQuery,
  useTheme,
  Divider,
} from "@mui/material";
import { Home, List, PlayCircleOutline } from "@mui/icons-material";
import EmployeeTable from "./EmployeeTable"; 
import PayrollSetup from "./PayrollSetup"; 


const Payroll = ({ children }) => {
  const [activeTab, setActiveTab] = useState("Overview"); // Default to Overview
  const [showTabs, setShowTabs] = useState(true); // Ensure tabs are shown by default
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [activeButton, setActiveButton] = useState("");

  const handleRunPayrollClick = () => {
    setActiveTab("Overview");
    setShowTabs(true); // Show tabs when "Run Payroll" is clicked
  };

  const handleSetupPayrollClick = () => {
    setActiveTab("PayrollSetup");
    setShowTabs(false); // Hide tabs when "Setup Payroll" is clicked
  };

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
    if (buttonType === "runPayroll") {
      handleRunPayrollClick();
    } else if (buttonType === "setupPayroll") {
      handleSetupPayrollClick();
    }
  };

  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
         
        <Header collapsed={collapsed} toggleSidebar={toggleSidebar} />
        <AppBar
        position="static"
      
        sx={{
          bgcolor: "#fff",
        
          marginTop: "7rem",
          zIndex: 2000,
          width: collapsed ? "calc(100% - 100px)" : "calc(100% - 270px)",
          // marginLeft: collapsed ? "100px" : "270px",
          padding: "20px 30px",
          // width:{xs:'0',md:'82.2%'},
          ml:'16.8rem'
        }}
      
      >
        <Toolbar
          sx={{
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                color: "#1976D2",
                fontWeight: "600",
                textAlign: isMobile ? "center" : "left",
                mb: isMobile ? 1 : 0,
              }}
            >
              PAYROLL | AUG 2024
            </Typography>

            <Box display={"flex"}>
              <Box>
                <Button
                  sx={{ fontWeight: "600" }}
                  onClick={() => handleButtonClick("runPayroll")}
                >
                  Run Payroll
                </Button>
                <Divider
                  sx={{
                    height: "2px",
                    backgroundColor:
                      activeButton === "runPayroll" ? "blue" : "white",
                  }}
                />
              </Box>

              <Box>
                <Button
                  sx={{ ml: 2, fontWeight: "600" }}
                  onClick={() => handleButtonClick("setupPayroll")}
                >
                  Setup Payroll
                </Button>
                <Divider
                  sx={{
                    height: "2px",
                    backgroundColor:
                      activeButton === "setupPayroll" ? "blue" : "white",
                  }}
                />
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              flexWrap: isMobile ? "wrap" : "nowrap",
              gap: isMobile ? 1 : 2,
              mt: isMobile ? 2 : 0,
            }}
          >
            <Button
              startIcon={<PlayCircleOutline />}
              variant="outlined"
              sx={{
                color: "#1976D2",
                borderColor: "#1976D2",
                mb: isMobile ? 1 : 0,
                mr: isMobile ? 1 : 2,
                fontSize: { xs: "0.55rem", sm: "1rem" },
                padding: { xs: "2px 4px", sm: "10px 16px" },
              }}
            >
              Getting Started
            </Button>
            <Button
              variant="outlined"
              sx={{
                color: "#1976D2",
                mb: isMobile ? 1 : 0,
                mr: isMobile ? 1 : 2,
              }}
            >
              Basic
            </Button>
            <Button
              variant="outlined"
              sx={{
                color: "#1976D2",
                mb: isMobile ? 1 : 0,
              }}
            >
              Expert
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
        <main style={{ 
           padding: "20px",
          //  width: collapsed ? "calc(100% - 100px)" : "calc(100% - 270px)",
          //  marginLeft: collapsed ? "100px" : "270px",
           marginTop: "80px",
          //  flexGrow: 1,
           background: "white",
           width:'100%',
           ml:'20rem'
           
          }}>
          {children}
          <Box
        sx={{
          flexGrow: 1,
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          // width:"80%",
          ml:'18rem',
          mr:'4rem'
      
        }}
      >
        {showTabs && (
          <Paper
            sx={{
              display: "flex",
              flexDirection: "row",
              borderLeft: "4px solid #CDCDCD",
              borderRight: "4px solid #CDCDCD",
              mb: 2,
              padding: 0,
              width: "23rem",
              height: "2.3rem",
              justifyContent: "center",
              alignItems: "center",
              mr: { xs: "0", md: "49rem" },
              mt:'-4rem'
            }}
          >
            <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
              <Tabs
                value={activeTab}
                onChange={(event, newValue) => setActiveTab(newValue)}
                aria-label="tabs"
                variant={isMobile ? "scrollable" : "standard"}
                scrollButtons="auto"
                sx={{
                  "& .MuiTabs-indicator": {
                    display: "none",
                  },
                }}
              >
                <Tab
                  icon={<Home />}
                  iconPosition="start"
                  label="Overview"
                  value="Overview"
                  sx={{
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    height: "2rem",
                  }}
                />
              </Tabs>
            </div>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ height: "auto", mx: 1 }}
            />
            <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
              <Tabs
                value={activeTab}
                onChange={(event, newValue) => setActiveTab(newValue)}
                aria-label="tabs"
                variant={isMobile ? "scrollable" : "standard"}
                scrollButtons="auto"
                sx={{
                  "& .MuiTabs-indicator": {
                    display: "none",
                  },
                }}
              >
                <Tab
                  icon={<List />}
                  iconPosition="start"
                  label="Pay Register"
                  value="Pay Register"
                  sx={{
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    height: "2rem",
                  }}
                />
              </Tabs>
            </div>
          </Paper>
        )}

        {activeTab === "Overview" && (
          <Paper elevation={3} sx={{ width: "100%", p: 2 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: "#1976D2",
                }}
              >
                Current Payroll
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                ml={2}
              >
                1 Aug - 31 Aug, 2024
              </Typography>
            </Box>

            <Paper
              elevation={3}
              sx={{
                mt: "1.5rem",
                p: 2,
                border: "2px solid #F0F0F0",
                bgcolor: "#F8F8F8",
              }}
            >
              <Grid
                container
                spacing={2}
                justifyContent="center"
                sx={{ gap: { xs: "0", md: "3.5rem" } }}
              >
                {[
                  { label: "Total Employees", value: 6 },
                  { label: "Payroll Completed", value: 0 },
                  { label: "Gross Pay", value: 27917 },
                  { label: "Net Pay", value: 25707 },
                  { label: "Total Payout", value: 0 },
                ].map((item, index, array) => (
                  <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
                    <Box display="flex" alignItems="center" height="100%">
                      <Grid
                        container
                        direction="column"
                        alignItems="center"
                        sx={{ flex: 1 }}
                      >
                        <Typography
                          variant="subtitle1"
                          align="center"
                          sx={{ fontWeight: 600, color: "#1976D2" }}
                        >
                          {item.label}
                        </Typography>
                        <Typography variant="h6" align="center">
                          {item.value}
                        </Typography>
                      </Grid>
                      {index < array.length - 1 && (
                        <Divider
                          orientation="vertical"
                          flexItem
                          sx={{
                            height: "3rem",
                            bgcolor: "#CCCCCC",
                            width: "2px",
                          }}
                        />
                      )}
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>

            <Paper
              elevation={3}
              sx={{
                mt: "2rem",
                p: 2,
                border: "2px solid #F0F0F0",
                bgcolor: "#F8F8F8",
              }}
            >
              <Grid
                container
                spacing={2}
                justifyContent="center"
                sx={{ gap: { xs: "0", md: "3.5rem" } }}
              >
                {[
                  { label: "INCOME TAX", value: 0 },
                  { label: "PF", value: 4020 },
                  { label: "ESI", value: 0 },
                  { label: "PT", value: 200 },
                  { label: "Payslip Generated", value: 0 },
                ].map((item, index, array) => (
                  <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
                    <Box display="flex" alignItems="center" height="100%">
                      <Grid
                        container
                        direction="column"
                        alignItems="center"
                        sx={{ flex: 1 }}
                      >
                        <Typography
                          variant="subtitle1"
                          align="center"
                          sx={{ fontWeight: 600, color: "#1976D2" }}
                        >
                          {item.label}
                        </Typography>
                        <Typography variant="h6" align="center">
                          {item.value}
                        </Typography>
                      </Grid>
                      {index < array.length - 1 && (
                        <Divider
                          orientation="vertical"
                          flexItem
                          sx={{
                            height: "3rem",
                            bgcolor: "#CCCCCC",
                            width: "2px",
                          }}
                        />
                      )}
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>

            <Box sx={{ textAlign: "right", mt: 2 }}>
              <Button variant="contained" color="primary">
                Next
              </Button>
            </Box>
          </Paper>
        )}

        {activeTab === "Pay Register" && <EmployeeTable />}

        {activeTab === "PayrollSetup" && <PayrollSetup />}
      </Box>
         
        </main>
       
      </div>
    </div>
  );
};



export default Payroll
