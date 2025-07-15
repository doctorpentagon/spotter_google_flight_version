import { useState, useCallback } from 'react';
import { 
  searchAirports, 
  searchFlights, 
  getPriceCalendar,
  isApiKeyAvailable,
  mockAirportData,
  mockFlightData 
} from '../services/api';

export const useFlightSearch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [airports, setAirports] = useState([]);
  const [flights, setFlights] = useState([]);
  const [priceCalendar, setPriceCalendar] = useState(null);

  // Search airports by query
  const searchAirportsByQuery = useCallback(async (query) => {
    if (!query || query.length < 2) {
      setAirports([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let result;
      
      if (isApiKeyAvailable()) {
        result = await searchAirports(query);
        setAirports(result.data || []);
      } else {
        // Use mock data when API key is not available
        const filteredMockData = mockAirportData.filter(airport =>
          airport.presentation.title.toLowerCase().includes(query.toLowerCase()) ||
          airport.presentation.suggestionTitle.toLowerCase().includes(query.toLowerCase())
        );
        setAirports(filteredMockData);
      }
    } catch (err) {
      setError('Failed to search airports. Please try again.');
      console.error('Airport search error:', err);
      
      // Fallback to mock data on error
      const filteredMockData = mockAirportData.filter(airport =>
        airport.presentation.title.toLowerCase().includes(query.toLowerCase()) ||
        airport.presentation.suggestionTitle.toLowerCase().includes(query.toLowerCase())
      );
      setAirports(filteredMockData);
    } finally {
      setLoading(false);
    }
  }, []);

  // Search flights
  const searchFlightsByParams = useCallback(async (searchParams) => {
    setLoading(true);
    setError(null);
    setFlights([]);

    try {
      let result;
      
      if (isApiKeyAvailable()) {
        result = await searchFlights(searchParams);
        setFlights(result.data?.itineraries || []);
      } else {
        // Use mock data when API key is not available
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
        setFlights(mockFlightData.data.itineraries);
      }
    } catch (err) {
      setError('Failed to search flights. Please try again.');
      console.error('Flight search error:', err);
      
      // Fallback to mock data on error
      setFlights(mockFlightData.data.itineraries);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get price calendar
  const fetchPriceCalendar = useCallback(async (params) => {
    setLoading(true);
    setError(null);

    try {
      let result;
      
      if (isApiKeyAvailable()) {
        result = await getPriceCalendar(params);
        setPriceCalendar(result.data);
      } else {
        // Mock price calendar data
        const mockPriceCalendar = {
          dates: [
            { date: '2025-07-15', price: { raw: 45000, formatted: '₦45,000' } },
            { date: '2025-07-16', price: { raw: 42000, formatted: '₦42,000' } },
            { date: '2025-07-17', price: { raw: 48000, formatted: '₦48,000' } },
            { date: '2025-07-18', price: { raw: 39000, formatted: '₦39,000' } },
            { date: '2025-07-19', price: { raw: 44000, formatted: '₦44,000' } },
          ],
        };
        setPriceCalendar(mockPriceCalendar);
      }
    } catch (err) {
      setError('Failed to fetch price calendar. Please try again.');
      console.error('Price calendar error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Clear search results
  const clearResults = useCallback(() => {
    setFlights([]);
    setAirports([]);
    setPriceCalendar(null);
    setError(null);
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    airports,
    flights,
    priceCalendar,
    searchAirportsByQuery,
    searchFlightsByParams,
    fetchPriceCalendar,
    clearResults,
    clearError,
  };
};

