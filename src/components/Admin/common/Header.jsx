import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  MenuItem,
  Avatar,
  Select,
  InputBase,
  Menu,
  Typography,
  Paper,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LanguageIcon from "@mui/icons-material/Language";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useNavigate } from "react-router-dom";

const Header = ({ collapsed, toggleSidebar }) => {
  const [profileValue, setProfileValue] = useState("InfyTracker Admin");
  const [language, setLanguage] = useState("EN");
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate=useNavigate()

  const handleChangeProfile = (event) => {
    setProfileValue(event.target.value);
  };

  const handleChangeLanguage = (event) => {
    setLanguage(event.target.value);
  };

  const handleNotificationClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#6777ef",
          zIndex: 1300,
          width: collapsed ? "calc(100% - 100px)" : "calc(100% - 270px)",
          paddingBottom: "40px",
          paddingTop: "10px",
          marginBottom: "1rem",
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={toggleSidebar}
            sx={{ marginRight: "16px" }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            component="ul"
            sx={{
              display: "flex",
              alignItems: "center",
              listStyle: "none",
              padding: 0,
              margin: 0,
              flexGrow: 1,
              justifyContent: "flex-end",
            }}
          >
            <li>
              <IconButton
                color="inherit"
                href="https://infyprojects.infyom.com/settings"
                title="Setting"
              >
                <SettingsIcon />
              </IconButton>
            </li>
            <li>
              <IconButton
                color="inherit"
                title="Notifications"
                onClick={handleNotificationClick}
              >
                <NotificationsIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleNotificationClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                className="px-5"
              >
                <MenuItem>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography sx={{ marginRight: "8px" }}>
                      Notifications
                    </Typography>
                  </Box>
                </MenuItem>
                <MenuItem className="p-3 my-3">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      padding: "2rem",
                    }}
                  >
                    <HelpOutlineIcon sx={{ color: "blue", fontSize: "50px" }} />
                    <Typography
                      variant="h6"
                      sx={{ marginTop: "8px", fontWeight: "600" }}
                      className="text-center"
                    >
                      We couldn't find any <br />
                      notifications
                    </Typography>
                  </Box>
                </MenuItem>
              </Menu>
            </li>
            <li>
              <Select
                value={language}
                onChange={handleChangeLanguage}
                displayEmpty
                input={
                  <InputBase
                    sx={{
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      marginRight: "8px",
                    }}
                  />
                }
                sx={{
                  color: "white",
                  "& .MuiSelect-icon": { color: "white" },
                  "& .MuiSelect-root": { padding: "8px 0", color: "inherit" },
                }}
                renderValue={(selected) => (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    {selected || "EN"}
                  </Box>
                )}
              >
                <MenuItem
                  value="EN"
                  sx={{
                    "&:hover": { backgroundColor: "blue", color: "white" },
                  }}
                >
                  English
                </MenuItem>
                <MenuItem
                  value="FR"
                  sx={{
                    "&:hover": { backgroundColor: "blue", color: "white" },
                  }}
                >
                  French
                </MenuItem>
                <MenuItem
                  value="ES"
                  sx={{
                    "&:hover": { backgroundColor: "blue", color: "white" },
                  }}
                >
                  Spanish
                </MenuItem>
                <MenuItem
                  value="DE"
                  sx={{
                    "&:hover": { backgroundColor: "blue", color: "white" },
                  }}
                >
                  German
                </MenuItem>
                <MenuItem
                  value="IT"
                  sx={{
                    "&:hover": { backgroundColor: "blue", color: "white" },
                  }}
                >
                  Italian
                </MenuItem>
                <MenuItem
                  value="JA"
                  sx={{
                    "&:hover": { backgroundColor: "blue", color: "white" },
                  }}
                >
                  Japanese
                </MenuItem>
                <MenuItem
                  value="ZH"
                  sx={{
                    "&:hover": { backgroundColor: "blue", color: "white" },
                  }}
                >
                  Chinese
                </MenuItem>
                <MenuItem
                  value="RU"
                  sx={{
                    "&:hover": { backgroundColor: "blue", color: "white" },
                  }}
                >
                  Russian
                </MenuItem>
                <MenuItem
                  value="HI"
                  sx={{
                    "&:hover": { backgroundColor: "blue", color: "white" },
                  }}
                >
                  Hindi
                </MenuItem>
                <MenuItem
                  value="AR"
                  sx={{
                    "&:hover": { backgroundColor: "blue", color: "white" },
                  }}
                >
                  Arabic
                </MenuItem>
              </Select>
            </li>
            <li>
              <Select
                value={profileValue}
                onChange={handleChangeProfile}
                displayEmpty
                input={
                  <InputBase
                    sx={{
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      marginRight: "8px",
                    }}
                  />
                }
                sx={{
                  color: "white",
                  "& .MuiSelect-icon": { color: "white" },
                  "& .MuiSelect-root": { padding: "8px 0", color: "inherit" },
                }}
                renderValue={() => (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      alt="InfyTracker Admin"
                      src="https://ui-avatars.com/api/?name=InfyTracker Admin&size=32&rounded=true&color=fff&background=fc6369"
                      sx={{ marginRight: "8px" }}
                    />
                    <Typography variant="body1" sx={{ color: "white" }}>
                      Organisation Admin
                    </Typography>
                  </Box>
                )}
              >
                <MenuItem value="Profile">
                  <AccountCircleIcon sx={{ marginRight: "8px" }} />
                  Profile
                </MenuItem>
                <MenuItem value="ChangePassword">
                  <LockIcon sx={{ marginRight: "8px" }} />
                  Change Password
                </MenuItem>
                <MenuItem value="NotificationSetting">
                  <SettingsIcon sx={{ marginRight: "8px" }} />
                  Notification Setting
                </MenuItem>
                <MenuItem
                  value="Logout"
                  onClick={() => {
                    localStorage.clear();
                    navigate("/") ;

                  }}
                  className="text-danger"
                >
                  <ExitToAppIcon sx={{ marginRight: "8px" }} />
                  Logout
                </MenuItem>
              </Select>
            </li>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
