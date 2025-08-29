import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './common/Sidebar';
import Header from './common/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Typography,
    Paper,
    Box,
} from '@mui/material';
import { faMoneyBillAlt, faMoneyCheckAlt, faTasks } from '@fortawesome/free-solid-svg-icons';
import AdminContext from '../context/AdminContext';
import Activity from '../Admin/Activity';
import SemiCircularProgressBar from './SemiCircularProgressBar ';
import Task from './Task';
import Attachement from './Attachement';


const Viewproject = ({ children }) => {
    const location = useLocation();
    const { id } = location.state || {};
    const [collapsed, setCollapsed] = useState(false);
    const [data, setData] = useState({
        projectsName: '',
        status: { statusName: '' },
        percentageofcompletion: 0,
        createdAt: '',
        lastUpdate: '',
        clientName: '',
        employee: [],
    });
    const { getProjectbyid } = useContext(AdminContext);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    useEffect(() => {
        const fetchProjectbyid = async () => {
            try {
                const response = await getProjectbyid(id);
                const projectData = response.resultData || {};
                setData({
                    projectsName: projectData.projectsName || '',
                    status: { statusName: projectData.status.statusName || '' },
                    percentageofcompletion: projectData.percentageofcompletion || 0,
                    createdAt: projectData.createdAt || '',
                    lastUpdate: projectData.lastUpdate || '',
                    clientName: projectData.clientName || '',
                    employee: projectData.employee || [],
                });
            } catch (error) {
                console.error("Error fetching project:", error);
            }
        };
        fetchProjectbyid();
    }, []);


    const [activeTab, setActiveTab] = useState('summary');

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
            <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <Header collapsed={collapsed} toggleSidebar={toggleSidebar} />
                <Paper
                    elevation={3}
                    sx={{
                        position: 'fixed',
                        marginTop: '70px',
                        zIndex: 2000,
                        width: collapsed ? 'calc(100% - 100px)' : 'calc(100% - 270px)',
                        marginLeft: collapsed ? '100px' : '270px',
                        padding: '20px 30px',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Typography
                            color="#abafdb"
                            fontFamily={'revert'}
                            fontSize={'22px'}
                            fontWeight={'550'}
                        >
                            Employee projects
                        </Typography>
                    </Box>
                </Paper>
                <main style={{
                    padding: "20px",
                    width: collapsed ? "calc(100% - 100px)" : "calc(100% - 270px)",
                    marginLeft: collapsed ? "100px" : "270px",
                    marginTop: "80px",
                    flexGrow: 1,
                    background: "white",
                }}>
                    {children}
                    <div className="main-content" style={{ marginTop: '4rem' }}>
                        <section className="section">
                            <div className="section-body">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="nav nav-tabs mb-2" role="tablist">
                                            <button
                                                className={`nav-link ${activeTab === 'summary' ? 'active' : ''}`}
                                                onClick={() => setActiveTab('summary')}
                                            >
                                                Summary
                                            </button>
                                            <button
                                                className={`nav-link ${activeTab === 'activity' ? 'active' : ''}`}
                                                onClick={() => setActiveTab('activity')}
                                            >
                                                Activity
                                            </button>
                                            <button
                                                className={`nav-link ${activeTab === 'task' ? 'active' : ''}`}
                                                onClick={() => setActiveTab('task')}
                                            >
                                                Task
                                            </button>
                                            <button
                                                className={`nav-link ${activeTab === 'attachment' ? 'active' : ''}`}
                                                onClick={() => setActiveTab('attachment')}
                                            >
                                                Attachement
                                            </button>
                                            {/* Other tabs */}
                                        </div>
                                        <div className="tab-content">
                                            {activeTab === 'summary' && (
                                                <div className="tab-pane fade show active" id="summary" role="tabpanel" aria-labelledby="projectSummary">
                                                    <div className="row project-details-card">
                                                        <div className="col-md-8">
                                                            <input hidden id="projectId" defaultValue={1317} />
                                                            <div className="card project-details" style={{ borderTop: "3px solid #2F3252" }}>
                                                                <div className="card-header">
                                                                    <h4 className="text-dark pr-1">{data.projectsName}</h4>
                                                                    <span className="badge badge-primary text-uppercase" style={{ backgroundColor: 'blue' }}>
                                                                        {data.status.statusName}
                                                                    </span>
                                                                </div>
                                                                <hr />
                                                                <div className="card-body pt-1">
                                                                    <label className="mb-2 font-weight-bold">Project Overview: </label>
                                                                    <div className="project-description">
                                                                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                                                                    </div>
                                                                </div>
                                                                <hr />
                                                                <div className="card-body pt-0">
                                                                    <div className="row">
                                                                        <SemiCircularProgressBar percentage={data.percentageofcompletion} />
                                                                        <div className="col-md-4">
                                                                            <label htmlFor="created_at" className="font-weight-bold">Created On:</label>
                                                                            <br />
                                                                            <p>
                                                                                <span data-toggle="tooltip" data-placement="right" title={data.createdAt}>{data.createdAt}</span>
                                                                            </p>
                                                                        </div>
                                                                        <div className="col-md-4">
                                                                            <label htmlFor="updated_on" className="font-weight-bold">Last Updated:</label>
                                                                            <br />
                                                                            <p>
                                                                                <span data-toggle="tooltip" data-placement="right" title={data.lastUpdate}>{data.lastUpdate}</span>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="card user-card" style={{ borderTop: "3px solid #2F3252", marginTop: '1rem' }}>
                                                                        <div className="card-header">
                                                                            <h4 className="font-weight-bold">Project Members ({data.employee.length})</h4>
                                                                        </div>
                                                                        <div className="card-body">
                                                                            <ul className="pl-1 users-list" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                                                                {data.employee.map((emp, index) => (
                                                                                    <li className="d-flex mb-4" key={index}>
                                                                                        <img src={`https://ui-avatars.com/api/?name=${emp.fullName}&size=64&rounded=true&color=fff&background=ffaa2e`} className="mr-3 clientProjectDetailsUserAvatar" alt={emp.fullName} />
                                                                                        <div>
                                                                                            <h6>{emp.fullName}</h6>
                                                                                            <span className="text-muted">{emp.email}</span>
                                                                                        </div>
                                                                                    </li>
                                                                                ))}
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="card client-card" style={{ borderTop: "3px solid #2F3252", marginTop: '1rem' }}>
                                                                        <div className="card-header">
                                                                            <h4 className="font-weight-bold">Client</h4>
                                                                        </div>
                                                                        <div className="card-body">
                                                                            <ul className="pl-1 users-list">
                                                                                <li className="d-flex mb-4">
                                                                                    <img src={`https://ui-avatars.com/api/?name=${data.clientName}&size=64&rounded=true&color=fff&background=329af0`} className="mr-3 clientProjectDetailsUserAvatar" alt={data.clientName} />
                                                                                    <div>
                                                                                        <h6>{data.clientName}</h6>
                                                                                        <span className="text-muted">{/* Client email or details */}</span>
                                                                                    </div>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="row">
                                                                <div className="col-lg-12 col-md-12 col-sm-12">
                                                                    <div className="card card-statistic-2 project-details-box" style={{ backgroundColor: "#ffffff", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", marginTop: '1rem' }}>
                                                                        <div className="d-flex justify-content-between align-items-center">
                                                                            <div>
                                                                                <div className="card-icon shadow-primary bg-budget" style={{ backgroundColor: "#329af0", width: "80px", height: "80px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                                                    <FontAwesomeIcon icon={faMoneyBillAlt} style={{ color: "#ffffff", fontSize: "40px" }} />
                                                                                </div>
                                                                            </div>
                                                                            <div className="text-right ml-3" style={{ marginRight: '10rem' }}>
                                                                                <label>Budget</label>
                                                                                <div style={{ fontSize: "20px" }}>
                                                                                    30000
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-12 col-md-12 col-sm-12">
                                                                    <div className="card card-statistic-2 project-details-box" style={{ backgroundColor: "#ffffff", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", marginTop: '1rem' }}>
                                                                        <div className="d-flex justify-content-between align-items-center">
                                                                            <div>
                                                                                <div className="card-icon shadow-primary bg-budget" style={{ backgroundColor: "#7e57c2", width: "80px", height: "80px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                                                    <FontAwesomeIcon icon={faMoneyCheckAlt} style={{ color: "#ffffff", fontSize: "40px" }} />
                                                                                </div>
                                                                            </div>
                                                                            <div className="text-right ml-3" style={{ marginRight: '10rem' }}>
                                                                                <label>Budget Type</label>
                                                                                <div style={{ fontSize: "20px" }}>
                                                                                    Fixed Rate
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-12 col-md-12 col-sm-12">
                                                                    <div className="card card-statistic-2 project-details-box" style={{ backgroundColor: "#ffffff", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", marginTop: '1rem' }}>
                                                                        <div className="d-flex justify-content-between align-items-center">
                                                                            <div>
                                                                                <div className="card-icon shadow-primary bg-pending-tasks" style={{ backgroundColor: "#bcca39", width: "80px", height: "80px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                                                    <FontAwesomeIcon icon={faTasks} style={{ color: "#ffffff", fontSize: "40px" }} />
                                                                                </div>
                                                                            </div>
                                                                            <div className="text-right ml-3" style={{ marginRight: '5rem' }}>
                                                                                <label>Tasks</label>
                                                                                <div style={{ fontSize: "20px" }}>
                                                                                    1/18 Pending Tasks
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {activeTab === 'activity' && (
                                                <div className="tab-pane fade show active" id="activity" role="tabpanel" aria-labelledby="projectActivity">
                                                    <Activity />
                                                </div>
                                            )}
                                            {activeTab === 'task' && (
                                                <div className="tab-pane fade show active" id="task" role="tabpanel" aria-labelledby="projecttask">
                                                    <Task data={data} id={id} />
  
                                                </div>
                                            )}
                                            {activeTab === 'attachment' && (
                                                <div className="tab-pane fade show active" id="attachment" role="tabpanel" aria-labelledby="projectattachment">
                                                       <Attachement id={id}/>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Viewproject;
