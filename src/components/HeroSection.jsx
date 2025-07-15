import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import heroLight from '../assets/herolight.png';
import heroDark from '../assets/hero.png';

const HeroSection = ({ darkMode }) => {
  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      {/* Hero Image */}
      <Box
        sx={{
          width: '100%',
          height: { xs: '200px', md: '300px' },
          backgroundImage: `url(${darkMode ? heroDark : heroLight})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          borderRadius: 2,
          mb: 3,
        }}
      />
      
      {/* Flights Title */}
      <Typography
        variant="h4"
        component="h1"
        sx={{
          textAlign: 'center',
          fontWeight: 400,
          color: 'text.primary',
          fontSize: { xs: '28px', md: '36px' },
          fontFamily: 'Google Sans, Roboto, Arial, sans-serif',
          mb: 2,
        }}
      >
        Flights
      </Typography>
    </Container>
  );
};

export default HeroSection;

