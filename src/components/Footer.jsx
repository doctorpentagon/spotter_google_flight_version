import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Button,
  Menu,
  MenuItem,
  Link,
  Divider,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

const Footer = () => {
  const [languageMenuAnchor, setLanguageMenuAnchor] = useState(null);
  const [locationMenuAnchor, setLocationMenuAnchor] = useState(null);
  const [currencyMenuAnchor, setCurrencyMenuAnchor] = useState(null);
  const [internationalMenuAnchor, setInternationalMenuAnchor] = useState(null);
  const [exploreMenuAnchor, setExploreMenuAnchor] = useState(null);

  const handleMenuOpen = (setter) => (event) => {
    setter(event.currentTarget);
  };

  const handleMenuClose = (setter) => () => {
    setter(null);
  };

  const internationalSites = [
    'Google Flights - United States (en-US)',
    'Google Voos - Brasil (pt-BR)',
    'Google Flights - Canada (en)',
    'Google Flights - United Kingdom (en-GB)',
    'Google Flights - India (en)',
    'Google Flights - France (fr)',
    'Google Flüge - Deutschland (de)',
    'Google Vuelos - España (es)',
    'Google Flights - Australia (en)',
    'Google Flights - México (es)',
  ];

  const exploreOptions = [
    'Popular departures from Nigeria',
    'Popular routes from Nigeria',
    'Popular destinations from Nigeria',
    'Popular regions from Nigeria',
  ];

  const footerLinks = [
    'About',
    'Privacy',
    'Terms',
    'Join user studies',
    'Feedback',
    'Help Center',
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Settings Row */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
          mb: 3,
          flexWrap: 'wrap',
        }}
      >
        <Button
          endIcon={<ExpandMore />}
          onClick={handleMenuOpen(setLanguageMenuAnchor)}
          sx={{
            textTransform: 'none',
            color: 'text.primary',
            fontFamily: 'Google Sans, Roboto, Arial, sans-serif',
            fontSize: '14px',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            px: 2,
            py: 1,
          }}
        >
          Language · English (United States)
        </Button>

        <Button
          endIcon={<ExpandMore />}
          onClick={handleMenuOpen(setLocationMenuAnchor)}
          sx={{
            textTransform: 'none',
            color: 'text.primary',
            fontFamily: 'Google Sans, Roboto, Arial, sans-serif',
            fontSize: '14px',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            px: 2,
            py: 1,
          }}
        >
          Location · Nigeria
        </Button>

        <Button
          endIcon={<ExpandMore />}
          onClick={handleMenuOpen(setCurrencyMenuAnchor)}
          sx={{
            textTransform: 'none',
            color: 'text.primary',
            fontFamily: 'Google Sans, Roboto, Arial, sans-serif',
            fontSize: '14px',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            px: 2,
            py: 1,
          }}
        >
          Currency · NGN
        </Button>
      </Box>

      {/* Current Settings Info */}
      <Typography
        variant="body2"
        sx={{
          textAlign: 'center',
          color: 'text.secondary',
          fontSize: '12px',
          fontFamily: 'Google Sans, Roboto, Arial, sans-serif',
          mb: 3,
        }}
      >
        Current language and currency options applied: English (United States) - Nigeria - NGN
      </Typography>

      <Typography
        variant="body2"
        sx={{
          textAlign: 'center',
          color: 'text.secondary',
          fontSize: '12px',
          fontFamily: 'Google Sans, Roboto, Arial, sans-serif',
          mb: 4,
        }}
      >
        Displayed currencies may differ from the currencies used to purchase flights. Learn more
      </Typography>

      {/* Footer Links */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 3,
          mb: 4,
          flexWrap: 'wrap',
        }}
      >
        {footerLinks.map((link, index) => (
          <Link
            key={index}
            href="#"
            underline="none"
            sx={{
              color: 'primary.main',
              fontSize: '14px',
              fontFamily: 'Google Sans, Roboto, Arial, sans-serif',
              '&:hover': {
                color: 'primary.dark',
                textDecoration: 'underline',
              },
            }}
          >
            {link}
          </Link>
        ))}
      </Box>

      <Divider sx={{ my: 4, borderColor: 'divider' }} />

      {/* Bottom Section */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Button
            endIcon={<ExpandMore />}
            onClick={handleMenuOpen(setInternationalMenuAnchor)}
            sx={{
              textTransform: 'none',
              color: 'primary.main',
              fontFamily: 'Google Sans, Roboto, Arial, sans-serif',
              fontSize: '14px',
              p: 0,
              '&:hover': {
                backgroundColor: 'transparent',
                color: 'primary.dark',
              },
            }}
          >
            International sites
          </Button>
        </Grid>

        <Grid item xs={12} md={6}>
          <Button
            endIcon={<ExpandMore />}
            onClick={handleMenuOpen(setExploreMenuAnchor)}
            sx={{
              textTransform: 'none',
              color: 'primary.main',
              fontFamily: 'Google Sans, Roboto, Arial, sans-serif',
              fontSize: '14px',
              p: 0,
              '&:hover': {
                backgroundColor: 'transparent',
                color: 'primary.dark',
              },
            }}
          >
            Explore flights
          </Button>
        </Grid>
      </Grid>

      {/* Menus */}
      <Menu
        anchorEl={languageMenuAnchor}
        open={Boolean(languageMenuAnchor)}
        onClose={handleMenuClose(setLanguageMenuAnchor)}
      >
        <MenuItem onClick={handleMenuClose(setLanguageMenuAnchor)}>
          English (United States)
        </MenuItem>
      </Menu>

      <Menu
        anchorEl={locationMenuAnchor}
        open={Boolean(locationMenuAnchor)}
        onClose={handleMenuClose(setLocationMenuAnchor)}
      >
        <MenuItem onClick={handleMenuClose(setLocationMenuAnchor)}>
          Nigeria
        </MenuItem>
      </Menu>

      <Menu
        anchorEl={currencyMenuAnchor}
        open={Boolean(currencyMenuAnchor)}
        onClose={handleMenuClose(setCurrencyMenuAnchor)}
      >
        <MenuItem onClick={handleMenuClose(setCurrencyMenuAnchor)}>
          NGN - Nigerian Naira
        </MenuItem>
      </Menu>

      <Menu
        anchorEl={internationalMenuAnchor}
        open={Boolean(internationalMenuAnchor)}
        onClose={handleMenuClose(setInternationalMenuAnchor)}
        PaperProps={{
          sx: { maxHeight: 300, width: 300 },
        }}
      >
        {internationalSites.map((site, index) => (
          <MenuItem
            key={index}
            onClick={handleMenuClose(setInternationalMenuAnchor)}
            sx={{ fontSize: '14px' }}
          >
            {site}
          </MenuItem>
        ))}
      </Menu>

      <Menu
        anchorEl={exploreMenuAnchor}
        open={Boolean(exploreMenuAnchor)}
        onClose={handleMenuClose(setExploreMenuAnchor)}
        PaperProps={{
          sx: { maxHeight: 300, width: 300 },
        }}
      >
        {exploreOptions.map((option, index) => (
          <MenuItem
            key={index}
            onClick={handleMenuClose(setExploreMenuAnchor)}
            sx={{ fontSize: '14px' }}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </Container>
  );
};

export default Footer;

