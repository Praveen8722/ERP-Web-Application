import "react-pro-sidebar/dist/css/styles.css";
import "./Sidebar.css";  
import React, { useState } from "react";
import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarFooter, SidebarContent, SubMenu } from "react-pro-sidebar";
import { FiHome, FiSettings, FiUsers, FiDatabase, FiArrowDown } from "react-icons/fi";
import { Box, IconButton, InputBase, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ collapsed, toggleSidebar }) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("dashboard");
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleMenuItemClick = (menuId, path) => {
    setSelected(menuId);
    navigate(path);
  };

  const toggleSubMenu = (menu) => {
    setOpenSubMenu((prevMenu) => (prevMenu === menu ? null : menu));
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filterMenuItems = (label) => {
    return label.toLowerCase().includes(searchQuery);
  };

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <FiHome />,
      path: "/superadmin/Dashboard",
    },
    {
      id: "department",
      label: "Department",
      icon: <FiUsers />,
      subMenu: [
        { id: "createDepartment", label: "Create Department", path: "/createdepartment" },
        { id: "departmentType", label: "Department Type", path: "/createdepartmenttype" },
        { id: "viewDepartment", label: "View Department", path: "/viewdepartment" },
      ],
    },
    {
      id: "createLevel",
      label: "Create Level",
      icon: <FiHome />,
      path: "/createLevel",
    },
    {
      id: "createLevel",
      label: "Create Leave Policy",
      icon: <FiHome />,
      path: "/createleavepolicy",
    },
    {
      id: "employee",
      label: "Employee",
      icon: <FiSettings />,
      subMenu: [
        { id: "createRole", label: "Create Role", path: "/createrole" },
        { id: "createEmployee", label: "Create Employee", path: "/createemployee" },
        { id: "viewEmployee", label: "View Employee", path: "/viewemployee" },
      ],
    },
    {
      id: "Leave",
      label: "Leave",
      icon: <FiDatabase />,
      subMenu: 
      [
        { id: "leavecategory", label: "Create Leave Category",path: "/createleavecategory"},
        { id: "leaveapproval", label: "leave Approval",path: "/leaveapproval" },
      ],
    },
    {
      id: "Projects",
      label: "Projects",
      icon: <FiDatabase />,
      subMenu: 
      [
        { id: "createproject", label: "Create Projects",path: "/createprojects"},
        { id: "createstatus", label: "Create Status",path: "/createstatus" },
      ],
    },
    {
      id: "profileSection",
      label: "profile",
      icon: <FiUsers />,
      path: "/profileSection",
    },
    {
      id: "Holidays",
      label: "Holidays",
      icon: <FiHome />,
      path: "/orgholidays",
    },
    {
      id: "payroll",
      label: "Pay Roll",
      icon: <FiArrowDown />,
      path: "/admin/payroll",
    },
  ];

  const filteredMenuItems = menuItems.filter((item) => {
    if (filterMenuItems(item.label)) {
      return true;
    }
    if (item.subMenu) {
      return item.subMenu.some((subItem) => filterMenuItems(subItem.label));
    }
    return false;
  });

  return (
    <ProSidebar
      collapsed={collapsed}
      onToggle={toggleSidebar}
      width={collapsed ? 100 : 270}
      style={{ backgroundColor: "white", height: "100vh", position: "fixed" }}
    >
      <SidebarHeader className="sidebar-header">
        <div className="d-flex flex-column align-items-center mt-4" style={{ paddingLeft: "18px" }}>
          <img className="navbar-brand-full app-header-logo" src="../assets/img/logo-red-black.png" width="65px" alt="Infyom Logo" />
          {!collapsed && (
            <>
              <Typography variant="h6" component="p" sx={{ mt: 1 }}>
                <a href="https://infyprojects.infyom.com/dashboard" style={{ textDecoration: "none", color: "inherit" }}>
                  ERP 
                </a>
              </Typography>
              <Box display="flex" alignItems="center" mt={2} sx={{ border: "1px solid #ccc", borderRadius: "4px", overflow: "hidden" }}>
                <InputBase placeholder="Search Menu" inputProps={{ "aria-label": "search" }} sx={{ flex: 1, paddingLeft: 1 }} onChange={handleSearchChange} />
                <IconButton type="button" aria-label="search">
                  <SearchIcon />
                </IconButton>
              </Box>
              {searchQuery && filteredMenuItems.length === 0 && (
                <Typography variant="body2" color="textSecondary" sx={{ mt: 3 }}>
                  No matching records found.
                </Typography>
              )}
            </>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent className="sidebar-content">
        <Menu>
          {filteredMenuItems.map((item) => (
            <React.Fragment key={item.id}>
              {item.subMenu ? (
                <SubMenu
                  title={!collapsed && item.label}
                  icon={item.icon}
                  open={openSubMenu === item.id}
                  onOpenChange={() => toggleSubMenu(item.id)}
                  className="submenu-item"
                >
                  {item.subMenu
                    .filter((subItem) => filterMenuItems(subItem.label))
                    .map((subItem) => (
                      <MenuItem key={subItem.id} onClick={() => handleMenuItemClick(subItem.id, subItem.path)} className="menu-item">
                        {subItem.label}
                      </MenuItem>
                    ))}
                </SubMenu>
              ) : (
                <MenuItem icon={item.icon} active={selected === item.id} onClick={() => handleMenuItemClick(item.id, item.path)} className="menu-item">
                  {!collapsed && item.label}
                </MenuItem>
              )}
            </React.Fragment>
          ))}
        </Menu>
      </SidebarContent>
      <SidebarFooter>{/* Footer content, if any */}</SidebarFooter>
    </ProSidebar>
  );
};

export default Sidebar;
