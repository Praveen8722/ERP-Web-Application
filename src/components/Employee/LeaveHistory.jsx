import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CardContent,
  Divider,
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const LeaveHistory = ({ leave }) => {
  const navigate = useNavigate();
  return (
    <Paper sx={{ m: "4rem" }}>
      <Box p={2}>
        {leave.map((leaveItem, index) => (
          <Accordion key={index} sx={{ mb: 2 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              <Box
                display="flex"
                justifyContent="flex-start"
                width="100%"
                alignItems="center"
              >
                <Box sx={{ flex: 1, textAlign: "left" }}>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "0.75rem", color: "#1976D2" }}
                  >
                    Category
                  </Typography>
                  <Typography variant="h6" sx={{ fontSize: "1rem" }}>
                    {"Leave"}
                  </Typography>
                </Box>
                <Box sx={{ flex: 1, textAlign: "left" }}>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "0.75rem", color: "#1976D2" }}
                  >
                    Leave Type
                  </Typography>
                  <Typography variant="h6" sx={{ fontSize: "1rem" }}>
                    {leaveItem.leaveType.leaveTypeName}
                  </Typography>
                </Box>
                <Box sx={{ flex: 1, textAlign: "left" }}>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "0.75rem", color: "#1976D2" }}
                  >
                    No. of days
                  </Typography>
                  <Typography variant="h6" sx={{ fontSize: "1rem" }}>
                    {leaveItem.noofDays}
                  </Typography>
                </Box>
                <Box sx={{ flex: 1, textAlign: "left" }}>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "0.75rem", color: "#1976D2" }}
                  >
                    Status
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: "1rem",
                      color:
                        leaveItem.status === "Pending"
                          ? "orange"
                          : leaveItem.status === "Rejected"
                            ? "red"
                            : leaveItem.status === "Approved"
                              ? "green"
                              : "success.main",
                    }}
                  >
                    {leaveItem.status}
                  </Typography>
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <CardContent sx={{ p: 1 }}>
                {leaveItem.startDate && leaveItem.endDate && <Divider sx={{ my: 1 }} />}
                {leaveItem.startDate && leaveItem.endDate && (
                  <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
                    Duration: {new Date(leaveItem.startDate).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })} to {new Date(leaveItem.endDate).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}
                  </Typography>
                )}
                {leaveItem.reason && <Divider sx={{ my: 1 }} />}
                {leaveItem.reason && (
                  <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
                    Reason: {leaveItem.reason}
                  </Typography>
                )}
                {leaveItem.createdAt && <Divider sx={{ my: 1 }} />}
                {leaveItem.createdAt && (
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "0.75rem", fontWeight: "bold" }}
                  >
                    Applied on: {new Date(leaveItem.createdAt).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}
                  </Typography>
                )}
                <Box display="flex" justifyContent="flex-end">
                  <Button size="small" sx={{ fontSize: "0.75rem" }} onClick={() => navigate('/leavehistorydetails', { state: { id: leaveItem._id } })}>
                    View Details
                  </Button>
                </Box>
              </CardContent>


            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Paper>
  );
};

export default LeaveHistory;
