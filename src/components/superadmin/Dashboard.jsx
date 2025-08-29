import React, { useState } from "react";
import dayjs from "dayjs";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Paper,
} from "@mui/material";
import { CalendarToday, Search } from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import OpenTaskBar from "./common/OpenTaskBar";
import { PieChart } from "@mui/x-charts/PieChart";
import Stack from "@mui/material/Stack";
import { FaChartLine, FaColumns, FaRegCalendarAlt } from "react-icons/fa";

const pieParams = { height: 300, margin: { right: 5 } };
const pieParams2 = { height: 300, margin: { right: 5 } };
const palette = ["#6677ef", "#47c363", "#fc544b", "#3abaf4"];
const palette2 = ["#5e001f", "#00e1d9", "#f2bc94"];

const Dashboard = () => {
  const users = [
    { id: 6, name: "Adrian Bell" },
    { id: 2, name: "Aiden Bulter" },
    { id: 487, name: "ameen" },
    { id: 506, name: "Aryan2" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [customDateRange, setCustomDateRange] = useState([null, null]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleChangeUser = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleChangeDateRange = (event) => {
    setDateRange(event.target.value);
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDateRange = () => {
    if (dateRange === "today") {
      const today = dayjs().format("MMM DD, YYYY");
      return `${today} - ${today}`;
    }
    if (dateRange === "thisWeek") {
      const startOfWeek = dayjs().startOf("week").format("MMM DD, YYYY");
      const endOfWeek = dayjs().endOf("week").format("MMM DD, YYYY");
      return `${startOfWeek} - ${endOfWeek}`;
    }
    if (dateRange === "lastWeek") {
      const startOfLastWeek = dayjs()
        .subtract(1, "week")
        .startOf("week")
        .format("MMM DD, YYYY");
      const endOfLastWeek = dayjs()
        .subtract(1, "week")
        .endOf("week")
        .format("MMM DD, YYYY");
      return `${startOfLastWeek} - ${endOfLastWeek}`;
    }
    if (dateRange === "thisMonth") {
      const startOfMonth = dayjs().startOf("month").format("MMM DD, YYYY");
      const endOfMonth = dayjs().endOf("month").format("MMM DD, YYYY");
      return `${startOfMonth} - ${endOfMonth}`;
    }
    if (dateRange === "lastMonth") {
      const startOfLastMonth = dayjs()
        .subtract(1, "month")
        .startOf("month")
        .format("MMM DD, YYYY");
      const endOfLastMonth = dayjs()
        .subtract(1, "month")
        .endOf("month")
        .format("MMM DD, YYYY");
      return `${startOfLastMonth} - ${endOfLastMonth}`;
    }
    if (dateRange === "custom" && customDateRange[0] && customDateRange[1]) {
      const start = dayjs(customDateRange[0]).format("MMM DD, YYYY");
      const end = dayjs(customDateRange[1]).format("MMM DD, YYYY");
      return `${start} - ${end}`;
    }
    return "Select Date Range";
  };

  return (
    <>
      <Box padding={3}>
        <Card >
          <CardContent >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                p: 1,
                m: 1,
                bgcolor: "background.paper",
                borderRadius: 1,
                paddingBottom:'150px'
              }}
            >
              <Box>
                <Typography variant="h5" className="dashboard-sub-title">
                  User Report
                  <span className="text-muted font-size-15px hours"></span>
                </Typography>
              </Box>
              <Box display="flex" gap={2}>
                <Box className="colUsers" sx={{ flex: 1, padding: "0px" }}>
                  <Select
                    id="userId"
                    className="user_filter_dropdown"
                    value={selectedUser}
                    onChange={handleChangeUser}
                    displayEmpty
                    fullWidth
                    sx={{
                      fontSize: "16px",
                      padding: "0px 10px",
                    }}
                    renderValue={(selected) => {
                      if (selected === "") {
                        return <em>Select User</em>;
                      }
                      return users.find((user) => user.id === selected).name;
                    }}
                  >
                    <MenuItem disabled value="">
                      <em>Select User</em>
                    </MenuItem>
                    <MenuItem>
                      <TextField
                        id="myInput"
                        placeholder="Search.."
                        onChange={handleSearch}
                        value={searchTerm}
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Search />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          "& .MuiInputBase-root": {
                            fontSize: "16px",
                            padding: "14px 20px 12px 45px",
                            border: "none",
                            borderBottom: "1px solid #ddd",
                          },
                          "&:focus-within .MuiInputBase-root": {
                            outline: "3px solid #ddd",
                          },
                        }}
                      />
                    </MenuItem>
                    {filteredUsers.map((user) => (
                      <MenuItem key={user.id} value={user.id}>
                        {user.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
                <Box
                  className="time_range time_range_width w-100"
                  sx={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #ccc",
                    borderRadius: 1,
                    minWidth: "200px",
                  }}
                >
                  <Select
                    value={dateRange}
                    onChange={handleChangeDateRange}
                    displayEmpty
                    fullWidth
                    sx={{
                      fontSize: "14px",
                      padding: "0px 0px",
                      border: "none",
                    }}
                    renderValue={(selected) => {
                      return (
                        <Box display="flex" alignItems="center" flexDirection="row">
                          <FaRegCalendarAlt />
                          
                          <Box display="flex" flexDirection="row" flexWrap="wrap" ml={1}>
                            <span>
                              {selected === ""
                                ? "Select Date Range"
                                :formatDateRange().split(" - ")[0]} 
                            </span>
                            {selected !== "" && (
                              <span>{formatDateRange().split(" - ")[1]}</span>
                            )}
                          </Box>
                        </Box>
                      );
                    }}
                  >
                    
                    <MenuItem value="today" className="text-primary">
                      Today
                    </MenuItem>
                    <MenuItem value="thisWeek" className="text-primary">
                      This Week
                    </MenuItem>
                    <MenuItem value="lastWeek" className="text-primary">
                      Last Week
                    </MenuItem>
                    <MenuItem value="thisMonth" className="text-primary">
                      This Month
                    </MenuItem>
                    <MenuItem value="lastMonth" className="text-primary">
                      Last Month
                    </MenuItem>
                  </Select>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
        <Card className="mt-5">
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                p: 1,
                m: 1,
                bgcolor: "background.paper",
                borderRadius: 1,
              }}
            >
              <Box>
                <Typography variant="h5" className="dashboard-sub-title">
                  Daily Work Report
                  <span className="text-muted font-size-15px hours"></span>
                </Typography>
              </Box>
              <Box>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={selectedDate}
                    onChange={handleDateChange}
                    format="MMM DD, YYYY"
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Box>
            </Box>
            <Box id="work-report-container" paddingTop={2}>
              {/* Replace with your chart or content */}
              <canvas id="daily-work-report"></canvas>
            </Box>
          </CardContent>
        </Card>
        <Card className="my-5">
          <CardContent className="p-5">
            <Box>
              <Typography variant="h5" className="dashboard-sub-title">
                Open Tasks
              </Typography>
              <div>
                <OpenTaskBar />
              </div>
            </Box>
          </CardContent>
        </Card>
        <div className="row">
          <div className="col-lg-6">
            <Card className="my-5 p-3">
              <CardContent>
                <Box>
                  <Typography variant="h5" className="dashboard-sub-title">
                    Project Status
                  </Typography>
                </Box>
                <Stack
                  direction="row"
                  width="100%"
                  textAlign="center"
                  spacing={2}
                  className="mb-5 mt-4"
                >
                  <Box flexGrow={1}>
                    <PieChart
                      colors={palette}
                      series={[
                        {
                          data: [
                            { value: 8.68 },
                            { value: 87.88 },
                            { value: 1.08 },
                            { value: 2 },
                          ],
                        },
                      ]}
                      {...pieParams}
                    />
                  </Box>
                </Stack>
                <div className="d-flex flex-row justify-content-between">
                  <div className="d-flex flex-column align-items-center">
                    <div>
                      <FaChartLine color="#6677ef" size={30} />
                    </div>
                    <div>
                      <h3 className="percentage-text">8.68 %</h3>
                    </div>
                    <div>
                      <p className="text-muted">Finished</p>
                    </div>
                  </div>
                  <div className="d-flex flex-column align-items-center">
                    <div>
                      <FaChartLine color="#47c363" size={30} />
                    </div>
                    <div>
                      <h3 className="percentage-text">87.88 %</h3>
                    </div>
                    <div>
                      <p className="text-muted">Ongoing</p>
                    </div>
                  </div>
                  <div className="d-flex flex-column align-items-center">
                    <div>
                      <FaChartLine color="#fc544b" size={30} />
                    </div>
                    <div>
                      <h3 className="percentage-text">1.08 %</h3>
                    </div>
                    <div>
                      <p className="text-muted">OnHold</p>
                    </div>
                  </div>
                  <div className="d-flex flex-column align-items-center">
                    <div>
                      <FaChartLine color="#3abaf4" size={30} />
                    </div>
                    <div>
                      <h3 className="percentage-text">2 %</h3>
                    </div>
                    <div>
                      <p className="text-muted">Archived</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="col-lg-6">
            <Card className="my-5 p-3">
              <CardContent>
                <Box>
                  <Typography variant="h5" className="dashboard-sub-title">
                    Invoice Status
                  </Typography>
                </Box>
                <Stack
                  direction="row"
                  width="100%"
                  textAlign="center"
                  spacing={2}
                  className="mt-4 mb-5"
                >
                  <Box flexGrow={1}>
                    <PieChart
                      colors={palette2}
                      series={[
                        {
                          data: [{ value: 0 }, { value: 0 }, { value: 100 }],
                          innerRadius: 70,
                          outerRadius: 140,
                          paddingAngle: 0.5,
                          cornerRadius: 5,
                          startAngle: 0,
                          endAngle: 360,
                        },
                      ]}
                      {...pieParams2}
                    />
                  </Box>
                </Stack>
                <div className="d-flex flex-row justify-content-between px-5">
                  <div className="d-flex flex-column align-items-center ">
                    <div>
                      <FaColumns color="#5e001f" size={30} />
                    </div>
                    <div>
                      <h3 className="percentage-text">0 %</h3>
                    </div>
                    <div>
                      <p className="text-muted">DRAFT</p>
                    </div>
                  </div>
                  <div className="d-flex flex-column align-items-center">
                    <div>
                      <FaColumns color="#00e1d9" size={30} />
                    </div>
                    <div>
                      <h3 className="percentage-text">0 %</h3>
                    </div>
                    <div>
                      <p className="text-muted">SENT</p>
                    </div>
                  </div>
                  <div className="d-flex flex-column align-items-center">
                    <div>
                      <FaColumns color="#f2bc94" size={30} />
                    </div>
                    <div>
                      <h3 className="percentage-text">100 %</h3>
                    </div>
                    <div>
                      <p className="text-muted">PAID</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Box>
    </>
  );
};

export default Dashboard;
