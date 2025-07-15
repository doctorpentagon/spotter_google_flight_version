import React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import {
  CalendarToday,
  TrendingUp,
  NotificationsActive,
} from '@mui/icons-material';
import calendarLight from '../assets/calendarlightmode.png';
import calendarDark from '../assets/calendardarkmode.png';

const ToolsSection = ({ darkMode }) => {
  const tools = [
    {
      icon: <CalendarToday sx={{ fontSize: 24, color: 'primary.main' }} />,
      title: 'Find the cheapest days to fly',
      description: 'The Date grid and Price graph make it easy to see the best flight deals',
    },
    {
      icon: <TrendingUp sx={{ fontSize: 24, color: 'primary.main' }} />,
      title: 'See the whole picture with price insights',
      description: 'Price history and trend data show you when to book to get the best price on your flight',
    },
    {
      icon: <NotificationsActive sx={{ fontSize: 24, color: 'primary.main' }} />,
      title: 'Track prices for a trip',
      description: 'Not ready to book yet? Observe price changes for a route or flight and get notified when prices drop.',
    },
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
        Useful tools to help you find the best deals
      </Typography>

      <Grid container spacing={4}>
        {/* Left Column - Tool Cards */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {tools.map((tool, index) => (
              <Card
                key={index}
                elevation={0}
                sx={{
                  backgroundColor: 'transparent',
                  border: 'none',
                }}
              >
                <CardContent sx={{ p: 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Box sx={{ mt: 0.5 }}>
                      {tool.icon}
                    </Box>
                    <Box>
                      <Typography
                        variant="h6"
                        component="h3"
                        sx={{
                          fontWeight: 500,
                          color: 'text.primary',
                          fontSize: '16px',
                          fontFamily: 'Google Sans, Roboto, Arial, sans-serif',
                          mb: 1,
                        }}
                      >
                        {tool.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          fontSize: '14px',
                          fontFamily: 'Google Sans, Roboto, Arial, sans-serif',
                          lineHeight: 1.5,
                        }}
                      >
                        {tool.description}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Grid>

        {/* Right Column - Text and Calendar */}
        <Grid item xs={12} md={6}>
          <Box>
            <Typography
              variant="h6"
              component="h3"
              sx={{
                fontWeight: 500,
                color: 'text.primary',
                fontSize: '16px',
                fontFamily: 'Google Sans, Roboto, Arial, sans-serif',
                mb: 2,
              }}
            >
              Insightful tools help you choose your trip dates
            </Typography>
            
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                fontSize: '14px',
                fontFamily: 'Google Sans, Roboto, Arial, sans-serif',
                lineHeight: 1.6,
                mb: 3,
              }}
            >
              If your travel plans are flexible, use the form above to start searching for a specific trip. 
              Then, play around with the <strong>Date grid</strong> and <strong>Price graph</strong> options 
              on the Search page to find the cheapest days to get to your destination – and back again for round trips.
            </Typography>

            {/* Calendar Image */}
            <Box
              sx={{
                width: '100%',
                height: { xs: '200px', md: '250px' },
                backgroundImage: `url(${darkMode ? calendarDark : calendarLight})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                borderRadius: 2,
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ToolsSection;

