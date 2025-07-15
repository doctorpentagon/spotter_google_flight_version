import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  DarkMode,
  LightMode,
  SettingsBrightness,
  AccountCircle,
  ArrowBack,
} from '@mui/icons-material';

const Header = ({ 
  darkMode, 
  setDarkMode, 
  currentPage, 
  setCurrentPage, 
  onBackToSearch 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [themeMenuAnchor, setThemeMenuAnchor] = useState(null);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);

  const handleThemeMenuOpen = (event) => {
    setThemeMenuAnchor(event.currentTarget);
  };

  const handleThemeMenuClose = () => {
    setThemeMenuAnchor(null);
  };

  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  const handleThemeChange = (newTheme) => {
    if (newTheme === 'dark') {
      setDarkMode(true);
    } else if (newTheme === 'light') {
      setDarkMode(false);
    } else {
      // System default - for now, just use light mode
      setDarkMode(false);
    }
    handleThemeMenuClose();
  };

  const handleNavigation = (page) => {
    if (page === 'flights' && currentPage === 'results') {
      onBackToSearch && onBackToSearch();
    } else {
      setCurrentPage(page);
    }
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: 'background.default',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
        {/* Left Section - Logo and Navigation */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Back Button for Results Page */}
          {currentPage === 'results' && (
            <IconButton
              onClick={() => handleNavigation('flights')}
              sx={{ color: 'text.primary', mr: 1 }}
              aria-label="back to search"
            >
              <ArrowBack />
            </IconButton>
          )}

          {/* Google Logo */}
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: 400,
              color: 'text.primary',
              fontSize: '22px',
              fontFamily: 'Product Sans, Google Sans, Roboto, Arial, sans-serif',
              letterSpacing: '-0.5px',
            }}
          >
            Google
          </Typography>

          {/* Navigation Buttons */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
              <Button
                variant={currentPage === 'flights' || currentPage === 'results' ? 'contained' : 'text'}
                onClick={() => handleNavigation('flights')}
                sx={{
                  textTransform: 'none',
                  fontWeight: 500,
                  fontSize: '14px',
                  fontFamily: 'Google Sans, Roboto, Arial, sans-serif',
                  borderRadius: '20px',
                  px: 3,
                  py: 1,
                  color: currentPage === 'flights' || currentPage === 'results' 
                    ? 'primary.contrastText' 
                    : 'text.primary',
                  backgroundColor: currentPage === 'flights' || currentPage === 'results' 
                    ? 'primary.main' 
                    : 'transparent',
                  '&:hover': {
                    backgroundColor: currentPage === 'flights' || currentPage === 'results' 
                      ? 'primary.dark' 
                      : 'action.hover',
                  },
                }}
              >
                Flights
              </Button>
              
              <Button
                variant={currentPage === 'explore' ? 'contained' : 'text'}
                onClick={() => handleNavigation('explore')}
                sx={{
                  textTransform: 'none',
                  fontWeight: 500,
                  fontSize: '14px',
                  fontFamily: 'Google Sans, Roboto, Arial, sans-serif',
                  borderRadius: '20px',
                  px: 3,
                  py: 1,
                  color: currentPage === 'explore' 
                    ? 'primary.contrastText' 
                    : 'text.primary',
                  backgroundColor: currentPage === 'explore' 
                    ? 'primary.main' 
                    : 'transparent',
                  '&:hover': {
                    backgroundColor: currentPage === 'explore' 
                      ? 'primary.dark' 
                      : 'action.hover',
                  },
                }}
              >
                Explore
              </Button>
            </Box>
          )}
        </Box>

        {/* Right Section - Theme Toggle and Profile */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Theme Toggle */}
          <IconButton
            onClick={handleThemeMenuOpen}
            sx={{ color: 'text.primary' }}
            aria-label="change theme"
          >
            {darkMode ? <DarkMode /> : <LightMode />}
          </IconButton>

          {/* Profile Button */}
          <IconButton
            onClick={handleProfileMenuOpen}
            sx={{ color: 'text.primary' }}
            aria-label="profile"
          >
            <AccountCircle />
          </IconButton>
        </Box>

        {/* Theme Menu */}
        <Menu
          anchorEl={themeMenuAnchor}
          open={Boolean(themeMenuAnchor)}
          onClose={handleThemeMenuClose}
          PaperProps={{
            sx: {
              backgroundColor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              minWidth: 180,
            },
          }}
        >
          <MenuItem
            onClick={() => handleThemeChange('system')}
            sx={{
              fontFamily: 'Google Sans, Roboto, Arial, sans-serif',
              fontSize: '14px',
            }}
          >
            <SettingsBrightness sx={{ mr: 2 }} />
            Use device default
          </MenuItem>
          <MenuItem
            onClick={() => handleThemeChange('dark')}
            sx={{
              fontFamily: 'Google Sans, Roboto, Arial, sans-serif',
              fontSize: '14px',
            }}
          >
            <DarkMode sx={{ mr: 2 }} />
            Dark theme
          </MenuItem>
          <MenuItem
            onClick={() => handleThemeChange('light')}
            sx={{
              fontFamily: 'Google Sans, Roboto, Arial, sans-serif',
              fontSize: '14px',
            }}
          >
            <LightMode sx={{ mr: 2 }} />
            Light theme
          </MenuItem>
        </Menu>

        {/* Profile Menu */}
        <Menu
          anchorEl={profileMenuAnchor}
          open={Boolean(profileMenuAnchor)}
          onClose={handleProfileMenuClose}
          PaperProps={{
            sx: {
              backgroundColor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              minWidth: 200,
            },
          }}
        >
          <MenuItem
            onClick={handleProfileMenuClose}
            sx={{
              fontFamily: 'Google Sans, Roboto, Arial, sans-serif',
              fontSize: '14px',
            }}
          >
            Sign in
          </MenuItem>
          <MenuItem
            onClick={handleProfileMenuClose}
            sx={{
              fontFamily: 'Google Sans, Roboto, Arial, sans-serif',
              fontSize: '14px',
            }}
          >
            Settings
          </MenuItem>
          <MenuItem
            onClick={handleProfileMenuClose}
            sx={{
              fontFamily: 'Google Sans, Roboto, Arial, sans-serif',
              fontSize: '14px',
            }}
          >
            Help
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

