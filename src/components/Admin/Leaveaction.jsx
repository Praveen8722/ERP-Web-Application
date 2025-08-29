import React, { useState, useContext, useEffect } from "react";
import Sidebar from './common/Sidebar';
import Header from './common/Header';
import { useLocation } from 'react-router-dom';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Grid,
    Divider,
    Paper,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";
import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineOppositeContent,
} from "@mui/lab";
import AdminContext from "../context/AdminContext";

const LeaveAction = ({ children }) => {
    const location = useLocation();
    const { getLeaveorgbyid, updateLeaveStatus, getLeaveBalancesemp } = useContext(AdminContext);

    const { id } = location.state || {};
    const [openModal, setOpenModal] = useState(false);
    const [rejectionReason, setRejectionReason] = useState('');
    const [emp, setEmp] = useState(null);
    const [status, setStatus] = useState('');
    const [avalLeave, setAvalLeave] = useState('');
    const [leaveTypeId, setLeaveTypeId] = useState(null);
    const [leaveDetails, setLeaveDetails] = useState(null);
    const [empId, setEmpId] = useState(null);
    const [collapsed, setCollapsed] = useState(false);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    const handleApprove = async () => {
        try {
            await updateLeaveStatus(id, 'Approved'); 
            const updatedLeave = await getLeaveorgbyid(id);
            setLeaveDetails(updatedLeave.resultData[0]);
            setStatus(updatedLeave.resultData[0].status);
        } catch (error) {
            console.error("Error approving leave:", error);
        }
    };

    const handleReject = async () => {
        if (status !== "Pending") return; 

        try {
            await updateLeaveStatus(id, 'Rejected', rejectionReason); 
            const updatedLeave = await getLeaveorgbyid(id);
            setLeaveDetails(updatedLeave.resultData[0]);
            setStatus(updatedLeave.resultData[0].status);

            handleCloseModal();
        } catch (error) {
            console.error("Error rejecting leave:", error);
        }
    };

    useEffect(() => {
        const fetchLeave = async () => {
            try {
                const leave = await getLeaveorgbyid(id);
                setLeaveDetails(leave.resultData[0]);
                const employee = leave.resultData[0].empid || {};
                setEmp(employee);
                setStatus(leave.resultData[0].status || '');
                setEmpId(employee._id);
            
                setLeaveTypeId(leave.resultData[0].leaveType._id);
            } catch (error) {
                console.error("Error fetching leave:", error);
            }
        };

        const fetchBalance = async () => {
            if (empId && leaveTypeId) {
                try {
                    const balance = await getLeaveBalancesemp(empId, leaveTypeId);
                    setAvalLeave(balance.resultData.availableLeaves);
                } catch (error) {
                    console.error("Error fetching leave balance:", error);
                }
            }
        };

        fetchLeave();
        fetchBalance();
    }, [id, getLeaveorgbyid, getLeaveBalancesemp, empId, leaveTypeId]);

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
            <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <Header collapsed={collapsed} toggleSidebar={toggleSidebar} />
                <main style={{
                    padding: "20px",
                    width: collapsed ? "calc(100% - 100px)" : "calc(100% - 270px)",
                    marginLeft: collapsed ? "100px" : "270px",
                    marginTop: "80px",
                    flexGrow: 1,
                    background: "white",
                }}>
                    {children}
                    <Box p={2} sx={{ mt: '3rem' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={8}>
                                <Card>
                                    <CardContent sx={{ border: "2px solid #F2F8F8" }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Box sx={{ mb: 2, p: 2, borderRadius: 1 }}>
                                                    <Typography variant="h6" gutterBottom fontWeight={600} color={"grey"}>
                                                        Employee Details
                                                    </Typography>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12}>
                                                            <Box display="flex" flexDirection="column">
                                                                <Grid container spacing={1} alignItems="center">
                                                                    <Grid item xs={4}>
                                                                        <Typography variant="body1" fontWeight={500} color={"#1976D2"}>
                                                                            ID:
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid item xs={8}>
                                                                        <Box display="flex" justifyContent="flex-end">
                                                                            <Typography variant="body1" fontWeight={400} color={"#000"} style={{ marginRight: "40rem" }}>
                                                                                {emp?.uniqueId || 'N/A'}
                                                                            </Typography>
                                                                        </Box>
                                                                    </Grid>
                                                                </Grid>

                                                                <Grid container spacing={1} alignItems="center">
                                                                    <Grid item xs={4}>
                                                                        <Typography variant="body1" fontWeight={500} color={"#1976D2"}>
                                                                            Name:
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid item xs={8}>
                                                                        <Box display="flex" justifyContent="flex-end">
                                                                            <Typography variant="body1" fontWeight={400} color={"#000"} style={{ marginRight: "40rem" }}>
                                                                                {emp?.fullName || 'N/A'}
                                                                            </Typography>
                                                                        </Box>
                                                                    </Grid>
                                                                </Grid>

                                                                <Grid container spacing={1} alignItems="center">
                                                                    <Grid item xs={4}>
                                                                        <Typography variant="body1" fontWeight={500} color={"#1976D2"}>
                                                                            Email:
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid item xs={8}>
                                                                        <Box display="flex" justifyContent="flex-end">
                                                                            <Typography variant="body1" fontWeight={400} color={"#000"} style={{ marginRight: "34.4rem" }}>
                                                                                {emp?.email || 'N/A'}
                                                                            </Typography>
                                                                        </Box>
                                                                    </Grid>
                                                                </Grid>

                                                                <Grid container spacing={1} alignItems="center">
                                                                    <Grid item xs={4}>
                                                                        <Typography variant="body1" fontWeight={500} color={"#1976D2"}>
                                                                            Phone:
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid item xs={8}>
                                                                        <Box display="flex" justifyContent="flex-end">
                                                                            <Typography variant="body1" fontWeight={400} color={"#000"} style={{ marginRight: "36rem" }}>
                                                                                {emp?.phone || 'N/A'}
                                                                            </Typography>
                                                                        </Box>
                                                                    </Grid>
                                                                </Grid>
                                                            </Box>
                                                        </Grid>
                                                    </Grid>
                                                </Box>

                                                {leaveDetails && (
                                                    <>
                                                        <Box sx={{ bgcolor: "#e8f5e9", width: { xs: "100%", sm: "auto" }, mt: "1rem", p: 2 }}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={4}>
                                                                    <Box>
                                                                        <Typography variant="subtitle1" gutterBottom>
                                                                            From date
                                                                        </Typography>
                                                                        <Typography variant="body1">
                                                                            {new Date(leaveDetails.startDate).toLocaleDateString()}
                                                                        </Typography>
                                                                    </Box>
                                                                </Grid>
                                                                <Grid item xs={4}>
                                                                    <Box>
                                                                        <Typography variant="subtitle1" gutterBottom>
                                                                            To date
                                                                        </Typography>
                                                                        <Typography variant="body1">
                                                                            {new Date(leaveDetails.endDate).toLocaleDateString()}
                                                                        </Typography>
                                                                    </Box>
                                                                </Grid>
                                                                <Grid item xs={4}>
                                                                    <Box>
                                                                        <Typography variant="subtitle1" gutterBottom>
                                                                            No. of days
                                                                        </Typography>
                                                                        <Typography variant="body1">
                                                                            {leaveDetails.noofDays}
                                                                        </Typography>
                                                                    </Box>
                                                                </Grid>
                                                            </Grid>
                                                        </Box>

                                                        <Box mt={2} display="flex" alignItems="center" flexWrap="wrap">
                                                            <Typography variant="subtitle1" gutterBottom color={"#1976D2"}>
                                                                Available: {avalLeave} &nbsp;

                                                            </Typography>
                                                            <Typography variant="body1" ml={{ xs: 0, sm: 5 }}>
                                                                {leaveDetails.leaveType.leaveTypeName}
                                                            </Typography>
                                                        </Box>

                                                        <Box mt={2} mb={2} display="flex">
                                                            <Typography variant="subtitle1" gutterBottom fontWeight={500} color={"#1976D2"}>
                                                                Leave Reason:
                                                            </Typography>
                                                            <Typography variant="body1">
                                                                {leaveDetails.reason}
                                                            </Typography>
                                                        </Box>

                                                        <Box display="flex" alignItems="center" mb={2}>
                                                            <Typography variant="subtitle1" gutterBottom fontWeight={500} color={"#1976D2"}>
                                                                Status:
                                                            </Typography>
                                                            <Typography variant="body1" fontWeight={600} color={status === "Pending" ? "#D14343" : status === "Approved" ? "#4caf50" : "#D14343"}>
                                                                {status}
                                                            </Typography>
                                                        </Box>
                                                    </>
                                                )}
                                            </Grid>
                                        </Grid>


                                        <Divider sx={{ my: 2 }} />

                                        <Box display="flex" justifyContent="flex-end" mb={2}>
                                            <Button variant="contained" color="success" onClick={handleApprove} disabled={status !== "Pending"}>
                                                Approve
                                            </Button>
                                            <Button variant="contained" color="error" onClick={handleOpenModal} disabled={status !== "Pending"} sx={{ ml: 2 }}>
                                                Reject
                                            </Button>

                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <Timeline position="alternate">
                                    <TimelineItem>
                                        <TimelineOppositeContent color="text.secondary">
                                            {new Date(leaveDetails?.createdAt).toLocaleDateString()}
                                        </TimelineOppositeContent>
                                        <TimelineSeparator>
                                            <TimelineDot />
                                            <TimelineConnector />
                                        </TimelineSeparator>
                                        <TimelineContent>
                                            <Paper elevation={3} sx={{ p: 2 }}>
                                                <Typography variant="h6" component="span">
                                                    Request Submitted
                                                </Typography>
                                                <Typography>
                                                    Leave request submitted by {emp?.fullName}
                                                </Typography>
                                            </Paper>
                                        </TimelineContent>
                                    </TimelineItem>

                                    {status !== "Pending" && (
                                        <TimelineItem>
                                            <TimelineOppositeContent color="text.secondary">
                                                {new Date(leaveDetails?.lastUpdate).toLocaleDateString()}
                                            </TimelineOppositeContent>
                                            <TimelineSeparator>
                                                <TimelineDot color={status === "Approved" ? "success" : "error"} />
                                            </TimelineSeparator>
                                            <TimelineContent>
                                                <Paper elevation={3} sx={{ p: 2 }}>
                                                    <Typography variant="h6" component="span">
                                                        {status}
                                                    </Typography>
                                                    <Typography>
                                                        Leave request was {status.toLowerCase()} by Admin
                                                    </Typography>
                                                </Paper>
                                            </TimelineContent>
                                        </TimelineItem>
                                    )}
                                </Timeline>
                            </Grid>
                        </Grid>
                    </Box>
                </main>
            </div>
            <Dialog
  open={openModal}
  onClose={handleCloseModal}
  PaperProps={{
    style: {
      maxWidth: '80vw',  
      maxHeight: '40vh', 
      width: '600px',    
      height: '300px',   
    },
  }}
>
  <DialogTitle>Reason for Rejection</DialogTitle>
  <DialogContent>
    <TextField
      autoFocus
      margin="dense"
      id="rejectionReason"
      label="Rejection Reason"
      type="text"
      fullWidth
      variant="outlined"
      value={rejectionReason}
      onChange={(e) => {
        if (e.target.value.length <= 150) {
          setRejectionReason(e.target.value);
        }
      }}
      helperText={`${rejectionReason.length}/150`}
      inputProps={{ maxLength: 150 }}
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseModal} color="primary">
      Cancel
    </Button>
    <Button
      onClick={handleReject}
      color="primary"
      disabled={rejectionReason.length === 0}
    >
      Submit
    </Button>
  </DialogActions>
</Dialog>


        </div>
    );
};

export default LeaveAction;
