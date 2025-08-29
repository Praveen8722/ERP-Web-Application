import React, { useContext, useState, useEffect } from "react";
import Header from "./common/Header";
import Sidebar from "./common/Sidebar";
import {
    Paper,
    Box,
    Typography,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    MenuItem,
    Grid,
    Card,
    CardContent,
    Icon,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    FormControl,
    InputLabel,
    Select,
    Checkbox,
    ListItemText,
    Chip
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AdminContext from "../context/AdminContext";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options); 
};


const Holiday = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const { addHolidays, getHolidays, addOfficeTime, getOfficeTime } = useContext(AdminContext);
    const [openHolidayModal, setOpenHolidayModal] = useState(false);
    const [openOfficeTimeModal, setOpenOfficeTimeModal] = useState(false);
    const [holidayName, setHolidayName] = useState("");
    const [holidayDate, setHolidayDate] = useState("");
    const [holidayDay, setHolidayDay] = useState("");
    const [holidayData, setHolidayData] = useState([]);
    const [openingTime, setOpeningTime] = useState("");
    const [daysOpen, setDaysOpen] = useState([]); 
    const [closedDays, setClosedDays] = useState([]);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    const handleClickOpenHoliday = () => {
        setOpenHolidayModal(true);
    };

    const handleCloseHoliday = () => {
        setOpenHolidayModal(false);
    };

    const handleClickOpenOfficeTime = () => {
        setOpenOfficeTimeModal(true);
    };

    const handleCloseOfficeTime = () => {
        setOpenOfficeTimeModal(false);
    };
      
    useEffect(() => {
        const fetchHolidays = async () => {
            try {
                const data = await getHolidays();
                setHolidayData(data.resultData);
            } catch (error) {
                console.error("Error fetching holidays:", error);
            }
        };

        const fetchOfficeTime = async () => {
            try {
                const data = await getOfficeTime();
                setOpeningTime(data.resultData[0].openingTime || "");
                setDaysOpen(data.resultData.daysOpen || []);
                setClosedDays(data.resultData[0].closedDays || []);
            } catch (error) {
                console.error("Error fetching office time:", error);
            }
        };

        fetchOfficeTime();
        fetchHolidays();
    }, [getHolidays, getOfficeTime]);

    const handleHolidaySubmit = async () => {
        const holidayData = {
            holidayName,
            holidayDate,
            holidayDay
        };

        try {
            await addHolidays(holidayData);
            setOpenHolidayModal(false);
            setHolidayName("");
            setHolidayDate("");
            setHolidayDay("");
        } catch (error) {
            console.error("Error adding holiday:", error);
        }
    };

    const handleOfficeTimeSubmit = async () => {
        const officeTimeData = {
            openingTime,
            daysOpen: Array.isArray(daysOpen) ? daysOpen : [], 
            closedDays: Array.isArray(closedDays) ? closedDays : [], 
        };

        try {
            await addOfficeTime(officeTimeData);
            setOpenOfficeTimeModal(false);
            setOpeningTime("");
            setDaysOpen([]); 
            setClosedDays([]); 
        } catch (error) {
            console.error("Error adding office time details:", error);
        }
    };

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
            <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <Header collapsed={collapsed} toggleSidebar={toggleSidebar} />
                <Paper
                    elevation={3}
                    sx={{
                        position: "fixed",
                        marginTop: "70px",
                        zIndex: 2000,
                        width: collapsed ? "calc(100% - 100px)" : "calc(100% - 270px)",
                        marginLeft: collapsed ? "100px" : "270px",
                        padding: "20px 30px",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Typography
                            color="#abafdb"
                            fontFamily={"revert"}
                            fontSize={"22px"}
                            fontWeight={"550"}
                        >
                            Create Holidays
                        </Typography>
                        <Box>
                            <Button variant="contained" color="primary" onClick={handleClickOpenHoliday}>
                                Add Holidays
                            </Button>
                            <Button variant="contained" color="secondary" onClick={handleClickOpenOfficeTime} sx={{ marginLeft: '10px' }}>
                                Add Office Time
                            </Button>
                        </Box>
                    </Box>
                </Paper>
                <main
                    style={{
                        padding: "20px",
                        width: collapsed ? "calc(100% - 100px)" : "calc(100% - 270px)",
                        marginLeft: collapsed ? "100px" : "270px",
                        marginTop: "80px",
                        flexGrow: 1,
                        background: "white",
                    }}
                >
                    {children}
                    <Grid container spacing={2} sx={{ padding: '16px', marginTop: '3rem' }}>
                    <Grid item xs={12} sm={9}>
                            <Paper elevation={3} sx={{ padding: '16px', height: 'auto', maxHeight: { xs: 'none', sm: '40rem' }, overflow: 'hidden' }}>
                                <Typography variant="h6" gutterBottom sx={{ fontWeight: '600', color: '#1E88E5' }}>
                                    List of Holidays 2024
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    The following holidays will be observed in the Consulate General of India, Erbil during the year 2024:
                                </Typography>
                                <TableContainer component={Paper} sx={{ maxHeight: { xs: 'none', sm: 'calc(100vh - 200px)' }, overflowX: 'auto' }}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={{ border: '1px solid black', fontWeight: '600', color: '#1E88E5' }}>S. No.</TableCell>
                                                <TableCell sx={{ border: '1px solid black', fontWeight: '600', color: '#1E88E5' }}>Holiday</TableCell>
                                                <TableCell sx={{ border: '1px solid black', fontWeight: '600', color: '#1E88E5' }}>Holiday Date</TableCell>
                                                <TableCell sx={{ border: '1px solid black', fontWeight: '600', color: '#1E88E5' }}>Holiday Day</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {holidayData.map((row, index) => (
                                                <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? '#F6F6F6' : 'white' }}>
                                                    <TableCell sx={{ border: '1px solid black' }}>{index + 1}</TableCell>
                                                    <TableCell sx={{ border: '1px solid black' }}>{row.holidayName}</TableCell>
                                                    <TableCell sx={{ border: '1px solid black' }}>{formatDate(row.holidayDate)}</TableCell>
                                                    <TableCell sx={{ border: '1px solid black' }}>{row.holidayDay}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Card sx={{ height: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
                                        <Icon sx={{ fontSize: { xs: 30, sm: 70 }, color: '#6A1B9A', backgroundColor: '#F3E5F5', borderRadius: '50%', padding: '0px'}}>
                                            <AccessTimeIcon fontSize="inherit" sx={{mt:'-3.5rem'}} />
                                        </Icon>
                                    </Box>
                                    <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                                        Office Time
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                        {openingTime ? `${openingTime}` : 'No office time set'}
                                    </Typography>
                                    {closedDays.length > 0 && (
                                        <Typography variant="body2" color="text.secondary">
                                            Closed on: {closedDays.join(', ')}
                                        </Typography>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </main>
            </div>
            <Dialog open={openHolidayModal} onClose={handleCloseHoliday}>
                <DialogTitle>Add New Holiday</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter the details of the new holiday.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="holidayName"
                        label="Holiday Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={holidayName}
                        onChange={(e) => setHolidayName(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="holidayDate"
                        label="Holiday Date"
                        type="date"
                        fullWidth
                        variant="standard"
                        InputLabelProps={{ shrink: true }}
                        value={holidayDate}
                        onChange={(e) => setHolidayDate(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="holidayDay"
                        label="Holiday Day"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={holidayDay}
                        onChange={(e) => setHolidayDay(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseHoliday}>Cancel</Button>
                    <Button onClick={handleHolidaySubmit}>Add Holiday</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openOfficeTimeModal} onClose={handleCloseOfficeTime}>
                <DialogTitle>Set Office Time</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter the office time details.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="openingTime"
                        label="Opening Time"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={openingTime}
                        onChange={(e) => setOpeningTime(e.target.value)}
                    />
                    <FormControl fullWidth margin="dense" variant="standard">
                        <InputLabel id="daysOpen">Days Office Open</InputLabel>
                        <Select
                            labelId="daysOpen"
                            id="daysOpen"
                            multiple
                            value={daysOpen}
                            onChange={(e) => setDaysOpen(e.target.value)}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {(Array.isArray(selected) ? selected : []).map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </Box>
                            )}
                        >
                            {daysOfWeek.map((day) => (
                                <MenuItem key={day} value={day}>
                                    <Checkbox checked={daysOpen.indexOf(day) > -1} />
                                    <ListItemText primary={day} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="dense" variant="standard">
                        <InputLabel id="closedDays">Days Office Closed</InputLabel>
                        <Select
                            labelId="closedDays"
                            id="closedDays"
                            multiple
                            value={closedDays}
                            onChange={(e) => setClosedDays(e.target.value)}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {(Array.isArray(selected) ? selected : []).map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </Box>
                            )}
                        >
                            {daysOfWeek.map((day) => (
                                <MenuItem key={day} value={day}>
                                    <Checkbox checked={closedDays.indexOf(day) > -1} />
                                    <ListItemText primary={day} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseOfficeTime}>Cancel</Button>
                    <Button onClick={handleOfficeTimeSubmit}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Holiday;
