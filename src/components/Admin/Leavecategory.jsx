import React, { useContext, useState, useEffect } from 'react';
import Sidebar from './common/Sidebar';
import Header from './common/Header';
import { Typography, Paper, Box } from '@mui/material';
import AdminContext from "../context/AdminContext";
import { Modal, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

const Leavecategory = ({ children }) => {
  const [data, setData] = useState({
    leaveTypeName: "",
    isMoneyDeducted: false,
    leaveDuration: "full-day",
    annualLeavesCount: 0,
    includeHoliday: false,
    includeWeeklyHoliday: false,
    monthlyTransfer: false,   
    yearlyTransfer: false      
  });
  const [showModal, setShowModal] = useState(false);
  const [leaveTypes, setLeaveTypes] = useState([]);
  const { createLeaveType, getLeaveTypes, deleteLeaveType } = useContext(AdminContext);
  const [collapsed, setCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const colors = ['#abafdb', '#ff6347', '#90ee90', '#ffa500', '#ff69b4', '#1e90ff'];

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    const fetchLeaveTypes = async () => {
      try {
        const leaveTypesData = await getLeaveTypes();
        setLeaveTypes(leaveTypesData.resultData);
      } catch (error) {
        console.error("Error fetching leave types:", error);
      }
    };

    fetchLeaveTypes();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createLeaveType(data);
      resetForm();
      await refreshLeaveTypes();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleShow = () => {
    setShowModal(true);
    setData({
      leaveTypeName: "",
      isMoneyDeducted: false,
      leaveDuration: "full-day",
      annualLeavesCount: 0,
      includeHoliday: false,
      includeWeeklyHoliday: false,
      monthlyTransfer: false,    // Reset new state field
      yearlyTransfer: false      // Reset new state field
    });
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const resetForm = () => {
    setData({
      leaveTypeName: "",
      isMoneyDeducted: false,
      leaveDuration: "full-day",
      annualLeavesCount: 0,
      includeHoliday: false,
      includeWeeklyHoliday: false,
      monthlyTransfer: false,    // Reset new state field
      yearlyTransfer: false      // Reset new state field
    });
    setShowModal(false);
  };

  const handleDelete = async (statusId) => {
    try {
      await deleteLeaveType(statusId);
      await refreshLeaveTypes();
    } catch (error) {
      console.error("Error deleting leave type:", error);
    }
  };

  const refreshLeaveTypes = async () => {
    try {
      const leaveTypesData = await getLeaveTypes();
      setLeaveTypes(leaveTypesData.resultData);
    } catch (error) {
      console.error("Error refreshing leave types:", error);
    }
  };

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const statusPerPage = 6;
  const indexOfLastStatus = currentPage * statusPerPage;
  const indexOfFirstStatus = indexOfLastStatus - statusPerPage;

  const filteredStatuses = leaveTypes.filter((status) => {
    const matchesSearchTerm = status.leaveTypeName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearchTerm;
  });

  const currentStatuses = filteredStatuses.slice(indexOfFirstStatus, indexOfLastStatus);
  const totalPages = Math.ceil(filteredStatuses.length / statusPerPage);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
      <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
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
              Leave Types
            </Typography>
            <Button variant="primary" onClick={handleShow}>
              Add Leave Type <FontAwesomeIcon icon={faPlus} />
            </Button>
          </Box>
        </Paper>

        <main
          style={{
            padding: "20px",
            marginTop: "140px",
            flexGrow: 1,
            background: "white",
            position: "relative",
            marginLeft: "250px"
          }}
        >
          {children}
          <div className="section-body">
            <div className="row">
              <div className="col-lg-12">
                <Paper className="card" sx={{ ml: '2rem', mt: '2rem', marginTop: '100px' }}>
                  <div className="card-body">
                    <div className="row mt-0 mb-3">
                      <div className="col-12 d-flex justify-content-end">
                        <div className="pr-0 pl-2 pt-2 pb-2">
                          <input
                            type="search"
                            className="form-control"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={handleSearchChange}
                          />
                        </div>
                      </div>
                    </div>
                    {leaveTypes.length === 0 ? (
                      <Typography variant="h6" align="center">
                        No data available
                      </Typography>
                    ) : (
                      <>
                        <div className="row">
                          {currentStatuses.length > 0 ? (
                            currentStatuses.map((status, index) => (
                              <div
                                key={status._id}
                                className="col-12 col-md-6 col-lg-4 col-xl-4 extra-large"
                              >
                                <div
                                  className="livewire-card card card-dark shadow mb-5 rounded user-card-view hover-card"
                                  style={{ borderTop: `2px solid ${colors[index % colors.length]}` }}
                                >
                                  <Box className="card-body d-flex align-items-center">
                                    <div className="ml-2 w-100 mb-auto">
                                      <div className="justify-content-between d-flex">
                                        <div className="user-card-name pb-1">
                                          <a
                                            href={`https://infyprojects.infyom.com/users/${status._id}`}
                                          >
                                            <h4>{status.leaveTypeName}</h4>
                                          </a>
                                        </div>
                                        <div className="text-right">
                                          <div
                                            className="dropdown action-item"
                                            onClick={() => handleDelete(status._id)}
                                          >
                                            <FontAwesomeIcon icon={faTrash} />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="text-muted">
                                        <span className="d-block">
                                          {status.isMoneyDeducted ? 'Money Deducted' : 'No Money Deducted'}
                                        </span>
                                        <span className="d-block">
                                          Annual Leaves Count: {status.annualLeavesCount}
                                        </span>
                                      </div>
                                    </div>
                                  </Box>
                                </div>
                              </div>
                            ))
                          ) : (
                            <Typography variant="h6" align="center">
                              No matching leave types found
                            </Typography>
                          )}
                        </div>

                        <div className="row justify-content-center mt-4">
                          <div className="col-lg-4 col-md-6 col-12 text-center">
                            <nav aria-label="Page navigation">
                              <ul className="pagination">
                                {Array.from({ length: totalPages }, (_, i) => (
                                  <li
                                    key={i}
                                    className={`page-item ${i + 1 === currentPage ? "active" : ""}`}
                                    onClick={() => onPageChange(i + 1)}
                                  >
                                    <button className="page-link">{i + 1}</button>
                                  </li>
                                ))}
                              </ul>
                            </nav>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </Paper>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal for Adding Leave Type */}
      <Modal show={showModal} onHide={handleClose} style={{ marginTop: "8rem" }}>
        <Modal.Header closeButton>
          <Modal.Title>Add Leave Type</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group controlId="leaveTypeName">
              <Form.Label>Leave Type Name</Form.Label>
              <Form.Control
                type="text"
                name="leaveTypeName"
                value={data.leaveTypeName}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="isMoneyDeducted">
              <Form.Check
                type="checkbox"
                label="Is Money Deducted"
                name="isMoneyDeducted"
                checked={data.isMoneyDeducted}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="leaveDuration">
              <Form.Label>Leave Duration</Form.Label>
              <Form.Control
                as="select"
                name="leaveDuration"
                value={data.leaveDuration}
                onChange={handleChange}
              >
                <option value="full-day">Full Day</option>
                <option value="half-day">Half Day</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="annualLeavesCount">
              <Form.Label>Annual Leaves Count</Form.Label>
              <Form.Control
                type="number"
                name="annualLeavesCount"
                value={data.annualLeavesCount}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="includeHoliday">
              <Form.Check
                type="checkbox"
                label="Include Holidays"
                name="includeHoliday"
                checked={data.includeHoliday}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="includeWeeklyHoliday">
              <Form.Check
                type="checkbox"
                label="Include Weekly Holidays"
                name="includeWeeklyHoliday"
                checked={data.includeWeeklyHoliday}
                onChange={handleChange}
              />
            </Form.Group>

            {/* New Options for Monthly and Yearly Transfer */}
            <Form.Group controlId="monthlyTransfer">
              <Form.Check
                type="checkbox"
                label="Monthly Transfer"
                name="monthlyTransfer"
                checked={data.monthlyTransfer}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="yearlyTransfer">
              <Form.Check
                type="checkbox"
                label="Yearly Transfer"
                name="yearlyTransfer"
                checked={data.yearlyTransfer}
                onChange={handleChange}
              />
            </Form.Group>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Leavecategory;
