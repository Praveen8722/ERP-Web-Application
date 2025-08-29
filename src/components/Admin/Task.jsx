import React, { useContext, useState,useEffect } from 'react';
import {
    Container,
    Grid,
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
    Modal,
    TextField,
    Checkbox,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Chip,
    Box,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton
} from '@mui/material';
import {  Form, Badge,Dropdown } from 'react-bootstrap';

import AdminContext from '../context/AdminContext';
import { formatDistanceToNow } from 'date-fns';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
const Task = ({ data,id }) => {
    const [showModal, setShowModal] = useState(false);
    const [tasks, setTasks] = useState([]);
    const { createTask,getTask} = useContext(AdminContext);
    const [title, setTitle] = useState('');
    const projectId=id;
    const [priority, setPriority] = useState('');
    const [selectedAssignees, setSelectedAssignees] = useState([]);
    const [dueDate, setDueDate] = useState('');
    const [estimateTimeHours, setEstimateTimeHours] = useState('');
    const [estimateTimeDays, setEstimateTimeDays] = useState('');
    const [attachments, setAttachments] = useState([]);
    const [description, setDescription] = useState('');

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setAttachments([...attachments, ...files]);
    };

    const handleRemoveAttachment = (index) => {
        const newAttachments = [...attachments];
        newAttachments.splice(index, 1);
        setAttachments(newAttachments);
    };
    useEffect(() => {
        const fetchTask= async () => {
            try {
                const response = await getTask(id);
                const taskData = response.resultData || {};
               setTasks(taskData);
            } catch (error) {
                console.error("Error fetching project:", error);
            }
        };
        fetchTask();
    }, []);
    const handleAddTask = async (e) => {
        e.preventDefault();
        const newTask = {
            title,
            projectId,
            priority,
            assignees: selectedAssignees,
            dueDate,
            estimateTimeHours,
            estimateTimeDays,
            attachments,
            description
        };

        try {
            await createTask(newTask);
            setTasks([...tasks, newTask]);
            handleClose();
            setTitle('');
            setPriority('');
            setSelectedAssignees([]);
            setDueDate('');
            setEstimateTimeHours('');
            setEstimateTimeDays('');
            setAttachments([]);
            setDescription('');
        } catch (error) {
            console.error('Error saving task:', error);
        }
    };

    return (
        <Container>
            <Box display="flex" justifyContent="flex-end" mb={3}>
                <Button variant="contained" color="primary" onClick={handleShow}>
                    Add Task
                </Button>
            </Box>
            <Grid container spacing={3}>
            {tasks.map((task, index) => (
                <Grid item key={index} xs={12}>
                    <Card>
                        <Box display="flex" alignItems="center" p={2}>
                            <Typography variant="h6" style={{ flexGrow: 1 }}>
                                {task.taskName}
                            </Typography>
                            <Box display="flex" alignItems="center">
                                <Button style={{ marginRight: 10, borderRadius: '50%',  color:'orange'}}>{task.Priority}</Button>
                                <Typography variant="body2" style={{ marginLeft: 10 }}>
                                    {formatDistanceToNow(new Date(task.createdAt))} ago
                                </Typography>
                                <Button size="small" color="primary" startIcon={<EditIcon />} style={{ marginLeft: 10 }}>
                                    Edit
                                </Button>
                                <Button size="small" color="secondary" startIcon={<DeleteIcon />} style={{ marginLeft: 5 }}>
                                    Delete
                                </Button>
                                <Button size="small" color="primary" startIcon={<MoreHorizIcon />} style={{ marginLeft: 5 }}>
                                    More
                                </Button>
                            </Box>
                        </Box>
                    </Card>
                </Grid>
            ))}
        </Grid>
            <Modal open={showModal} onClose={handleClose}>
                <Box
                    component="form"
                    onSubmit={handleAddTask}
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '50%',
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: '8px',
                        overflowY: 'auto',
                        maxHeight: '90vh'
                    }}
                >
                    <Typography variant="h6" component="h2" mb={2}>
                        New Task
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="title"
                                label="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                           
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="priority-label">Priority</InputLabel>
                                <Select
                                    labelId="priority-label"
                                    id="priority"
                                    value={priority}
                                    onChange={(e) => setPriority(e.target.value)}
                                    label="Priority"
                                >
                                    <MenuItem value=""><em>Select Priority</em></MenuItem>
                                    <MenuItem value="highest">HIGHEST</MenuItem>
                                    <MenuItem value="high">HIGH</MenuItem>
                                    <MenuItem value="medium">MEDIUM</MenuItem>
                                    <MenuItem value="low">LOW</MenuItem>
                                    <MenuItem value="lowest">LOWEST</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="assignee-label">Assign To</InputLabel>
                                <Select
                                    labelId="assignee-label"
                                    id="assignee"
                                    multiple
                                    value={selectedAssignees}
                                    onChange={(e) => setSelectedAssignees(e.target.value)}
                                    renderValue={(selected) => (
                                        <div>
                                            {selected.map((value) => (
                                                <Chip key={value} label={data.employee.find(emp => emp._id === value)?.fullName} style={{ margin: 2 }} />
                                            ))}
                                        </div>
                                    )}
                                >
                                    {data.employee.map((employee) => (
                                        <MenuItem key={employee._id} value={employee._id}>
                                            <Checkbox checked={selectedAssignees.indexOf(employee._id) > -1} />
                                            <ListItemText primary={employee.fullName} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin="normal"
                                fullWidth
                                id="dueDate"
                                label="Due Date"
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                id="estimateTimeHours"
                                label="Estimate Time (Hours)"
                                type="number"
                                value={estimateTimeHours}
                                onChange={(e) => setEstimateTimeHours(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                id="estimateTimeDays"
                                label="Estimate Time (Days)"
                                type="number"
                                value={estimateTimeDays}
                                onChange={(e) => setEstimateTimeDays(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                margin="normal"
                                fullWidth
                                id="description"
                                label="Description"
                                multiline
                                rows={4}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                component="label"
                                fullWidth
                                sx={{ mt: 2 }}
                            >
                                Upload File
                                <input
                                    type="file"
                                    hidden
                                    multiple
                                    onChange={handleFileChange}
                                />
                            </Button>
                            {attachments.length > 0 && (
                                <Box mt={2}>
                                    <Typography variant="subtitle2">Attachments:</Typography>
                                    <List dense>
                                        {attachments.map((file, index) => (
                                            <ListItem key={index}>
                                                <ListItemText primary={file.name} />
                                                <ListItemSecondaryAction>
                                                    <IconButton edge="end" onClick={() => handleRemoveAttachment(index)}>
                                                        <AttachFileIcon />
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Box>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </Container>
    );
};

export default Task;
