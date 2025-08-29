import React, { useContext, useState, useEffect, useRef } from 'react';
import Header from "./common/Header";
import Sidebar from "./common/Sidebar";
import {
    Paper,
    Box,
    Typography,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from "@mui/material";
import AdminContext from "../context/AdminContext";
import { FaEllipsisV, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
const AdminLayout = ({ children }) => {
    const { createLevel,getLevel } = useContext(AdminContext);
    const [collapsed, setCollapsed] = useState(false);
    const [open, setOpen] = useState(false);
    const [levels,setLevels]=useState([]);
    const [levelName, setLevelName] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeDropdown, setActiveDropdown] = useState(null); 
    const [LevelFilter, setLevelFilter] = useState('');
    const colors = ['#abafdb', '#ff6347', '#90ee90', '#ffa500', '#ff69b4', '#1e90ff'];

    const dropdownRef = useRef(null);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        createLevel(levelName);
        setOpen(false);
        setLevelName("");

    };
    useEffect(() => {
        const fetchLevel = async () => {
            try {
                const response = await getLevel();
                setLevels(response.Success);
                
            } catch (error) {
                console.error("Error fetching department types:", error);
            }
        };

        fetchLevel();
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
    
    const LevelPerPage = 6;
    const indexOfLastLevel = currentPage * LevelPerPage;
    const indexOfFirstLevel = indexOfLastLevel - LevelPerPage;
    
    const filteredLeveles = levels.filter((Level) => {
        const matchesSearchTerm = Level.levelName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLevelFilter =
            LevelFilter === '' || Level.isActive === (LevelFilter === '1');
        return matchesSearchTerm && matchesLevelFilter;
    });
    
    const currentLeveles = filteredLeveles.slice(indexOfFirstLevel, indexOfLastLevel);
    const totalPages = Math.ceil(filteredLeveles.length / LevelPerPage);
    
    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };
    
    const handleDelete = (LevelId) => {
        console.log('Delete clicked for Level id:', LevelId);
      
        setActiveDropdown(null);
    };
    
    const toggleDropdown = (LevelId) => {
        setActiveDropdown(activeDropdown === LevelId ? null : LevelId);
    };
    
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
                    >
                        <Typography
                            color="#abafdb"
                            fontFamily={"revert"}
                            fontSize={"22px"}
                            fontWeight={"550"}
                        >
                            Create Level
                        </Typography>
                        <Box>
                            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                                Add Level
                            </Button>
                        </Box>
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
                                        <div className="row">
                                            {currentLeveles.map((Level, index) => (
                                                <div
                                                    key={Level._id}
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
                                                                            href={`https://infyprojects.infyom.com/users/${Level._id}`}
                                                                        >
                                                                            <h4>{Level.levelName}</h4>
                                                                        </a>
                                                                    </div>
                                                                    <div className="dropdown" ref={dropdownRef}>
                                                                        <FaEllipsisV onClick={() => toggleDropdown(Level._id)} />
                                                                        {activeDropdown === Level._id && (
                                                                            <div className="dropdown-menu show">
                                                                                <button className="dropdown-item" onClick={() => handleEdit(Level._id)}>
                                                                                    <FaEdit className="mr-2" style={{ color: 'yellow' }} /> Edit
                                                                                </button>
                                                                                <button className="dropdown-item" onClick={() => handleDelete(Level._id)}>
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
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Level</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter the name of the new level.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Level Name"
                        type="text"
                        fullWidth
                        value={levelName}
                        onChange={(e) => setLevelName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AdminLayout;
