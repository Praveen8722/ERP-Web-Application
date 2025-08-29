import React, { useRef, useContext, useState, useEffect } from 'react';
import Sidebar from './common/Sidebar';
import Header from './common/Header';
import { useNavigate } from 'react-router-dom';
import { Box, Paper, Typography, Button, Modal as MuiModal, TextField, MenuItem, Stack, FormControl, InputLabel, Select, FormControlLabel, Chip, Grid, Checkbox, ListItemText } from "@mui/material";
import { FaPlus, FaEdit, FaTrash, FaEllipsisV } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { GrFormView } from "react-icons/gr";


import AdminContext from '../context/AdminContext';

const Createproject = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [projectsName, setProjectsName] = useState("");
  const [clientName, setClientName] = useState("");
  const [assignedTo, setAssignedTo] = useState([]);
  const [percentageofcompletion, setPercentageofcompletion] = useState("");
  const [searchProjectTerm, setSearchProjectTerm] = useState("");
  const [employees, setEmployees] = useState([]);
  const [status, setStatus] = useState("");
  const [statusOptions, setStatusOptions] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedAssignee, setSelectedAssignee] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState("");
  const { getEmployee, createProject, getStatus, getProject } = useContext(AdminContext);
  const colors = ['#abafdb', '#ff6347', '#90ee90', '#ffa500', '#ff69b4', '#1e90ff'];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [searchEmployeeTerm, setSearchEmployeeTerm] = useState("");
  const dropdownRef = useRef(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate=useNavigate();
  const toggleDropdown = (projectId) => {
    setActiveDropdown(activeDropdown === projectId ? null : projectId);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeDropdown && !event.target.closest(`#dropdown-${activeDropdown}`)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);



  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await getEmployee();
        setEmployees(response.resultData || []);

      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    const fetchStatusOptions = async () => {
      try {
        const response = await getStatus();
        setStatusOptions(response.resultData || []);
      } catch (error) {
        console.error("Error fetching status options:", error);
      }
    };

    const fetchProjects = async () => {
      try {
        const response = await getProject();
        setProjects(response.resultData || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchEmployees();
    fetchStatusOptions();
    fetchProjects();
  }, [getEmployee, getStatus, getProject]);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setProjectsName("");
    setClientName("");
    setAssignedTo([]);
    setPercentageofcompletion("");
    setSearchProjectTerm("");
    setStatus("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        projectsName,
        clientName,
        assignedTo,
        percentageofcompletion: parseFloat(percentageofcompletion),
        status
      };
      await createProject(data);
      handleCloseModal();
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const handleEmployeeChange = (event) => {
    setAssignedTo(event.target.value);
  };


  const handleSearchProjectChange = (event) => {
    setSearchProjectTerm(event.target.value);
  }


  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };
  const handleFilterStatusChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const handleShowEditModal = () => {
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedAssignee([]);
  };

  const handleEditAssigneeSubmit = (e) => {
    e.preventDefault();
    console.log("Edit Assignee:", selectedAssignee);
    handleCloseEditModal();
  };

  const handleSearchEmployeeChange = (searchTerm) => {
    setSearchEmployeeTerm(searchTerm);
  };
  const handleviewproject=(id)=>{
       navigate('/viewproject', { state: { id } });

  }
  const filteredEmployees = employees.filter((employee) => {
    const fullName = employee.fullName ? employee.fullName.toLowerCase() : '';
    return fullName.includes(searchEmployeeTerm.toLowerCase());
  });

  const filteredProjects = projects.filter((project) => {
    const projectName = project.projectsName ? project.projectsName.toLowerCase() : '';
    const clientName = project.clientName ? project.clientName.toLowerCase() : '';
    const matchesSearch = projectName.includes(searchProjectTerm.toLowerCase()) || clientName.includes(searchProjectTerm.toLowerCase());
    const matchesStatus = filterStatus ? project.status === filterStatus : true;
    return matchesSearch && matchesStatus;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstItem, indexOfLastItem);

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

            className="pt-4 pb-2"
          >
            <Typography
              color="#abafdb"
              fontFamily={"revert"}
              fontSize={"22px"}
              fontWeight={"550"}
            >
              All Projects
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleShowModal}
            >
              Add Projects <FaPlus style={{ paddingLeft: "5px" }} />
            </Button>
          </Box>
        </Paper>
        <main style={{
          padding: "20px",
          width: collapsed ? "calc(100% - 100px)" : "calc(100% - 270px)",
          marginLeft: collapsed ? "90px" : "250px",
          marginRight: collapsed ? "150px" : "270px",
          marginTop: "80px",
          flexGrow: 1,
          background: "white",
        }}>
          {children}
          <Paper className="p-3"
            sx={{
              position: "fixed",
              marginTop: "120px",
              width: collapsed ? "calc(100% - 100px)" : "calc(100% - 270px)",

            }}>
            <Box className="d-flex flex-row align-items-center justify-content-between mb-4" sx={{ marginLeft: '58rem' }}

            >
              <div className="d-flex flex-row gap-4">
                <Stack >
                  <FormControl style={{ width: '10rem' }}>
                    <InputLabel >Status</InputLabel>

                    <Select
                      value={filterStatus}
                      onChange={handleFilterStatusChange}

                    >
                      <MenuItem value="" >All Status</MenuItem>
                      {statusOptions.map((statusOption) => (
                        <MenuItem key={statusOption._id} value={statusOption._id}>
                          {statusOption.statusName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>
                <div className="form-outline" data-mdb-input-init>
                  <TextField
                    type="search"
                    id="form1"
                    className="form-control"
                    placeholder="Search"
                    aria-label="Search"
                    value={searchProjectTerm}
                    onChange={handleSearchProjectChange}
                  />
                </div>
              </div>
            </Box>
            <Grid container spacing={5}>
              {currentProjects.map((project, index) => (
                <Grid item xs={12} md={4} key={project._id} >
                  <Paper elevation={3} sx={{ padding: "16px" }} style={{ borderTop: `2px solid ${colors[index % colors.length]}` }}>
                    <div className="progress">
                      <div className="progress-bar" style={{ width: `${project.percentageofcompletion}%` }}>
                        <b>{project.percentageofcompletion}%</b>
                      </div>
                    </div>
                    <Typography
                      sx={{
                        display: "inline-block",
                        backgroundColor: "#007bff",
                        color: "white",
                        borderRadius: "20px",
                        padding: "2px 10px",
                        fontSize: "14px",
                        marginTop: "20px",
                      }}
                    >
                     {projects[0].status.statusName || 'Unknown'}

                    </Typography>
                    <div className="dropdown" id={`dropdown-${project._id}`}  
                       style={{ marginLeft:'22rem' }}
                    >
                          <button
                            className="btn"
                            type="button"
                            onClick={() => toggleDropdown(project._id)}
                            style={{
                              backgroundColor: 'transparent',
                              border: 'none',
                              outline: 'none',
                              cursor: 'pointer',
                              fontSize: '18px',
                            }}
                          >
                            <FaEllipsisV />
                          </button>
                          {activeDropdown === project._id && (
                            <div className="dropdown-menu show">
                              <button className="dropdown-item"  onClick={() => handleviewproject(project._id)}>
                                <GrFormView className="mr-2"/>
                                View
                              </button>
                              <button className="dropdown-item">
                                <FaTrash className="mr-2" />
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                    <Typography
                      sx={{ textAlign: "center", color: "#6C757D" }}
                      className="pb-2"
                    >
                      Client: {project.clientName}
                    </Typography>
                      <div
                        className="add-profile-avatar"
                        onClick={handleShowEditModal}
                      >
                        <GoPlus />
                      </div>
                  </Paper>
                </Grid>
              ))}
            </Grid>
            <div className="mt-3">
              <nav aria-label="...">
                <ul className="pagination">
                  <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                    <a
                      className="page-link"
                      href="#"
                      tabIndex="-1"
                      aria-disabled={currentPage === 1 ? 'true' : 'false'}
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      Previous
                    </a>
                  </li>
                  {Array.from({ length: Math.ceil(filteredProjects.length / itemsPerPage) }, (_, index) => (
                    <li key={index} className={`page-item ${currentPage === index + 1 && 'active'}`}>
                      <a
                        className="page-link"
                        href="#"
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        {index + 1}
                      </a>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === Math.ceil(filteredProjects.length / itemsPerPage) && 'disabled'}`}>
                    <a
                      className="page-link"
                      href="#"
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </Paper>
          <MuiModal open={showModal} onClose={handleCloseModal}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 600,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" component="h2" gutterBottom>
                Create Project
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Project Name"
                  fullWidth
                  value={projectsName}
                  onChange={(e) => setProjectsName(e.target.value)}
                  margin="normal"
                />
                <TextField
                  label="Client Name"
                  fullWidth
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  margin="normal"
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel>Assigned To</InputLabel>
                  <Select
                    multiple
                    value={assignedTo}
                    onChange={handleEmployeeChange}
                    renderValue={(selected) => (
                      <div>
                        {selected.map((value) => (
                          <Chip
                            key={value}
                            label={
                              employees.find((emp) => emp._id === value)?.fullName ||
                              "Unknown"
                            }
                            style={{ margin: 2 }}
                          />
                        ))}
                      </div>
                    )}
                  >
                    {employees.map((employee) => (
                      <MenuItem key={employee._id} value={employee._id}>
                        <Checkbox checked={assignedTo.indexOf(employee._id) > -1} />
                        <ListItemText primary={employee.fullName} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  label="Percentage of Completion"
                  type="number"
                  fullWidth
                  value={percentageofcompletion}
                  onChange={(e) => setPercentageofcompletion(e.target.value)}
                  margin="normal"
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel>Status</InputLabel>
                  <Select value={status} onChange={handleStatusChange}>
                    {statusOptions.map((statusOption) => (
                      <MenuItem key={statusOption._id} value={statusOption._id}>
                        {statusOption.statusName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{ mr: 2 }}
                  >
                    Save
                  </Button>
                  <Button variant="contained" onClick={handleCloseModal}>
                    Cancel
                  </Button>
                </Box>
              </form>
            </Box>
          </MuiModal>


          <MuiModal
            open={showEditModal}
            onClose={handleCloseEditModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Assign Employees
              </Typography>
              <form onSubmit={handleEditAssigneeSubmit}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Assignee</InputLabel>
                  <Select
                    multiple
                    value={selectedAssignee}
                    onChange={(e) => setSelectedAssignee(e.target.value)}
                    renderValue={(selected) =>
                      selected
                        .map((value) => {
                          const employee = employees.find((e) => e._id === value);
                          return employee ? employee.fullName : "";
                        })
                        .join(", ")
                    }
                    filterSelectedOptions
                    onInputChange={(e) => handleSearchEmployeeChange(e.target.value)}
                  >
                    {filteredEmployees.map((employee) => (
                      <MenuItem key={employee._id} value={employee._id}>
                        <Checkbox checked={selectedAssignee.indexOf(employee._id) > -1} />
                        <ListItemText primary={employee.fullName} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button type="submit" variant="contained" color="primary">
                  Save
                </Button>
              </form>
            </Box>
          </MuiModal>

        </main>
      </div>
    </div>
  );
};
export default Createproject;
