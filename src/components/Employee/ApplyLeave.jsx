import React, { useState, useContext, useEffect } from "react";
import Sidebar from "./common/Sidebar";
import Header from "./common/Header";
import Pending from "./Pending";
import LeaveHistory from "./LeaveHistory";
import {
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  InputLabel,
  FormControl,
  Alert,
  Select,
  MenuItem
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { differenceInDays, parseISO } from "date-fns";
import EmpContext from "../context/EmpContext";
import AdminContext from "../context/AdminContext";

const ApplyLeave = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [leaveType, setLeaveType] = useState('');  // Initial state
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [numberOfDays, setNumberOfDays] = useState('');
  const [leaveReason, setLeaveReason] = useState('');
  const [message, setMessage] = useState(null);
  const [view, setView] = useState('form');
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [leave, setLeave] = useState(null);
  const [holidayData, setHolidayData] = useState([]);
  const [closedDays, setClosedDays] = useState([]);
  const [includeholiday, setIncludeHoliday] = useState(true);
  const [includeweaklyholiday, setIncludeweaklyholiday] = useState(true);
  const [leaveTypeSettings, setLeaveTypeSettings] = useState([]);
  const { applyLeave, getLeave, getLeaveBalances } = useContext(EmpContext);
  const { getLeaveTypes, getHolidays, getOfficeTime } = useContext(AdminContext);
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    const fetchLeaveBalances = async () => {
      try {
        const response = await getLeaveBalances();
        setLeaveTypes(response.resultData);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchLeave = async () => {
      try {
        const leave = await getLeave();
        setLeave(leave.resultData);
      }
      catch (error) {
        console.error('Error fetching leave types:', error);
      }
    };
    const fetchLeaveType = async () => {
      try {
        const response = await getLeaveTypes();
        console.log(response)
        setLeaveTypes(response.resultData);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchHolidays = async () => {
      try {
        const data = await getHolidays();
        setHolidayData(data.resultData);
        console.log('holidays', data);
      } catch (error) {
        console.error("Error fetching holidays:", error);
      }
    };

    const fetchOfficeTime = async () => {
      try {
        const data = await getOfficeTime();
        console.log(data.resultData[0]);
        setClosedDays(data.resultData[0].closedDays || []);
        console.log('office time', data);
      } catch (error) {
        console.error("Error fetching office time:", error);
      }
    };
    fetchOfficeTime();
    fetchHolidays();
    fetchLeaveType();
    fetchLeave();
    fetchLeaveBalances();
    console.log(leaveType);
    let timer;
    if (message) {
      timer = setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [message, getLeave]);

  useEffect(() => {
    const fetchLeaveTypeSettings = async () => {
      if (leaveType) {
        try {
          const response = await getLeaveTypes();
          const filteredSettings = response.resultData.filter(type => type._id === leaveType);
          console.log(filteredSettings);
          setLeaveTypeSettings(filteredSettings[0] || {});
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchLeaveTypeSettings();
  }, [leaveType]);

  useEffect(() => {
    if (fromDate && toDate && leaveTypeSettings) {
      const days = calculateLeaveDays(fromDate, toDate, leaveTypeSettings);
      setNumberOfDays(days);
    } else {
      setNumberOfDays('');
    }
  }, [fromDate, toDate,]);

  const calculateLeaveDays = (fromDate, toDate, settings) => {
    const totalDays = differenceInDays(toDate, fromDate) + 1;
    let leaveDays = totalDays;

    const fromDateISO = parseISO(fromDate.toISOString().split("T")[0]);
    const toDateISO = parseISO(toDate.toISOString().split("T")[0]);

    if (!settings.includeHoliday) {
      // Filter out holidays within the leave period
      const holidaysWithinPeriod = holidayData.filter(holiday => {
        const holidayDateISO = parseISO(holiday.holidayDate.split("T")[0]);
        return holidayDateISO >= fromDateISO && holidayDateISO <= toDateISO;
      });
      console.log(holidaysWithinPeriod.length);
      leaveDays -= holidaysWithinPeriod.length;
    }

    if (!settings.includeWeeklyHoliday) {
      const daysWithinPeriod = [];
      for (let i = 0; i < totalDays; i++) {
        const currentDate = new Date(fromDate);
        currentDate.setDate(currentDate.getDate() + i);
        daysWithinPeriod.push(currentDate);
      }

      const closedDaysWithinPeriod = daysWithinPeriod.filter(date => {
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        return closedDays.includes(dayName);
      });
      console.log(closedDaysWithinPeriod.length);
      leaveDays -= closedDaysWithinPeriod.length;
    }

    return leaveDays;
  };
  const handleLeaveTypeChange = (event) => {
    setLeaveType(event.target.value);
    setFromDate(null);
    setToDate(null);
    setLeaveDays(0);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !fromDate ||
      !toDate ||
      numberOfDays <= 0 ||
      leaveType === '' ||
      leaveReason.trim() === ''
    ) {
      setMessage({ text: 'Please fill out all fields correctly', type: 'error' });
      return;
    }
    const leaveData = {
      leaveType,
      fromDate,
      toDate,
      numberOfDays,
      leaveReason,
    };
    const response = await applyLeave(leaveData);

    if (response && response.Success) {
      setMessage({ text: 'Leave Applied Successfully', type: 'success' });
    } else {
      const errorMessage = response?.Message || 'Not enough leave balance for the requested leave days';
      setMessage({ text: errorMessage, type: 'error' });
    }
    setLeaveType('');
    setFromDate(null);
    setToDate(null);
    setNumberOfDays('');
    setLeaveReason('');
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const getButtonStyle = (buttonView) => ({
    backgroundColor: view === buttonView ? '#1976d2' : 'transparent',
    color: view === buttonView ? '#fff' : '#000',
    borderColor: view === buttonView ? '#1976d2' : '#ccc',
    '&:hover': {
      backgroundColor: view === buttonView ? '#1565c0' : '#f0f0f0',
      borderColor: view === buttonView ? '#1565c0' : '#bbb',
    },
  });

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
            Apply Leave
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
          {message && (
            <Alert severity={message.type} onClose={() => setMessage(null)}>
              {message.text}
            </Alert>
          )}
          <Box display="flex" justifyContent="center" mb={2}>
            <Button
              variant="outlined"
              size="small"
              sx={{ fontSize: '0.75rem', width: '100px', ...getButtonStyle('form') }}
              onClick={() => handleViewChange('form')}
            >
              Apply
            </Button>
            <Button
              variant="outlined"
              size="small"
              sx={{ fontSize: '0.75rem', width: '100px', ...getButtonStyle('pending') }}
              onClick={() => handleViewChange('pending')}
            >
              Pending
            </Button>
            <Button
              variant="outlined"
              size="small"
              sx={{ fontSize: '0.75rem', width: '100px', ...getButtonStyle('history') }}
              onClick={() => handleViewChange('history')}
            >
              History
            </Button>
          </Box>
          {view === 'form' && (
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                maxWidth: '100%',
                margin: '0 auto',
                padding: 2,
                borderRadius: 2,
                boxShadow: 1,
                width: { xs: '90%', sm: '90%', md: '80%' },
              }}
            >
              <Typography variant="h5" gutterBottom>
                Add Leave Request
              </Typography>
              <Box p={1}>
                <Box
                  display="flex"
                  flexDirection={{ xs: 'column', sm: 'row' }}
                  gap={2}
                  mb={2}
                >
                  <FormControl fullWidth>
                    <InputLabel id="leave-type-label">Leave Type</InputLabel>
                    <Select
                      labelId="leave-type-label"
                      id="leave-type"
                      value={leaveType}
                      label="Leave Type"
                      onChange={handleLeaveTypeChange}
                      required
                    >
                      <MenuItem value="" disabled>Select Leave Type</MenuItem>  {/* Placeholder */}
                      {leaveTypes.map((type) => (
                        <MenuItem key={type._id} value={type._id}>
                          {type.type}({type.available} available)
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    label="Number of Days"
                    type="number"
                    value={numberOfDays}
                    onChange={(e) => setNumberOfDays(e.target.value)}
                    InputProps={{ readOnly: true }}
                    required
                    fullWidth
                  />
                </Box>
              </Box>
              <Box p={1}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', sm: 'row' },
                      gap: 2,
                    }}
                  >
                    <DatePicker
                      label="From Date"
                      value={fromDate}
                      onChange={(newValue) => setFromDate(newValue)}
                      minDate={new Date()}
                      renderInput={(params) => <TextField {...params} />}
                    />
                    <DatePicker
                      label="To Date"
                      value={toDate}
                      onChange={(newValue) => setToDate(newValue)}
                      minDate={new Date()}
                      renderInput={(params) => <TextField {...params} />}
                    />

                  </Box>
                </LocalizationProvider>
              </Box>
              <Box p={1}>
                <TextField
                  label="Leave Reason"
                  value={leaveReason}
                  onChange={(e) => {
                    if (e.target.value.length <= 150) {
                      setLeaveReason(e.target.value);
                    }
                  }}
                  multiline
                  rows={4}
                  required
                  fullWidth
                  helperText={`${leaveReason.length}/150`}
                  inputProps={{ maxLength: 150 }}
                />

              </Box>
              <Box p={1} display="flex" justifyContent="flex-end">
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Box>
            </Box>
          )}
          {view === 'pending' && <Pending leave={leave} />}
          {view === 'history' && <LeaveHistory leave={leave} />}
        </main>
      </div>
    </div>
  );
};

export default ApplyLeave;
