import React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Link,
  Divider,
} from '@mui/material';

const PopularRoutes = () => {
  const routesColumn1 = [
    'Flights from New York to London',
    'Flights from New York to Paris',
    'Flights from London to Paris',
    'Flights from New York to Rome',
    'Flights from Montreal to Paris',
    'Flights from London to Milan',
    'Flights from Toronto to London',
  ];

  const routesColumn2 = [
    'Flights from New York to Milan',
    'Flights from London to Dubai',
    'Flights from London to Tokyo',
    'Flights from Madrid to Rome',
    'Flights from London to Delhi',
    'Flights from New York to Los Angeles',
    'Flights from Paris to Marrakech',
  ];

  const routesColumn3 = [
    'Flights from Sao Paulo to London',
    'Flights from London to Istanbul',
    'Flights from Paris to Bangkok',
    'Flights from New York to Orlando',
    'Flights from London to Berlin',
    'Flights from Chicago to Paris',
    'Flights from Melbourne to London',
  ];

  const RouteColumn = ({ routes }) => (
    <Box>
      {routes.map((route, index) => (
        <Box key={index} sx={{ mb: 1 }}>
          <Link
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
            {route}
          </Link>
        </Box>
      ))}
    </Box>
  );

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
        Find cheap flights on popular routes
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <RouteColumn routes={routesColumn1} />
        </Grid>
        <Grid item xs={12} md={4}>
          <RouteColumn routes={routesColumn2} />
        </Grid>
        <Grid item xs={12} md={4}>
          <RouteColumn routes={routesColumn3} />
        </Grid>
      </Grid>

      {/* Divider */}
      <Divider 
        sx={{ 
          my: 6,
          borderColor: 'divider',
        }} 
      />
    </Container>
  );
};

export default PopularRoutes;

