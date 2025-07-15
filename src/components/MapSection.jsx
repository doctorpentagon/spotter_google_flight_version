import React from 'react';
import { Box, Typography, Container, Card, CardContent, IconButton } from '@mui/material';
import { SwapHoriz } from '@mui/icons-material';
import destinationLight from '../assets/destination.png';
import destinationDark from '../assets/destinationdark.png';

const MapSection = ({ darkMode, origin = 'Ilorin', destination = 'Lagos' }) => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h5"
        component="h2"
        sx={{
          fontWeight: 500,
          color: 'text.primary',
          fontSize: '20px',
          fontFamily: 'Google Sans, Roboto, Arial, sans-serif',
          mb: 3,
        }}
      >
        Find cheap flights from {origin} to anywhere
      </Typography>

      <Card
        elevation={1}
        sx={{
          backgroundColor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          mb: 4,
        }}
      >
        <CardContent sx={{ p: 3 }}>
          {/* Location selector */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              mb: 3,
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontWeight: 500,
                color: 'text.primary',
                fontFamily: 'Google Sans, Roboto, Arial, sans-serif',
              }}
            >
              {origin}
            </Typography>
            
            <IconButton
              sx={{ color: 'text.secondary' }}
              aria-label="swap locations"
            >
              <SwapHoriz />
            </IconButton>
            
            <Typography
              variant="body1"
              sx={{
                fontWeight: 500,
                color: 'text.primary',
                fontFamily: 'Google Sans, Roboto, Arial, sans-serif',
              }}
            >
              {destination}
            </Typography>
          </Box>

          {/* Map Image */}
          <Box
            sx={{
              width: '100%',
              height: { xs: '250px', md: '400px' },
              backgroundImage: `url(${darkMode ? destinationDark : destinationLight})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'rgba(0,0,0,0.1)',
            }}
          />
        </CardContent>
      </Card>
    </Container>
  );
};

export default MapSection;

