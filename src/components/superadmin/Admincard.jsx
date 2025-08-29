import React, { useRef, useState, useEffect } from 'react';
import { FaEllipsisV, FaEdit, FaTrash } from 'react-icons/fa';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, FormControlLabel, Switch } from '@mui/material';

const Admincard = ({ admin, colors, index, handleToggleStatus, handleEdit, handleDelete, activeDropdown, setActiveDropdown }) => {
    const dropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = (adminId, ref) => {
    if (activeDropdown && activeDropdown !== ref) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(ref);
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <div
    key={admin._id}
    className="col-12 col-md-6 col-lg-4 col-xl-4 extra-large"
  >
    <div className="livewire-card card card-dark shadow mb-5 rounded user-card-view hover-card" style={{ borderTop: `2px solid ${colors[index % colors.length]}` }}>
      <Box className="card-body d-flex align-items-center">
        <div className="author-box-left pl-0 mb-auto mr-3">
          <img
            alt="avatar"
            width="50"
            src={`https://ui-avatars.com/api/?name=${admin.fullName}&size=64&rounded=true&color=fff&background=ffaa2e`}
            className="rounded-circle user-avatar-image uAvatar"
          />
          <div className="mt-2 ml-2 userActiveDeActiveChk">
            <FormControlLabel
              control={
                <Switch
                  checked={admin.isActive}
                  onChange={() => handleToggleStatus(admin._id, admin.isActive)}
                  name="statusSwitch"
                  color={admin.isActive ? 'primary' : 'error'}
                />
              }
              label={admin.isActive ? '' : ''}
            />
          </div>
        </div>
        <div className="ml-2 w-100 mb-auto">
          <div className="justify-content-between d-flex">
            <div className="user-card-name pb-1">
              <a href={`https://infyprojects.infyom.com/users/${admin._id}`}>
                <h4>{admin.fullName}</h4>
              </a>
            </div>
            <div className="dropdown" ref={dropdownRef}>
              <FaEllipsisV onClick={() => toggleDropdown(admin._id, dropdownRef.current)} />
              {isDropdownOpen && activeDropdown === dropdownRef.current && (
                <div className="dropdown-menu show">
                  <button className="dropdown-item" onClick={() => handleEdit(admin._id)}>
                    <FaEdit className="mr-2" style={{ color: 'yellow' }} /> Edit
                  </button>
                  <button className="dropdown-item" onClick={() => handleDelete(admin._id)}>
                    <FaTrash className="mr-2" style={{ color: 'red' }} /> Delete
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="card-client-website">
            {admin.organisation.organisationName}
          </div>
          <div className="card-user-email pt-1 mb-3">
            {admin.email}
            <Tooltip title="Email is verified">
              <IconButton size="small">
                <CheckCircleIcon className="email-verified" style={{ color: '#70E398' }} />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </Box>
    </div>
  </div>
  )
}

export default Admincard
