import React from 'react';
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  Divider,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Flight,
  Schedule,
  AttachMoney,
  FlightTakeoff,
  FlightLand,
} from '@mui/icons-material';

const FlightResults = ({ 
  flights = [], 
  loading = false, 
  error = null, 
  onFlightSelect,
  origin,
  destination 
}) => {
  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <CircularProgress size={48} sx={{ mb: 2 }} />
          <Typography variant="h6" sx={{ color: 'text.secondary' }}>
            Searching for flights...
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
            This may take a few moments
          </Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  if (flights.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Flight sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>
            No flights found
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Try adjusting your search criteria or dates
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Results Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          component="h2"
          sx={{
            fontWeight: 400,
            color: 'text.primary',
            fontSize: '20px',
            fontFamily: 'Google Sans, Roboto, Arial, sans-serif',
            mb: 1,
          }}
        >
          Flight results
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            fontSize: '14px',
            fontFamily: 'Google Sans, Roboto, Arial, sans-serif',
          }}
        >
          {flights.length} flight{flights.length !== 1 ? 's' : ''} found from{' '}
          {origin?.presentation?.title || 'Origin'} to{' '}
          {destination?.presentation?.title || 'Destination'}
        </Typography>
      </Box>

      {/* Flight Cards */}
      <Grid container spacing={2}>
        {flights.map((flight, index) => (
          <Grid item xs={12} key={flight.id || index}>
            <Card
              elevation={1}
              sx={{
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                backgroundColor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                '&:hover': {
                  elevation: 3,
                  transform: 'translateY(-2px)',
                  borderColor: 'primary.main',
                },
              }}
              onClick={() => onFlightSelect && onFlightSelect(flight)}
            >
              <CardContent sx={{ p: 3 }}>
                {flight.legs?.map((leg, legIndex) => (
                  <Box key={legIndex}>
                    {legIndex > 0 && (
                      <Divider sx={{ my: 2 }}>
                        <Chip
                          label="Connection"
                          size="small"
                          sx={{ backgroundColor: 'background.paper' }}
                        />
                      </Divider>
                    )}
                    
                    <Grid container spacing={3} alignItems="center">
                      {/* Flight Times and Airports */}
                      <Grid item xs={12} md={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          {/* Departure */}
                          <Box sx={{ textAlign: 'center' }}>
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 600,
                                color: 'text.primary',
                                fontSize: '18px',
                                fontFamily: 'Google Sans, Roboto, Arial, sans-serif',
                              }}
                            >
                              {formatTime(leg.departure)}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                color: 'text.secondary',
                                fontSize: '12px',
                                fontWeight: 500,
                              }}
                            >
                              {leg.origin?.displayCode}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                color: 'text.secondary',
                                fontSize: '10px',
                              }}
                            >
                              {formatDate(leg.departure)}
                            </Typography>
                          </Box>

                          {/* Flight Duration and Icon */}
                          <Box sx={{ flex: 1, textAlign: 'center' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 0.5 }}>
                              <FlightTakeoff sx={{ fontSize: 16, color: 'text.secondary', mr: 1 }} />
                              <Box
                                sx={{
                                  height: '1px',
                                  backgroundColor: 'text.secondary',
                                  flex: 1,
                                  mx: 1,
                                }}
                              />
                              <FlightLand sx={{ fontSize: 16, color: 'text.secondary', ml: 1 }} />
                            </Box>
                            <Typography
                              variant="body2"
                              sx={{
                                color: 'text.secondary',
                                fontSize: '12px',
                              }}
                            >
                              {formatDuration(leg.durationInMinutes)}
                            </Typography>
                          </Box>

                          {/* Arrival */}
                          <Box sx={{ textAlign: 'center' }}>
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 600,
                                color: 'text.primary',
                                fontSize: '18px',
                                fontFamily: 'Google Sans, Roboto, Arial, sans-serif',
                              }}
                            >
                              {formatTime(leg.arrival)}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                color: 'text.secondary',
                                fontSize: '12px',
                                fontWeight: 500,
                              }}
                            >
                              {leg.destination?.displayCode}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                color: 'text.secondary',
                                fontSize: '10px',
                              }}
                            >
                              {formatDate(leg.arrival)}
                            </Typography>
                          </Box>
                        </Box>

                        {/* Airline Info */}
                        <Box sx={{ mt: 2 }}>
                          {leg.carriers?.marketing?.map((carrier, carrierIndex) => (
                            <Chip
                              key={carrierIndex}
                              label={carrier.name}
                              size="small"
                              sx={{
                                mr: 1,
                                backgroundColor: 'background.default',
                                color: 'text.secondary',
                                fontSize: '12px',
                              }}
                            />
                          ))}
                        </Box>
                      </Grid>

                      {/* Price and Book Button */}
                      <Grid item xs={12} md={6}>
                        <Box sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                          <Typography
                            variant="h5"
                            sx={{
                              fontWeight: 600,
                              color: 'text.primary',
                              fontSize: '24px',
                              fontFamily: 'Google Sans, Roboto, Arial, sans-serif',
                              mb: 1,
                            }}
                          >
                            {flight.price?.formatted || `₦${flight.price?.raw?.toLocaleString()}`}
                          </Typography>
                          
                          <Button
                            variant="contained"
                            size="large"
                            sx={{
                              textTransform: 'none',
                              fontWeight: 500,
                              fontSize: '14px',
                              px: 3,
                              py: 1,
                            }}
                          >
                            Select Flight
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Load More Button (if needed) */}
      {flights.length > 0 && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            variant="outlined"
            size="large"
            sx={{
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '14px',
              px: 4,
              py: 1.5,
            }}
          >
            Load More Flights
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default FlightResults;

