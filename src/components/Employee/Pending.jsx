// src/components/PendingLeaveHistory.jsx
import React from "react";
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

const Pending = ({ leave }) => {
  // Filter the leave items to show only those with "Pending" status
  const pendingLeaves = leave.filter((leaveItem) => leaveItem.status === "Pending");

  return (
    <Paper sx={{ m: "4rem" }}>
      <Box p={2}>
        {pendingLeaves.length > 0 ? (
          pendingLeaves.map((leaveItem, index) => (
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
                      color="warning.main"
                      sx={{ fontSize: "1rem" }}
                    >
                      {leaveItem.status}
                    </Typography>
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <CardContent sx={{ p: 1 }}>
                  {leaveItem.startDate
                    && leaveItem.endDate && <Divider sx={{ my: 1 }} />}
                  {leaveItem.startDate
                    && leaveItem.endDate && (
                      <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
                        Duration: {new Date(leaveItem.startDate).toLocaleDateString()} to {new Date(leaveItem.endDate).toLocaleDateString()}
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
                      Applied on: {new Date(leaveItem.createdAt).toLocaleDateString()}
                    </Typography>
                  )}
                  {/* <Box display="flex" justifyContent="flex-end">
                    <Button size="small" sx={{ fontSize: "0.75rem" }}>
                      View Details
                    </Button>
                  </Box> */}
                </CardContent>
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <Typography variant="h6" sx={{ textAlign: "center", p: 2 }}>
            No pending leave requests
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default Pending;
