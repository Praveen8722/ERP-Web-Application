import React, { useContext, useState, useEffect } from 'react';
import Header from './common/Header';
import Sidebar from './common/Sidebar';
import Loader from '../Admin/Loader';
import { useNavigate } from 'react-router-dom';
import SuperAdminContext from "../context/SuperAdminContext";
import { Modal, Button } from "react-bootstrap";
import { styled } from "@mui/material/styles";

import Organisationcard from "./Organisationcard"
import { Typography, Paper, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
const Allorganisation = ({ children }) => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');
  const colors = ['#abafdb', '#ff6347', '#90ee90', '#ffa500', '#ff69b4', '#1e90ff'];


  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  
  const [organisations, setOrganisations] = useState([]);
  const { getorganisations,orgactivestatus,activeChanged } = useContext(SuperAdminContext);

  useEffect(() => {
    const fetchOrganisations = async () => {
      try {
        const response = await getorganisations();
        console.log(response.resultData);
        setOrganisations(response.resultData);
      } catch (error) {
        console.error("Error fetching organisations:", error);
      }
    };

    fetchOrganisations();
  }, [activeChanged]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeDropdown && !activeDropdown.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);

  const organisationPerPage = 6;
  const indexOfLastorganisation= currentPage * organisationPerPage;
  const indexOfFirstorganisation = indexOfLastorganisation - organisationPerPage;

  const filteredorganisation = organisations.filter((organisation) => {
    const matchesSearchTerm = organisation.organisationName
    .toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatusFilter = statusFilter === '' || organisation.isActive === (statusFilter === '1');
    return matchesSearchTerm && matchesStatusFilter;
  });

  const currentorganisation = filteredorganisation.slice(indexOfFirstorganisation, indexOfLastorganisation);
  const totalPages = Math.ceil(filteredorganisation.length / organisationPerPage);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleToggleStatus = (organisationId, currentStatus) => {
    try {
      console.log('Toggle Status for organisation:', organisationId, !currentStatus);
      orgactivestatus(organisationId, !currentStatus);
    } catch (error) {
      console.error('Error toggling organisation status:', error);
    }
  };

  const handleEdit = (organisationId) => {
    console.log('Edit clicked for organisation id:', organisationId);
    navigate(`/organisationdetail/${organisationId}`);
    setActiveDropdown(null);
  };

  const handleDelete = (organisationId) => {
    console.log('Delete clicked for organisation id:', organisationId);
    setActiveDropdown(null);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
    setCurrentPage(1);
  };
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
              View Organisations
            </Typography>
            <FormControl variant="outlined" sx={{ minWidth: 120, zIndex: 2000, marginLeft:'60rem'}}>
              <InputLabel id="filterStatus-label">Status</InputLabel>
              <Select
                labelId="filterStatus-label"
                id="filterStatus"
                value={statusFilter}
                onChange={handleStatusFilterChange}
                label="Status"
              >
                <MenuItem value="">
                  <em>All</em>
                </MenuItem>
                <MenuItem value="1">Active</MenuItem>
                <MenuItem value="0">Inactive</MenuItem>
              </Select>
            </FormControl>
            
          </Box>
        </Paper>
        <main style={{ flexGrow: 1, padding: '24px' }}>
          <div className="container-fluid mt-4">
            <div className="row">
              <div className="col-md-12">
                <Paper elevation={3} sx={{ padding: '20px', marginTop:'200px', marginLeft: collapsed ? '100px' : '270px' }}>
                  <div className="container-fluid">
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
                   
                    <div className="row">
                      {currentorganisation.map((organisation, index) => (
                        <Organisationcard
                          key={organisation._id}
                          organisation={organisation}
                          colors={colors}
                          index={index}
                          handleToggleStatus={handleToggleStatus}
                          handleEdit={handleEdit}
                          handleDelete={handleDelete}
                          activeDropdown={activeDropdown}
                          setActiveDropdown={setActiveDropdown}
                        />
                      ))}
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="livewire-paginate d-flex justify-content-between align-items-center">
                          <nav aria-label="...">
                            <ul className="pagination">
                              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button
                                  className="page-link"
                                  onClick={() => onPageChange(currentPage > 1 ? currentPage - 1 : currentPage)}
                                >
                                  Previous
                                </button>
                              </li>
                              {Array.from({ length: totalPages }, (_, index) => (
                                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                  <button className="page-link" onClick={() => onPageChange(index + 1)}>
                                    {index + 1}
                                  </button>
                                </li>
                              ))}
                              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <button
                                  className="page-link"
                                  onClick={() => onPageChange(currentPage < totalPages ? currentPage + 1 : currentPage)}
                                >
                                  Next
                                </button>
                              </li>
                            </ul>
                          </nav>
                        </div>
                      </div>
                    </div>
                  </div>
                </Paper>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Allorganisation;
