import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import { RiMenu5Fill } from 'react-icons/ri';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ListItemIcon from '@mui/material/ListItemIcon';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { Stack, Menu, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function NavbarERP() {
  const [open, setOpen] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const [productMenuAnchorEl, setProductMenuAnchorEl] = React.useState(null);
const navigate=useNavigate();
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleProductMenuOpen = (event) => {
    setProductMenuAnchorEl(event.currentTarget);
  };

  const handleProductMenuClose = () => {
    setProductMenuAnchorEl(null);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'product', label: 'Product' },
  ];

  return (
    <>
      <AppBar position="fixed" variant="regular" sx={{ bgcolor: 'white' }}>
        <Toolbar
          sx={{
            display: 'flex',
            mt: { sm: '10px', xs: '10px' },
            mr: { sm: '100px', xs: '1px' },
            ml: { sm: '50px', xs: '1px' },
            alignItems: 'center',
            justifyContent: 'space-between',
            minHeight: '40px',
          }}
        >
          <Box 
           sx={{
            display: 'flex',
            alignItems: 'center',
            px: 0,
            fontSize:'20px'
          }}
          >
            <Stack direction={'row'} justifyContent={'flex-start'} alignItems={'center'} spacing={2}>
              <img src="/assets/img/logo.png" alt="logo"  style={{ width: '70px', height: '60px' }}/>
              <span
                style={{
                  fontWeight: '750',
                  fontSize: '3rem',
                  fontFamily: 'Poppins, sans-serif',
                  background:
                    'linear-gradient(90deg, rgba(145,72,220,1) 0%, rgba(199,73,200,1) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: '#6777F0',
                }}
              >
                ERP
              </span>
            </Stack>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 5.5, ml: 6, alignItems: 'center' }}>
              {navItems.map((item) => (
                <Box
                  key={item.id}
                  onMouseEnter={item.id === 'product' ? handleProductMenuOpen : null}
                  onMouseLeave={item.id === 'product' ? handleProductMenuClose : null}
                >
                  <Button
                    variant="text"
                    sx={{
                      fontFamily: 'Poppins, sans-serif',
                      // color: 'rgb(28, 27, 31)',
                      textDecoration: 'none',
                      color: 'gray',
                      fontWeight: '500',
                      fontSize: '1.2rem',
                      // fontFamily: 'sans-serif',
                      textTransform: 'capitalize',
                      padding: '5px',
                      '&:hover': {
                        color: '#4876EE',
                      },
                    }}
                    endIcon={item.id === 'product' ? <ExpandMoreRoundedIcon /> : null}
                    size="large"
                    aria-controls={item.id === 'product' ? 'product-menu' : undefined}
                    aria-haspopup={item.id === 'product' ? 'true' : undefined}
                  >
                    {item.label}
                  </Button>
                  {item.id === 'product' && (
                    <Menu
                      id="product-menu"
                      anchorEl={productMenuAnchorEl}
                      open={Boolean(productMenuAnchorEl)}
                      onClose={handleProductMenuClose}
                      MenuListProps={{
                        onMouseLeave: handleProductMenuClose,
                      }}
                    >
                      <MenuItem onClick={handleProductMenuClose}>
                        <Typography variant="inherit">Software</Typography>
                      </MenuItem>
                      <MenuItem onClick={handleProductMenuClose}>
                        <Typography variant="inherit">Digital Marketing</Typography>
                      </MenuItem>
                      <MenuItem onClick={handleProductMenuClose}>
                        <Typography variant="inherit">IOT</Typography>
                      </MenuItem>
                      <MenuItem onClick={handleProductMenuClose}>
                        <Typography variant="inherit">Web Design & Development</Typography>
                      </MenuItem>
                      <MenuItem onClick={handleProductMenuClose}>
                        <Typography variant="inherit">Employee Self Service</Typography>
                      </MenuItem>
                    </Menu>
                  )}
                </Box>
              ))}
            </Box>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 5.5, alignItems: 'center' }}>
            <button
              style={{
                padding: '18px 30px',
                backgroundColor: isHovered ? '#6777F0' : '#310052',
                color: 'white',
                border: isHovered ? '2px solid black' : 'none',
                borderRadius: '80px',
                fontSize: '16px',
                fontWeight: '100',
                fontFamily:'Poppins, sans-serif',
                cursor: 'pointer',
                marginRight:'-3rem'
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => navigate('/login')}
            >
              Login
            </button>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', justifyContent: 'flex-end', flex: 1 }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <RiMenu5Fill style={{ color: '#9148dc' }} />
            </IconButton>
            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
              <Box sx={{ p: 4, bgcolor: 'background.default' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon sx={{ color: '#9148dc' }} />
                  </IconButton>
                </Box>
                <Divider sx={{ my: 3 }} />
                <Box >
                  {navItems.map((item) => (
                    <Box
                      key={item.id}
                      onMouseEnter={item.id === 'product' ? handleProductMenuOpen : null}
                      onMouseLeave={item.id === 'product' ? handleProductMenuClose : null}
                    >
                      <MenuItem
                        sx={{
                          fontFamily: 'Poppins, sans-serif',
                          color: 'black',
                          textTransform: 'capitalize',
                          padding: '5px',
                          '&:hover': {
                            color: '#4876EE',
                          },
                        }}
                      >
                        <ListItemIcon sx={{ color: '#9148dc',mr:'-1.5rem' }}>{item.icon}</ListItemIcon>
                        {item.label}
                      </MenuItem>
                      {item.id === 'product' && (
                        <Menu
                          id="product-menu"
                          anchorEl={productMenuAnchorEl}
                          open={Boolean(productMenuAnchorEl)}
                          onClose={handleProductMenuClose}
                          MenuListProps={{
                            onMouseLeave: handleProductMenuClose,
                          }}
                        >
                          <MenuItem onClick={handleProductMenuClose}>
                            <Typography variant="inherit">Software</Typography>
                          </MenuItem>
                          <MenuItem onClick={handleProductMenuClose}>
                            <Typography variant="inherit">Digital Marketing</Typography>
                          </MenuItem>
                          <MenuItem onClick={handleProductMenuClose}>
                            <Typography variant="inherit">IOT</Typography>
                          </MenuItem>
                          <MenuItem onClick={handleProductMenuClose}>
                            <Typography variant="inherit">Web Design & Development</Typography>
                          </MenuItem>
                          <MenuItem onClick={handleProductMenuClose}>
                            <Typography variant="inherit">Employee Self Service</Typography>
                          </MenuItem>
                        </Menu>
                      )}
                    </Box>
                  ))}
                </Box>
                <Divider sx={{ my: 3 }} />
                <button
                  style={{
                    padding: '18px 30px',
                    backgroundColor: isHovered ? '#AA00EA' : '#310052',
                    color: 'white',
                    border: isHovered ? '2px solid black' : 'none',
                    borderRadius: '80px',
                    fontSize: '16px',
                    fontWeight: '100',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  onClick={() => navigate('/login')}
                >
                  Login
                </button>
              </Box>
            </Drawer>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default NavbarERP;
