import React, { useRef, useContext, useState, useEffect } from 'react';
import Sidebar from './common/Sidebar';
import Header from './common/Header';
import { useNavigate } from 'react-router-dom';
import { Box, Paper, Typography, TextField, MenuItem, Stack, FormControl, InputLabel, Select, Grid, Menu, MenuItem as MuiMenuItem } from "@mui/material";
import { FaEllipsisV, FaTrash } from "react-icons/fa";
import { GrFormView } from "react-icons/gr";

import EmpContext from '../context/EmpContext';
import AdminContext from '../context/AdminContext';


const Empprojects = ({ children }) => {
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
  const [filterStatus, setFilterStatus] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeProjectId, setActiveProjectId] = useState(null);
  const { getProject } = useContext(EmpContext);
  const { getStatus } = useContext(AdminContext);
  const colors = ['#abafdb', '#ff6347', '#90ee90', '#ffa500', '#ff69b4', '#1e90ff'];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
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

    fetchStatusOptions();
    fetchProjects();
  }, [getProject, getStatus]);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setProjectsName("");
    setClientName("");
    setAssignedTo([]);
    setPercentageofcompletion("");
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
      await createProject(data); // You might need to define `createProject`
      handleCloseModal();
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const handleSearchProjectChange = (event) => setSearchProjectTerm(event.target.value);
  const handleStatusChange = (event) => setStatus(event.target.value);
  const handleFilterStatusChange = (event) => setFilterStatus(event.target.value);

  const handleviewproject = (id) => navigate('/viewempproject', { state: { id } });

  const handleMenuClick = (event, projectId) => {
    setAnchorEl(event.currentTarget);
    setActiveProjectId(projectId);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setActiveProjectId(null);
  };

  const handleViewProject = () => {
    handleCloseMenu();
    handleviewproject(activeProjectId);
  };

  const handleDeleteProject = () => {
    handleCloseMenu();
    // Add delete functionality here
  };

  const filteredProjects = projects.filter((project) => {
    const projectName = project.projectsName ? project.projectsName.toLowerCase() : '';
    const clientName = project.clientName ? project.clientName.toLowerCase() : '';
    const searchTerm = searchProjectTerm.toLowerCase();
    const matchesSearch = projectName.includes(searchTerm) || clientName.includes(searchTerm);
    const matchesStatus = filterStatus ? project.status?._id === filterStatus : true;
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
            <Box className="d-flex flex-row align-items-center justify-content-between mb-4" sx={{ marginLeft: '58rem' }}>
              <Stack>
                <FormControl style={{ width: '10rem' }}>
                  <InputLabel>Status</InputLabel>
                  <Select value={filterStatus} onChange={handleFilterStatusChange}>
                    <MenuItem value="">All Status</MenuItem>
                    {statusOptions.map((statusOption) => (
                      <MenuItem key={statusOption._id} value={statusOption._id}>
                        {statusOption.statusName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
              <TextField
                type="search"
                id="search-project"
                placeholder="Search"
                aria-label="Search"
                value={searchProjectTerm}
                onChange={handleSearchProjectChange}
              />
            </Box>
            <Grid container spacing={5}>
              {currentProjects.map((project, index) => (
                <Grid item xs={12} md={4} key={project._id}>
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
                      {project.projectsName || 'Unknown'}
                    </Typography>
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
                      {project.status?.statusName || 'Unknown'}
                    </Typography>
                    <div style={{ position: 'relative', display: 'inline-block', marginLeft: '22rem' }}>
                      <button
                        className="btn"
                        type="button"
                        onClick={(event) => handleMenuClick(event, project._id)}
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
                      <Menu
                        anchorEl={anchorEl}
                        open={activeProjectId === project._id}
                        onClose={handleCloseMenu}
                      >
                        <MuiMenuItem onClick={handleViewProject}>
                          <GrFormView className="mr-2" />
                          View
                        </MuiMenuItem>
                        <MuiMenuItem onClick={handleDeleteProject}>
                          <FaTrash className="mr-2" />
                          Delete
                        </MuiMenuItem>
                      </Menu>
                    </div>
                    <Typography
                      sx={{ textAlign: "center", color: "#6C757D" }}
                      className="pb-2"
                    >
                      Client: {project.clientName}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
            <div className="mt-3">
              <nav aria-label="Page navigation">
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
        </main>
      </div>
    </div>
  );
};

export default Empprojects;
