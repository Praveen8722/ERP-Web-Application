import React, { useContext, useState, useEffect, useRef } from 'react';
import Sidebar from './common/Sidebar';
import Header from './common/Header';
import Loader from './Loader';
import {
    Typography,
    Paper,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Switch,
    FormControlLabel,
} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Modal, Button, Form } from 'react-bootstrap';

import { FaEllipsisV, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import AdminContext from '../context/AdminContext';

const Status = ({ children }) => {
    const [showModal, setShowModal] = useState(false);
    const [statusName, setStatusName] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [collapsed, setCollapsed] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeDropdown, setActiveDropdown] = useState(null); 
    const [statusFilter, setStatusFilter] = useState('');
    const colors = ['#abafdb', '#ff6347', '#90ee90', '#ffa500', '#ff69b4', '#1e90ff'];

    const dropdownRef = useRef(null); 
    const { createStatus, getStatus } = useContext(AdminContext);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    const handleShow = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setStatusName('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createStatus({ name: statusName });
            handleClose();
        } catch (error) {
            console.error('Error creating status:', error);
        }
    };

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await getStatus();
                setData(response.resultData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching status data:', error);
                setLoading(false);
            }
        };
        fetchStatus();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setActiveDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const statusPerPage = 6;
    const indexOfLastStatus = currentPage * statusPerPage;
    const indexOfFirstStatus = indexOfLastStatus - statusPerPage;

    const filteredStatuses = data.filter((status) => {
        const matchesSearchTerm = status.statusName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatusFilter =
            statusFilter === '' || status.isActive === (statusFilter === '1');
        return matchesSearchTerm && matchesStatusFilter;
    });

    const currentStatuses = filteredStatuses.slice(indexOfFirstStatus, indexOfLastStatus);
    const totalPages = Math.ceil(filteredStatuses.length / statusPerPage);

    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleEdit = (statusId) => {
        setActiveDropdown(null);
    };

    const handleDelete = (statusId) => {
        setActiveDropdown(null);
    };

    const toggleDropdown = (statusId) => {
        setActiveDropdown(activeDropdown === statusId ? null : statusId);
    };





    
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
                            Status
                        </Typography>
                        <Button variant="primary" onClick={handleShow}>
                            Add Status <FaPlus />
                        </Button>
                    </Box>
                </Paper>
                <main
                    style={{
                        padding: '20px',
                        width: collapsed ? 'calc(100% - 100px)' : 'calc(100% - 270px)',
                        marginLeft: collapsed ? '100px' : '270px',
                        marginTop: '80px',
                        flexGrow: 1,
                        background: 'white',
                    }}
                >
                    {children}
                    <div className="section-body">
                        <div className="row">
                            <div className="col-lg-12">
                                <Paper className="card" sx={{ ml: '2rem', mt: '2rem', marginTop:'100px' }}>
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
                                      
                                        {loading && <Loader />}

                                        
                                        <div className="row">
                                            {currentStatuses.map((status, index) => (
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
                                                                            <h4>{status.statusName}</h4>
                                                                        </a>
                                                                    </div>
                                                                    <div className="dropdown" ref={dropdownRef}>
                                                                        <FaEllipsisV onClick={() => toggleDropdown(status._id)} />
                                                                        {activeDropdown === status._id && (
                                                                            <div className="dropdown-menu show">
                                                                                <button className="dropdown-item" onClick={() => handleEdit(status._id)}>
                                                                                    <FaEdit className="mr-2" style={{ color: 'yellow' }} /> Edit
                                                                                </button>
                                                                                <button className="dropdown-item" onClick={() => handleDelete(status._id)}>
                                                                                    <FaTrash className="mr-2" style={{ color: 'red' }} /> Delete
                                                                                </button>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Box>
                                                    </div>
                                                </div>
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
                                                                    onClick={() =>
                                                                        onPageChange(
                                                                            currentPage > 1 ? currentPage - 1 : currentPage
                                                                        )
                                                                    }
                                                                >
                                                                    Previous
                                                                </button>
                                                            </li>
                                                            {Array.from({ length: totalPages }, (_, index) => (
                                                                <li
                                                                    key={index}
                                                                    className={`page-item ${
                                                                        currentPage === index + 1 ? 'active' : ''
                                                                    }`}
                                                                >
                                                                    <button
                                                                        className="page-link"
                                                                        onClick={() => onPageChange(index + 1)}
                                                                    >
                                                                        {index + 1}
                                                                    </button>
                                                                </li>
                                                            ))}
                                                            <li
                                                                className={`page-item ${
                                                                    currentPage === totalPages ? 'disabled' : ''
                                                                }`}
                                                            >
                                                                <button
                                                                    className="page-link"
                                                                    onClick={() =>
                                                                        onPageChange(
                                                                            currentPage < totalPages ? currentPage + 1 : currentPage
                                                                        )
                                                                    }
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

            <Modal show={showModal} onHide={handleClose} style={{ zIndex: 2000 }}>

                <Modal.Header closeButton>
                    <Modal.Title>Add Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formStatusName">
                            <Form.Label>Status Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter status name"
                                value={statusName}
                                onChange={(e) => setStatusName(e.target.value)}
                            />
                        </Form.Group>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                marginTop: '10px',
                            }}
                        >
                            <Button variant="secondary" onClick={handleClose} style={{ marginRight: '10px' }}>
                                Cancel
                            </Button>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Status;
