import React, { useState } from 'react';
import {
  Box,
  Container,
  Card,
  CardContent,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Typography,
  Alert,
  Menu,
  Divider,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SwapHoriz, Person, Flight, Add, Remove } from '@mui/icons-material';
import dayjs from 'dayjs';
import AirportAutocomplete from './AirportAutocomplete';

const SearchForm = ({ onSearch, loading = false, error = null }) => {
  const [tripType, setTripType] = useState('round');
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [departureDate, setDepartureDate] = useState(dayjs().add(1, 'day'));
  const [returnDate, setReturnDate] = useState(dayjs().add(8, 'day'));
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const [cabinClass, setCabinClass] = useState('economy');
  const [passengersMenuAnchor, setPassengersMenuAnchor] = useState(null);

  const handleSwapLocations = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const handlePassengersMenuOpen = (event) => {
    setPassengersMenuAnchor(event.currentTarget);
  };

  const handlePassengersMenuClose = () => {
    setPassengersMenuAnchor(null);
  };

  const updatePassengerCount = (type, increment) => {
    setPassengers(prev => ({
      ...prev,
      [type]: Math.max(type === 'adults' ? 1 : 0, prev[type] + (increment ? 1 : -1))
    }));
  };

  const getTotalPassengers = () => {
    return passengers.adults + passengers.children + passengers.infants;
  };

  const handleSearch = () => {
    if (!origin || !destination || !departureDate) {
      return;
    }

    const searchParams = {
      tripType,
      origin,
      destination,
      departureDate: departureDate.format('YYYY-MM-DD'),
      returnDate: tripType === 'round' ? returnDate?.format('YYYY-MM-DD') : null,
      passengers,
      cabinClass,
      originSkyId: origin.navigation?.relevantFlightParams?.skyId,
      destinationSkyId: destination.navigation?.relevantFlightParams?.skyId,
      originEntityId: origin.navigation?.relevantFlightParams?.entityId,
      destinationEntityId: destination.navigation?.relevantFlightParams?.entityId,
      date: departureDate.format('YYYY-MM-DD'),
      adults: passengers.adults,
      children: passengers.children,
      infants: passengers.infants,
    };

    onSearch(searchParams);
  };

  const isSearchDisabled = !origin || !destination || !departureDate || loading;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Card
          elevation={0}
          sx={{
            backgroundColor: 'background.paper',
            border: '1px solid',
            borderColor: 'rgba(0,0,0,0.1)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            borderRadius: 2,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            {/* Trip Type and Passenger/Class Selection */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Trip Type</InputLabel>
                  <Select
                    value={tripType}
                    label="Trip Type"
                    onChange={(e) => setTripType(e.target.value)}
                  >
                    <MenuItem value="round">Round trip</MenuItem>
                    <MenuItem value="one-way">One way</MenuItem>
                    <MenuItem value="multi-city">Multi-city</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Person />}
                  onClick={handlePassengersMenuOpen}
                  sx={{
                    height: '56px',
                    textTransform: 'none',
                    justifyContent: 'flex-start',
                    color: 'text.primary',
                    borderColor: 'divider',
                  }}
                >
                  {getTotalPassengers()} passenger{getTotalPassengers() !== 1 ? 's' : ''}
                </Button>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Cabin Class</InputLabel>
                  <Select
                    value={cabinClass}
                    label="Cabin Class"
                    onChange={(e) => setCabinClass(e.target.value)}
                  >
                    <MenuItem value="economy">Economy</MenuItem>
                    <MenuItem value="premium_economy">Premium Economy</MenuItem>
                    <MenuItem value="business">Business</MenuItem>
                    <MenuItem value="first">First</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {/* Origin and Destination */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} md={5}>
                <AirportAutocomplete
                  label="Where from?"
                  value={origin}
                  onChange={setOrigin}
                  placeholder="Enter departure city or airport"
                />
              </Grid>

              <Grid item xs={12} md={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconButton
                  onClick={handleSwapLocations}
                  sx={{
                    color: 'primary.main',
                    backgroundColor: 'background.default',
                    border: '1px solid',
                    borderColor: 'divider',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                  aria-label="swap locations"
                >
                  <SwapHoriz />
                </IconButton>
              </Grid>

              <Grid item xs={12} md={5}>
                <AirportAutocomplete
                  label="Where to?"
                  value={destination}
                  onChange={setDestination}
                  placeholder="Enter destination city or airport"
                />
              </Grid>
            </Grid>

            {/* Dates */}
            <Grid container spacing={2} sx={{ mb: 4 }}>
              <Grid item xs={12} md={6}>
                <DatePicker
                  label="Departure"
                  value={departureDate}
                  onChange={setDepartureDate}
                  minDate={dayjs()}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: 'outlined',
                    },
                  }}
                />
              </Grid>

              {tripType === 'round' && (
                <Grid item xs={12} md={6}>
                  <DatePicker
                    label="Return"
                    value={returnDate}
                    onChange={setReturnDate}
                    minDate={departureDate}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        variant: 'outlined',
                      },
                    }}
                  />
                </Grid>
              )}
            </Grid>

            {/* Search Button */}
            <Box sx={{ textAlign: 'center' }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleSearch}
                disabled={isSearchDisabled}
                startIcon={<Flight />}
                sx={{
                  textTransform: 'none',
                  fontWeight: 500,
                  fontSize: '16px',
                  px: 4,
                  py: 1.5,
                  minWidth: 200,
                }}
              >
                {loading ? 'Searching...' : 'Explore'}
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Passengers Menu */}
        <Menu
          anchorEl={passengersMenuAnchor}
          open={Boolean(passengersMenuAnchor)}
          onClose={handlePassengersMenuClose}
          PaperProps={{
            sx: {
              width: '300px',
              backgroundColor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
            },
          }}
        >
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
              Passengers
            </Typography>

            {/* Adults */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>Adults</Typography>
                <Typography variant="caption" color="text.secondary">Age 18+</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton
                  size="small"
                  onClick={() => updatePassengerCount('adults', false)}
                  disabled={passengers.adults <= 1}
                >
                  <Remove />
                </IconButton>
                <Typography sx={{ minWidth: '20px', textAlign: 'center' }}>
                  {passengers.adults}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => updatePassengerCount('adults', true)}
                >
                  <Add />
                </IconButton>
              </Box>
            </Box>

            <Divider sx={{ my: 1 }} />

            {/* Children */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>Children</Typography>
                <Typography variant="caption" color="text.secondary">Age 2-11</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton
                  size="small"
                  onClick={() => updatePassengerCount('children', false)}
                  disabled={passengers.children <= 0}
                >
                  <Remove />
                </IconButton>
                <Typography sx={{ minWidth: '20px', textAlign: 'center' }}>
                  {passengers.children}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => updatePassengerCount('children', true)}
                >
                  <Add />
                </IconButton>
              </Box>
            </Box>

            <Divider sx={{ my: 1 }} />

            {/* Infants */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>Infants</Typography>
                <Typography variant="caption" color="text.secondary">Under 2</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton
                  size="small"
                  onClick={() => updatePassengerCount('infants', false)}
                  disabled={passengers.infants <= 0}
                >
                  <Remove />
                </IconButton>
                <Typography sx={{ minWidth: '20px', textAlign: 'center' }}>
                  {passengers.infants}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => updatePassengerCount('infants', true)}
                >
                  <Add />
                </IconButton>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button
                onClick={handlePassengersMenuClose}
                sx={{
                  textTransform: 'none',
                  fontFamily: 'Google Sans, Roboto, Arial, sans-serif',
                }}
              >
                Done
              </Button>
            </Box>
          </Box>
        </Menu>
      </Container>
    </LocalizationProvider>
  );
};

export default SearchForm;

