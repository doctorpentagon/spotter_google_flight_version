import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';

// Import city images
import lagosImg from '../assets/cities/lagos.jpg';
import abujaImg from '../assets/cities/abuja.jpg';
import akureImg from '../assets/cities/akure.jpg';
import beninImg from '../assets/cities/benin.jpg';
import warriImg from '../assets/cities/warri.jpg';
import gombeImg from '../assets/cities/gombe.jpg';
import ibadanImg from '../assets/cities/ibadan.jpg';

const PopularDestinations = ({ origin = 'Ilorin' }) => {
  // Mock data for popular destinations with local images
  const destinations = [
    { name: 'Lagos', price: '₦45,000', image: lagosImg },
    { name: 'Abuja', price: '₦38,000', image: abujaImg },
    { name: 'Akure', price: '₦25,000', image: akureImg },
    { name: 'Benin', price: '₦32,000', image: beninImg },
    { name: 'Warri', price: '₦28,000', image: warriImg },
    { name: 'Gombe', price: '₦42,000', image: gombeImg },
    { name: 'Ibadan', price: '₦22,000', image: ibadanImg },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography
        variant="h5"
        component="h2"
        sx={{
          fontWeight: 500,
          color: 'text.primary',
          fontSize: '20px',
          fontFamily: 'Google Sans, Roboto, Arial, sans-serif',
          mb: 4,
        }}
      >
        Popular destinations from {origin}
      </Typography>

      <Grid container spacing={3}>
        {destinations.map((destination, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card
              elevation={0}
              sx={{
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                backgroundColor: 'background.paper',
                border: '1px solid',
                borderColor: 'rgba(0,0,0,0.1)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                '&:hover': {
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  transform: 'translateY(-1px)',
                },
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  height: 120,
                  objectFit: 'cover',
                }}
                image={destination.image}
                alt={`${destination.name} cityscape`}
              />
              
              <CardContent sx={{ p: 2 }}>
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    fontWeight: 500,
                    color: 'text.primary',
                    fontSize: '16px',
                    fontFamily: 'Google Sans, Roboto, Arial, sans-serif',
                    mb: 0.5,
                  }}
                >
                  {destination.name}
                </Typography>
                
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    fontSize: '14px',
                    fontFamily: 'Google Sans, Roboto, Arial, sans-serif',
                  }}
                >
                  from {destination.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PopularDestinations;

