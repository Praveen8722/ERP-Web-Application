import React, { useContext, useState, useEffect, useRef } from 'react';
import Sidebar from './common/Sidebar';
import Header from './common/Header';
import Loader from '../Admin/Loader';
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
import SuperAdminContext from "../context/SuperAdminContext";
import { Modal, Button } from "react-bootstrap";
import { FaEllipsisV, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const OrganisationType = ({ children }) => {
    const [data, setData] = useState({ typeName: "" });
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [organisationTypes, setOrganisationTypes] = useState([]);
    const { updateOrganisationType, createorganisationsType, getorganisationsType, organisationTypeChanged } = useContext(SuperAdminContext);
    const [collapsed, setCollapsed] = useState(false);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeDropdown, setActiveDropdown] = useState(null); 
    const [statusFilter, setStatusFilter] = useState('');
    const colors = ['#abafdb', '#ff6347', '#90ee90', '#ffa500', '#ff69b4', '#1e90ff'];
    const dropdownRef = useRef(null); 

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    useEffect(() => {
        const fetchOrganisationTypes = async () => {
            try {
                const types = await getorganisationsType();
                console.log('Fetched organisation types:', types);
                setOrganisationTypes(types);
            } catch (error) {
                console.error("Error fetching organisation types:", error);
            }
            setLoading(false);
        };
        fetchOrganisationTypes();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (isEditing) {
                await updateOrganisationType(currentId, data);
            } else {
                await createorganisationsType(data);
            }
            setData({ typeName: "" });
            setShowModal(false);
            setIsEditing(false);
            setCurrentId(null);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleShow = () => {
        setShowModal(true);
        setIsEditing(false);
        setData({ typeName: "" });
    };

    const handleEdit = (id, typeName) => {
        setShowModal(true);
        setIsEditing(true);
        setCurrentId(id);
        setData({ typeName });
    };

    const handleClose = () => {
        setShowModal(false);
        setIsEditing(false);
        setCurrentId(null);
        setData({ typeName: "" });
    };

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

    const filteredOrgtype = organisationTypes.filter((status) => {
        const matchesSearchTerm = status.servicesType.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatusFilter = statusFilter === '' || status.isActive === (statusFilter === '1');
        return matchesSearchTerm && matchesStatusFilter;
    });

    const currentOrgtype = filteredOrgtype.slice(indexOfFirstStatus, indexOfLastStatus);
    const totalPages = Math.ceil(filteredOrgtype.length / statusPerPage);

    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); 
    };

    const handleDelete = (statusId) => {
        console.log('Delete clicked for status id:', statusId);
        setActiveDropdown(null);
    };

    const toggleDropdown = (statusId) => {
        setActiveDropdown(activeDropdown === statusId ? null : statusId);
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
                            Organisation Type
                        </Typography>
                        <Button variant="primary" onClick={handleShow}>
                            Add Organisation Type <FaPlus />
                        </Button>
                    </Box>
                </Paper>
                <Modal show={showModal} onHide={handleClose} style={{ zIndex: 4000, top: '10%' }}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {isEditing ? "Edit Organisation Type" : "Add Organisation Type"}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="mb-2">Type Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="typeName"
                                    value={data.typeName}
                                    onChange={handleChange}
                                />
                            </div>
                            <Button variant="primary" type="submit" className="mt-3 ">
                                {isEditing ? "Update" : "Submit"}
                            </Button>
                        </form>
                    </Modal.Body>
                </Modal>
                <main
                    style={{
                        padding: "20px",
                        width: collapsed ? "calc(100% - 100px)" : "calc(100% - 270px)",
                        marginLeft: collapsed ? "100px" : "270px",
                        marginTop: "180px",
                        flexGrow: 1,
                        background: "white",
                    }}
                >
                    {children}
                    <div className="section-body">
                        <div className="row">
                            <div className="col-lg-12">
                                <Paper className="card" sx={{ ml: '2rem', mt: '2rem', marginTop: '60px' }}>
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
                                        {loading ? (
                                            <Loader />
                                        ) : organisationTypes.length === 0 ? (
                                            <div className="text-center">No organisation types found.</div>
                                        ) : (
                                            <>
                                                <div className="row">
                                                    {currentOrgtype.map((status, index) => (
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
                                                                                <a href={`#`}>
                                                                                    <h4>{status.servicesType}</h4>
                                                                                </a>
                                                                            </div>
                                                                            <div className="dropdown" ref={dropdownRef}>
                                                                                <FaEllipsisV onClick={() => toggleDropdown(status._id)} />
                                                                                {activeDropdown === status._id && (
                                                                                    <div className="dropdown-menu show">
                                                                                        <button className="dropdown-item" onClick={() => handleEdit(status._id, status.typeName)}>
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
                                                                            onClick={() => onPageChange(currentPage > 1 ? currentPage - 1 : currentPage)}
                                                                        >
                                                                            Previous
                                                                        </button>
                                                                    </li>
                                                                    {Array.from({ length: totalPages }, (_, index) => (
                                                                        <li
                                                                            key={index}
                                                                            className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                                                                        >
                                                                            <button
                                                                                className="page-link"
                                                                                onClick={() => onPageChange(index + 1)}
                                                                            >
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
                                            </>
                                        )}
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

export default OrganisationType;
