import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Switch,
  FormControlLabel,
  Autocomplete,
  Paper,
  Divider,
} from '@mui/material';
import {
  FlightTakeoff,
  LocationOn,
  FilterList,
  Map as MapIcon,
  MyLocation,
  Search,
} from '@mui/icons-material';

const ExploreMap = () => {
  const [location, setLocation] = useState({ lat: '', lng: '' });
  const [userLocation, setUserLocation] = useState(null);
  const [filters, setFilters] = useState({
    priceRange: [0, 500000],
    maxStops: 2,
    airlines: [],
    departureTime: 'any',
    duration: 'any',
    directFlights: false,
  });
  const [searchRadius, setSearchRadius] = useState(500); // km
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock airlines data
  const airlines = [
    'Arik Air',
    'Dana Air',
    'Air Peace',
    'Azman Air',
    'Max Air',
    'Overland Airways',
    'United Nigeria Airlines',
  ];

  // Mock destination data based on location
  const mockDestinations = [
    {
      city: 'Lagos',
      country: 'Nigeria',
      price: 45000,
      currency: '₦',
      distance: 350,
      flightTime: '1h 15m',
      coordinates: { lat: 6.5244, lng: 3.3792 },
      airlines: ['Arik Air', 'Dana Air', 'Air Peace'],
      stops: 0,
    },
    {
      city: 'Abuja',
      country: 'Nigeria',
      price: 38000,
      currency: '₦',
      distance: 280,
      flightTime: '1h 5m',
      coordinates: { lat: 9.0765, lng: 7.3986 },
      airlines: ['Air Peace', 'Azman Air', 'Max Air'],
      stops: 0,
    },
    {
      city: 'Kano',
      country: 'Nigeria',
      price: 42000,
      currency: '₦',
      distance: 420,
      flightTime: '1h 25m',
      coordinates: { lat: 12.0022, lng: 8.5920 },
      airlines: ['Arik Air', 'Max Air', 'Azman Air'],
      stops: 0,
    },
    {
      city: 'Port Harcourt',
      country: 'Nigeria',
      price: 35000,
      currency: '₦',
      distance: 180,
      flightTime: '55m',
      coordinates: { lat: 4.8156, lng: 7.0498 },
      airlines: ['Dana Air', 'Air Peace', 'United Nigeria Airlines'],
      stops: 0,
    },
  ];

  // Get user's current location
  const getCurrentLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setLocation({ lat: latitude.toFixed(6), lng: longitude.toFixed(6) });
          searchDestinations(latitude, longitude);
          setLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setLoading(false);
          // Fallback to Ilorin, Nigeria coordinates
          const fallbackLat = 8.4799;
          const fallbackLng = 4.5418;
          setLocation({ lat: fallbackLat.toFixed(6), lng: fallbackLng.toFixed(6) });
          searchDestinations(fallbackLat, fallbackLng);
        }
      );
    } else {
      setLoading(false);
      alert('Geolocation is not supported by this browser.');
    }
  };

  // Search destinations based on coordinates
  const searchDestinations = (lat, lng) => {
    setLoading(true);
    
    // Simulate API call with mock data
    setTimeout(() => {
      // Filter destinations based on search radius and filters
      let filteredDestinations = mockDestinations.filter(dest => {
        // Calculate distance (simplified)
        const distance = Math.sqrt(
          Math.pow(dest.coordinates.lat - lat, 2) + 
          Math.pow(dest.coordinates.lng - lng, 2)
        ) * 111; // Rough km conversion
        
        return (
          distance <= searchRadius &&
          dest.price >= filters.priceRange[0] &&
          dest.price <= filters.priceRange[1] &&
          dest.stops <= filters.maxStops &&
          (filters.airlines.length === 0 || 
           dest.airlines.some(airline => filters.airlines.includes(airline))) &&
          (!filters.directFlights || dest.stops === 0)
        );
      });

      setDestinations(filteredDestinations);
      setLoading(false);
    }, 1000);
  };

  // Handle manual coordinate search
  const handleCoordinateSearch = () => {
    if (location.lat && location.lng) {
      const lat = parseFloat(location.lat);
      const lng = parseFloat(location.lng);
      if (!isNaN(lat) && !isNaN(lng)) {
        searchDestinations(lat, lng);
      }
    }
  };

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  // Apply filters to current search
  const applyFilters = () => {
    if (location.lat && location.lng) {
      handleCoordinateSearch();
    }
  };

  useEffect(() => {
    // Initialize with default location (Ilorin, Nigeria)
    const defaultLat = 8.4799;
    const defaultLng = 4.5418;
    setLocation({ lat: defaultLat.toFixed(6), lng: defaultLng.toFixed(6) });
    searchDestinations(defaultLat, defaultLng);
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontWeight: 500,
          color: 'text.primary',
          fontSize: '28px',
          fontFamily: 'Google Sans, Roboto, Arial, sans-serif',
          mb: 4,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <MapIcon color="primary" />
        Explore Destinations
      </Typography>

      <Grid container spacing={4}>
        {/* Filters and Controls */}
        <Grid item xs={12} md={4}>
          <Card
            elevation={0}
            sx={{
              border: '1px solid',
              borderColor: 'rgba(0,0,0,0.1)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 500,
                  mb: 3,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <LocationOn color="primary" />
                Location & Filters
              </Typography>

              {/* Location Input */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 500 }}>
                  Search from coordinates
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Latitude"
                      value={location.lat}
                      onChange={(e) => setLocation(prev => ({ ...prev, lat: e.target.value }))}
                      size="small"
                      placeholder="8.4799"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Longitude"
                      value={location.lng}
                      onChange={(e) => setLocation(prev => ({ ...prev, lng: e.target.value }))}
                      size="small"
                      placeholder="4.5418"
                    />
                  </Grid>
                </Grid>
                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<MyLocation />}
                    onClick={getCurrentLocation}
                    disabled={loading}
                  >
                    Use My Location
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<Search />}
                    onClick={handleCoordinateSearch}
                    disabled={loading}
                  >
                    Search
                  </Button>
                </Box>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Search Radius */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 500 }}>
                  Search Radius: {searchRadius} km
                </Typography>
                <Slider
                  value={searchRadius}
                  onChange={(e, value) => setSearchRadius(value)}
                  min={100}
                  max={2000}
                  step={50}
                  marks={[
                    { value: 100, label: '100km' },
                    { value: 500, label: '500km' },
                    { value: 1000, label: '1000km' },
                    { value: 2000, label: '2000km' },
                  ]}
                />
              </Box>

              {/* Price Range */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 500 }}>
                  Price Range: ₦{filters.priceRange[0].toLocaleString()} - ₦{filters.priceRange[1].toLocaleString()}
                </Typography>
                <Slider
                  value={filters.priceRange}
                  onChange={(e, value) => handleFilterChange('priceRange', value)}
                  min={0}
                  max={500000}
                  step={5000}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `₦${value.toLocaleString()}`}
                />
              </Box>

              {/* Airlines Filter */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 500 }}>
                  Airlines
                </Typography>
                <Autocomplete
                  multiple
                  options={airlines}
                  value={filters.airlines}
                  onChange={(e, value) => handleFilterChange('airlines', value)}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        variant="outlined"
                        label={option}
                        size="small"
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select airlines"
                      size="small"
                    />
                  )}
                />
              </Box>

              {/* Max Stops */}
              <Box sx={{ mb: 3 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Max Stops</InputLabel>
                  <Select
                    value={filters.maxStops}
                    onChange={(e) => handleFilterChange('maxStops', e.target.value)}
                    label="Max Stops"
                  >
                    <MenuItem value={0}>Direct flights only</MenuItem>
                    <MenuItem value={1}>Up to 1 stop</MenuItem>
                    <MenuItem value={2}>Up to 2 stops</MenuItem>
                    <MenuItem value={3}>Any number of stops</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Direct Flights Toggle */}
              <FormControlLabel
                control={
                  <Switch
                    checked={filters.directFlights}
                    onChange={(e) => handleFilterChange('directFlights', e.target.checked)}
                  />
                }
                label="Direct flights only"
                sx={{ mb: 2 }}
              />

              <Button
                fullWidth
                variant="contained"
                startIcon={<FilterList />}
                onClick={applyFilters}
                disabled={loading}
              >
                Apply Filters
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Results */}
        <Grid item xs={12} md={8}>
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 500,
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <FlightTakeoff color="primary" />
              Available Destinations ({destinations.length})
            </Typography>
            
            {userLocation && (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Searching from: {location.lat}, {location.lng}
              </Typography>
            )}
          </Box>

          {loading ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography>Searching for destinations...</Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {destinations.map((destination, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Card
                    elevation={0}
                    sx={{
                      cursor: 'pointer',
                      transition: 'all 0.2s ease-in-out',
                      border: '1px solid',
                      borderColor: 'rgba(0,0,0,0.1)',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                      '&:hover': {
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        transform: 'translateY(-1px)',
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Box>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 500,
                              fontSize: '18px',
                              fontFamily: 'Google Sans, Roboto, Arial, sans-serif',
                            }}
                          >
                            {destination.city}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {destination.country}
                          </Typography>
                        </Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            color: 'primary.main',
                            fontSize: '20px',
                          }}
                        >
                          {destination.currency}{destination.price.toLocaleString()}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                        <Chip
                          label={`${destination.distance}km`}
                          size="small"
                          variant="outlined"
                        />
                        <Chip
                          label={destination.flightTime}
                          size="small"
                          variant="outlined"
                        />
                        <Chip
                          label={destination.stops === 0 ? 'Direct' : `${destination.stops} stop${destination.stops > 1 ? 's' : ''}`}
                          size="small"
                          variant="outlined"
                          color={destination.stops === 0 ? 'success' : 'default'}
                        />
                      </Box>

                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Airlines: {destination.airlines.join(', ')}
                      </Typography>

                      <Typography variant="caption" color="text.secondary">
                        Coordinates: {destination.coordinates.lat}, {destination.coordinates.lng}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {!loading && destinations.length === 0 && (
            <Paper
              sx={{
                p: 4,
                textAlign: 'center',
                backgroundColor: 'grey.50',
                border: '1px solid',
                borderColor: 'rgba(0,0,0,0.1)',
              }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                No destinations found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Try adjusting your search radius or filters to find more destinations.
              </Typography>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ExploreMap;

