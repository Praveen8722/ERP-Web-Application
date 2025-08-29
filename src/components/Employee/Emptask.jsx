import React, { useState, useEffect, useContext } from 'react';
import {
    Container,
    Grid,
    Card,
    Box,
    Typography,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputLabel,
    TextField,
    Alert,
} from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import EditIcon from '@mui/icons-material/Edit';
import EmpContext from '../context/EmpContext';

const Emptask = ({ id }) => {
    const [tasks, setTasks] = useState([]);
    const { getTask, markAttendance } = useContext(EmpContext);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [priority, setPriority] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [timeUnit, setTimeUnit] = useState('hours');
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await getTask(id);
                console.log('get', response);
                const taskData = response.resultData || [];
                setTasks(taskData);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        fetchTask();
    }, [getTask, id]);

    useEffect(() => {
        // Set a timer to clear the message after 5 seconds
        let timer;
        if (message) {
            timer = setTimeout(() => {
                setMessage(null);
            }, 5000); // 5000 milliseconds = 5 seconds
        }

        // Cleanup the timer if the component unmounts or if a new message is set
        return () => clearTimeout(timer);
    }, [message]);

    const handleOpenDialog = (task) => {
        setSelectedTask(task);
        setPriority(task.Priority || '');
        setStartTime('');
        setEndTime('');
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedTask(null);
    };

    const handleEndTimeChange = (e) => {
        setEndTime(e.target.value);
    };

    const handlePriorityChange = (event) => {
        setPriority(event.target.value);
    };

    const handleTimeUnitChange = (event, newTimeUnit) => {
        if (newTimeUnit !== null) {
            setTimeUnit(newTimeUnit);
        }
    };

    const handleSubmit = async () => {
        try {
            const attendanceData = {
                startTime,
                endTime,
            };
            console.log(attendanceData);
            const response = await markAttendance(attendanceData);
            if (response.Success) {
                setMessage({ text: "Marked attendance successfully", type: "success" });
            } else {
                setMessage({ text: response.Message, type: "error" });
            }
            handleCloseDialog();
        } catch (error) {
            console.error("Error submitting attendance:", error);
            setMessage({ text: "Error submitting attendance", type: "error" });
        }
    };

    return (
        <Container>
            {message && (
                <Alert severity={message.type} onClose={() => setMessage(null)}>
                    {message.text}
                </Alert>
            )}
            <Grid container spacing={3}>
                {tasks.map((task, index) => (
                    <Grid item key={index} xs={12}>
                        <Card>
                            <Box display="flex" alignItems="center" p={2}>
                                <Typography variant="h6" style={{ flexGrow: 1 }}>
                                    {task.taskName}
                                </Typography>
                                <Box display="flex" alignItems="center">
                                    <Button style={{ marginRight: 10, borderRadius: '50%', color: 'orange' }}>
                                        {task.Priority}
                                    </Button>
                                    <Typography variant="body2" style={{ marginLeft: 10 }}>
                                        {formatDistanceToNow(new Date(task.createdAt))} ago
                                    </Typography>
                                    <Button
                                        size="small"
                                        color="primary"
                                        startIcon={<EditIcon />}
                                        style={{ marginLeft: 10 }}
                                        onClick={() => handleOpenDialog(task)}
                                    >
                                        Update your work
                                    </Button>
                                </Box>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {selectedTask && (
                <Dialog open={openDialog} onClose={handleCloseDialog}>
                    <DialogTitle sx={{ fontWeight: '600', color: 'grey' }}>Mark Attendance</DialogTitle>
                    <DialogContent>
                        <Box display="flex" flexWrap="wrap" justifyContent="space-between" gap={2} width={'18rem'}>
                            <Box display="flex" flexDirection="column" width="100%">
                                <InputLabel> {selectedTask.taskName}</InputLabel>
                            </Box>
                            <Box display="flex" flexDirection="column" width="100%">
                                <InputLabel>Estimate Time</InputLabel>
                                <Box display="flex" flexDirection="row" alignItems="center" mb={2}>
                                    <Box display="flex" flexDirection="column" mr={2}>
                                        <InputLabel sx={{ fontSize: '13px' }}>From in hours:</InputLabel>
                                        <TextField
                                            variant="outlined"
                                            type="time"
                                            sx={{ maxWidth: '200px' }}
                                            value={startTime}
                                            onChange={(e) => setStartTime(e.target.value)}
                                        />
                                    </Box>
                                    <Box display="flex" flexDirection="column">
                                        <InputLabel sx={{ fontSize: '13px' }}>To in hours:</InputLabel>
                                        <TextField
                                            variant="outlined"
                                            type='time'
                                            sx={{ maxWidth: '200px' }}
                                            value={endTime}
                                            onChange={handleEndTimeChange}
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="primary" variant="outlined" sx={{ mr: '6.4rem' }}>
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} variant="contained" color="primary" sx={{ mr: '1rem' }}>
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </Container>
    );
};

export default Emptask;
