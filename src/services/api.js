import axios from 'axios';

const API_BASE_URL = 'https://sky-scrapper.p.rapidapi.com';
const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
const API_HOST = import.meta.env.VITE_RAPIDAPI_HOST;

// Create axios instance with default headers
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': API_HOST,
  },
});

/**
 * Search for airports by query (city name, airport name, etc.)
 * @param {string} query - Search query for airports
 * @returns {Promise} API response with airport data
 */
export const searchAirports = async (query) => {
  try {
    const response = await apiClient.get('/api/v1/flights/searchAirport', {
      params: { query },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching airports:', error);
    throw error;
  }
};

/**
 * Get nearby airports based on latitude and longitude
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @returns {Promise} API response with nearby airports
 */
export const getNearbyAirports = async (lat, lng) => {
  try {
    const response = await apiClient.get('/api/v1/flights/getNearByAirports', {
      params: { lat, lng },
    });
    return response.data;
  } catch (error) {
    console.error('Error getting nearby airports:', error);
    throw error;
  }
};

/**
 * Search for flights between origin and destination
 * @param {Object} searchParams - Flight search parameters
 * @param {string} searchParams.originSkyId - Origin airport Sky ID
 * @param {string} searchParams.destinationSkyId - Destination airport Sky ID
 * @param {string} searchParams.originEntityId - Origin airport entity ID
 * @param {string} searchParams.destinationEntityId - Destination airport entity ID
 * @param {string} searchParams.date - Departure date (YYYY-MM-DD)
 * @param {string} [searchParams.returnDate] - Return date for round trips (YYYY-MM-DD)
 * @param {number} [searchParams.adults=1] - Number of adults
 * @param {number} [searchParams.children=0] - Number of children
 * @param {number} [searchParams.infants=0] - Number of infants
 * @param {string} [searchParams.cabinClass='economy'] - Cabin class
 * @param {string} [searchParams.currency='USD'] - Currency code
 * @param {string} [searchParams.market='US'] - Market code
 * @param {string} [searchParams.countryCode='US'] - Country code
 * @param {string} [searchParams.sortBy='best'] - Sort criteria
 * @returns {Promise} API response with flight data
 */
export const searchFlights = async (searchParams) => {
  try {
    const {
      originSkyId,
      destinationSkyId,
      originEntityId,
      destinationEntityId,
      date,
      returnDate,
      adults = 1,
      children = 0,
      infants = 0,
      cabinClass = 'economy',
      currency = 'USD',
      market = 'US',
      countryCode = 'US',
      sortBy = 'best',
    } = searchParams;

    const params = {
      originSkyId,
      destinationSkyId,
      originEntityId,
      destinationEntityId,
      date,
      adults,
      children,
      infants,
      cabinClass,
      currency,
      market,
      countryCode,
      sortBy,
    };

    // Add return date for round trips
    if (returnDate) {
      params.returnDate = returnDate;
    }

    const response = await apiClient.get('/api/v1/flights/searchFlights', {
      params,
    });
    return response.data;
  } catch (error) {
    console.error('Error searching flights:', error);
    throw error;
  }
};

/**
 * Get price calendar for a route
 * @param {Object} params - Price calendar parameters
 * @param {string} params.originSkyId - Origin airport Sky ID
 * @param {string} params.destinationSkyId - Destination airport Sky ID
 * @param {string} params.originEntityId - Origin airport entity ID
 * @param {string} params.destinationEntityId - Destination airport entity ID
 * @param {string} params.date - Base date (YYYY-MM-DD)
 * @returns {Promise} API response with price calendar data
 */
export const getPriceCalendar = async (params) => {
  try {
    const response = await apiClient.get('/api/v1/flights/getPriceCalendar', {
      params,
    });
    return response.data;
  } catch (error) {
    console.error('Error getting price calendar:', error);
    throw error;
  }
};

/**
 * Get flight details
 * @param {string} itineraryId - Flight itinerary ID
 * @returns {Promise} API response with flight details
 */
export const getFlightDetails = async (itineraryId) => {
  try {
    const response = await apiClient.get('/api/v1/flights/getFlightDetails', {
      params: { itineraryId },
    });
    return response.data;
  } catch (error) {
    console.error('Error getting flight details:', error);
    throw error;
  }
};

// Mock data for development/testing when API key is not available
export const mockAirportData = [
  {
    skyId: 'ILR',
    entityId: '12345',
    presentation: {
      title: 'Ilorin',
      suggestionTitle: 'Ilorin (ILR)',
      subtitle: 'Nigeria',
    },
    navigation: {
      entityId: '12345',
      entityType: 'AIRPORT',
      localizedName: 'Ilorin',
      relevantFlightParams: {
        skyId: 'ILR',
        entityId: '12345',
        flightPlaceType: 'AIRPORT',
        localizedName: 'Ilorin',
      },
    },
  },
  {
    skyId: 'LOS',
    entityId: '67890',
    presentation: {
      title: 'Lagos',
      suggestionTitle: 'Lagos (LOS)',
      subtitle: 'Nigeria',
    },
    navigation: {
      entityId: '67890',
      entityType: 'AIRPORT',
      localizedName: 'Lagos',
      relevantFlightParams: {
        skyId: 'LOS',
        entityId: '67890',
        flightPlaceType: 'AIRPORT',
        localizedName: 'Lagos',
      },
    },
  },
  {
    skyId: 'ABV',
    entityId: '11111',
    presentation: {
      title: 'Abuja',
      suggestionTitle: 'Abuja (ABV)',
      subtitle: 'Nigeria',
    },
    navigation: {
      entityId: '11111',
      entityType: 'AIRPORT',
      localizedName: 'Abuja',
      relevantFlightParams: {
        skyId: 'ABV',
        entityId: '11111',
        flightPlaceType: 'AIRPORT',
        localizedName: 'Abuja',
      },
    },
  },
];

export const mockFlightData = {
  status: true,
  data: {
    itineraries: [
      {
        id: 'mock-flight-1',
        price: {
          raw: 45000,
          formatted: '₦45,000',
        },
        legs: [
          {
            origin: {
              id: 'ILR',
              name: 'Ilorin',
              displayCode: 'ILR',
            },
            destination: {
              id: 'LOS',
              name: 'Lagos',
              displayCode: 'LOS',
            },
            departure: '2025-07-15T08:00:00',
            arrival: '2025-07-15T09:30:00',
            durationInMinutes: 90,
            carriers: {
              marketing: [
                {
                  id: 'AA',
                  name: 'Arik Air',
                  logoUrl: '',
                },
              ],
            },
            segments: [
              {
                origin: {
                  flightPlaceId: 'ILR',
                  displayCode: 'ILR',
                  name: 'Ilorin',
                },
                destination: {
                  flightPlaceId: 'LOS',
                  displayCode: 'LOS',
                  name: 'Lagos',
                },
                departure: '2025-07-15T08:00:00',
                arrival: '2025-07-15T09:30:00',
                durationInMinutes: 90,
                flightNumber: 'AA123',
                marketingCarrier: {
                  id: 'AA',
                  name: 'Arik Air',
                },
              },
            ],
          },
        ],
      },
      {
        id: 'mock-flight-2',
        price: {
          raw: 38000,
          formatted: '₦38,000',
        },
        legs: [
          {
            origin: {
              id: 'ILR',
              name: 'Ilorin',
              displayCode: 'ILR',
            },
            destination: {
              id: 'ABV',
              name: 'Abuja',
              displayCode: 'ABV',
            },
            departure: '2025-07-15T10:00:00',
            arrival: '2025-07-15T11:15:00',
            durationInMinutes: 75,
            carriers: {
              marketing: [
                {
                  id: 'DA',
                  name: 'Dana Air',
                  logoUrl: '',
                },
              ],
            },
            segments: [
              {
                origin: {
                  flightPlaceId: 'ILR',
                  displayCode: 'ILR',
                  name: 'Ilorin',
                },
                destination: {
                  flightPlaceId: 'ABV',
                  displayCode: 'ABV',
                  name: 'Abuja',
                },
                departure: '2025-07-15T10:00:00',
                arrival: '2025-07-15T11:15:00',
                durationInMinutes: 75,
                flightNumber: 'DA456',
                marketingCarrier: {
                  id: 'DA',
                  name: 'Dana Air',
                },
              },
            ],
          },
        ],
      },
    ],
  },
};

// Utility function to check if API key is available
export const isApiKeyAvailable = () => {
  return API_KEY && API_KEY !== 'your_rapidapi_key_here';
};

