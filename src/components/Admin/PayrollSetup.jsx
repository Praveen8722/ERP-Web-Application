import React from "react";
import {
  AppBar,
  Tabs,
  Tab,
  Box,
  FormControl,
  Select,
  MenuItem,
  Switch,
  Typography,
  Paper,
  TextField,
  FormLabel,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AssignStructure from "./AssignStructure"; 
import CreateStructure from "./CreateStructure";

function PayrollSetup() {
  const [value, setValue] = React.useState(0);
  const [payCycle, setPayCycle] = React.useState({ from: 1, to: 31 });
  const [pfContribution, setPfContribution] = React.useState("Basic * 12%");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handlePayCycleChange = (event) => {
    const { name, value } = event.target;
    setPayCycle((prev) => ({ ...prev, [name]: value }));
  };

  const handleContributionChange = (event) => {
    setPfContribution(event.target.value);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Payroll Settings Tabs"
          sx={{
            bgcolor: "#EAECDD",
            '& .MuiTabs-flexContainer': {
              flexDirection: isSmallScreen ? 'column' : 'row',
            },
          }}
        >
          <Tab
            label="Payroll Settings"
            sx={{ fontWeight: "600", fontSize: { xs: 14, sm: 16 } }}
          />
          <Tab
            label="Assign Structure"
            sx={{ fontWeight: "600", fontSize: { xs: 14, sm: 16 } }}
          />
          <Tab
            label="Create Structure"
            sx={{ fontWeight: "600", fontSize: { xs: 14, sm: 16 } }}
          />
        </Tabs>
      </AppBar>
      <Paper sx={{ mt: 2, p: 2 }}>
        {value === 0 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              "@media (max-width: 600px)": {
                px: 1,
              },
            }}
          >
            {/* Content for Payroll Settings */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "flex-end", sm: "center" },
                gap: { xs: 1, sm: 70 },
                justifyContent: { xs: "flex-end", sm: "flex-start" },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: 14, sm: 16 },
                  fontWeight: '600',
                  color: 'grey',
                  mr: { xs: "15.5rem", md: "0rem" },
                }}
              >
                Pay Cycle:
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "row", sm: "row" },
                  alignItems: "center",
                  gap: { xs: 1, sm: 2 },
                  justifyContent: { xs: "flex-end", sm: "flex-start" },
                  width: { xs: "100%", sm: "auto" },
                }}
              >
                <Typography sx={{ fontSize: { xs: 14, sm: 16 } }}>
                  From
                </Typography>
                <TextField
                  type="number"
                  name="from"
                  value={payCycle.from}
                  onChange={handlePayCycleChange}
                  sx={{
                    width: { xs: "100%", sm: 80 },
                    maxWidth: 120,
                    "& .MuiInputBase-input": {
                      height: "1rem",
                      padding: "0.5rem",
                    },
                    "& .MuiFormControl-root": {
                      height: "1rem",
                    },
                  }}
                  inputProps={{ min: 1, max: 31 }}
                />
                <Typography sx={{ fontSize: { xs: 14, sm: 16 } }}>
                  To
                </Typography>
                <TextField
                  type="number"
                  name="to"
                  value={payCycle.to}
                  onChange={handlePayCycleChange}
                  sx={{
                    width: { xs: "100%", sm: 80 },
                    maxWidth: 120,
                    "& .MuiInputBase-input": {
                      height: "1rem",
                      padding: "0.5rem",
                    },
                    "& .MuiFormControl-root": {
                      height: "1rem",
                    },
                  }}
                  inputProps={{ min: 1, max: 31 }}
                />
              </Box>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 7.5 }}>
                <Typography variant="h6" sx={{ fontSize: { xs: 14, sm: 16 }, fontWeight: '600', color: 'grey', }}>
                  Does your company have PF?
                </Typography>
                <Switch sx={{ ml: { xs: "0", md: "21rem" } }} />
              </Box>
              <FormControl fullWidth>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    maxWidth: 955,
                    maxHeight: "1rem",
                    mb: 1,
                  }}
                >
                  <FormLabel
                    sx={{
                      fontSize: { xs: 14, sm: 16 },
                      fontWeight: '600', color: 'grey',
                      marginRight: "auto",
                    }}
                  >
                    Employee Contribution
                  </FormLabel>
                  <Select
                    value={pfContribution}
                    onChange={handleContributionChange}
                    sx={{
                      fontSize: { xs: 14, sm: 16 },
                      width: { xs: "8rem", md: "20rem" },
                      height: { xs: "2rem", md: "2rem" },
                    }}
                  >
                    <MenuItem value="Basic * 12%">Basic * 12%</MenuItem>
                    <MenuItem value="Basic * 10%">Basic * 10%</MenuItem>
                  </Select>
                </Box>
              </FormControl>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 13.5 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: { xs: 14, sm: 16, fontWeight: '600', color: 'grey', } }}
                  >
                    PF Ceiling at Rs. 15000
                  </Typography>
                  <Switch sx={{ ml: { xs: "0", md: "21.5rem" } }} />
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: { xs: 14, sm: 16, fontWeight: '600', color: 'grey', } }}
                  >
                    Does your company have ESI?
                  </Typography>
                  <Switch sx={{ ml: { xs: "0", md: "21rem" } }} />
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: { xs: 14, sm: 16, fontWeight: '600', color: 'grey', } }}
                  >
                    Do you deduct Professional Tax?
                  </Typography>
                  <Switch sx={{ ml: { xs: "0", md: "20.8rem" } }} />
                </Box>
              </Box>
            </Box>
          </Box>
        )}

        {value === 1 && (
          <AssignStructure /> // Render AssignStructure component when the 2nd tab is selected
        )}
      
      {value === 2 && (
          <CreateStructure /> // Render AssignStructure component when the 2nd tab is selected
        )}
      </Paper>
    </Box>
  );
}

export default PayrollSetup;
