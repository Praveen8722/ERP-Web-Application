import React, { useContext, useState, useEffect } from 'react';
import Sidebar from './common/Sidebar';
import Header from './common/Header';
import { Typography, Paper, Box, Button } from '@mui/material';
import AdminContext from "../context/AdminContext";
import AddPolicyModal from './Extraleave';

const Leavepolicy = ({ children }) => {
  const [leaveTypes, setLeaveTypes] = useState([]);
  const { getLeaveTypes, getLevel } = useContext(AdminContext);
  const [collapsed, setCollapsed] = useState(false);
  const [levels, setLevels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLeaveCategoryId, setSelectedLeaveCategoryId] = useState(null);
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
    const fetchLevel = async () => {
      try {
        const response = await getLevel();
        setLevels(response.Success);
      } catch (error) {
        console.error("Error fetching Level:", error);
      }
    };
    fetchLevel();
    fetchLeaveTypes();
  }, [getLeaveTypes, getLevel]);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleOpenModal = (leaveCategoryId) => {
    setSelectedLeaveCategoryId(leaveCategoryId);
    setModalOpen(true);
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
              Create Leave Policy
            </Typography>
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
                <Paper className="card" sx={{ ml: '2rem', mt: '1rem', marginTop: '50px' }}>
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
                                          <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleOpenModal(status._id)}
                                          >
                                            Add Extra Days
                                          </Button>
                                        </div>
                                      </div>
                                      <div className="text-muted">
                                        {status.extraMonthlyleave.map((leave, idx) => (
                                          <span key={leave.levelId._id} className={`d-inline-block ${idx % 3 === 3 ? 'w-100' : ''}`} style={{ marginRight: '1rem' }}>
                                            {leave.levelId.levelName}: {leave.days} day(s)
                                          </span>
                                        ))}
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
                                    className={`page-item ${i + 1 === currentPage ? 'active' : ''}`}
                                    onClick={() => onPageChange(i + 1)}
                                  >
                                    <a className="page-link" href="#">
                                      {i + 1}
                                    </a>
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
      <AddPolicyModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        levels={levels}
        leaveCategoryId={selectedLeaveCategoryId}
      />
    </div>
  );
};

export default Leavepolicy;
