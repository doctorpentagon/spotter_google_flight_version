import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import getTheme from './theme';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import SearchForm from './components/SearchForm';
import FlightResults from './components/FlightResults';
import MapSection from './components/MapSection';
import ToolsSection from './components/ToolsSection';
import PopularDestinations from './components/PopularDestinations';
import FAQ from './components/FAQ';
import PopularRoutes from './components/PopularRoutes';
import Footer from './components/Footer';
import ExploreMap from './components/ExploreMap';
import { useFlightSearch } from './hooks/useFlightSearch';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState('flights');
  const [searchParams, setSearchParams] = useState(null);
  
  const { 
    loading, 
    error, 
    flights, 
    searchFlightsByParams, 
    clearResults,
    clearError 
  } = useFlightSearch();

  const theme = getTheme(darkMode);

  const handleSearch = async (searchData) => {
    setSearchParams(searchData);
    setCurrentPage('results');
    clearError();
    
    // Perform the flight search
    await searchFlightsByParams(searchData);
  };

  const handleFlightSelect = (flight) => {
    console.log('Selected flight:', flight);
    // TODO: Implement flight selection logic (redirect to booking, etc.)
  };

  const handleBackToSearch = () => {
    setCurrentPage('flights');
    clearResults();
    setSearchParams(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
        <Header 
          darkMode={darkMode} 
          setDarkMode={setDarkMode}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          onBackToSearch={handleBackToSearch}
        />
        
        {currentPage === 'flights' && (
          <>
            <HeroSection darkMode={darkMode} />
            <SearchForm 
              onSearch={handleSearch} 
              loading={loading}
              error={error}
            />
            <MapSection darkMode={darkMode} />
            <ToolsSection darkMode={darkMode} />
            <PopularDestinations />
            <FAQ />
            <PopularRoutes />
            <Footer />
          </>
        )}

        {currentPage === 'results' && (
          <>
            <SearchForm 
              onSearch={handleSearch} 
              loading={loading}
              error={error}
            />
            <FlightResults
              flights={flights}
              loading={loading}
              error={error}
              onFlightSelect={handleFlightSelect}
              origin={searchParams?.origin}
              destination={searchParams?.destination}
            />
          </>
        )}

        {currentPage === 'explore' && (
          <ExploreMap />
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;
