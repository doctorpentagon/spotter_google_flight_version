import React, { useState, useEffect, useRef } from 'react';
import {
  TextField,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CircularProgress,
  Box,
  Typography,
} from '@mui/material';
import { Flight } from '@mui/icons-material';
import { useFlightSearch } from '../hooks/useFlightSearch';

const AirportAutocomplete = ({ 
  label, 
  value, 
  onChange, 
  placeholder = "Enter city or airport",
  disabled = false 
}) => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  
  const { loading, airports, searchAirportsByQuery } = useFlightSearch();

  // Update input value when value prop changes
  useEffect(() => {
    if (value) {
      setInputValue(value.presentation?.suggestionTitle || value.presentation?.title || '');
    } else {
      setInputValue('');
    }
  }, [value]);

  // Search airports when input changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (inputValue.length >= 2) {
        searchAirportsByQuery(inputValue);
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [inputValue, searchAirportsByQuery]);

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    setSelectedIndex(-1);
    
    if (!newValue) {
      onChange(null);
      setShowSuggestions(false);
    }
  };

  const handleInputFocus = () => {
    if (inputValue.length >= 2 && airports.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow for selection
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  const handleAirportSelect = (airport) => {
    setInputValue(airport.presentation.suggestionTitle);
    setShowSuggestions(false);
    onChange(airport);
    inputRef.current?.blur();
  };

  const handleKeyDown = (event) => {
    if (!showSuggestions || airports.length === 0) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setSelectedIndex(prev => 
          prev < airports.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        event.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        event.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < airports.length) {
          handleAirportSelect(airports[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
      default:
        break;
    }
  };

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <TextField
        ref={inputRef}
        fullWidth
        label={label}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        variant="outlined"
        InputProps={{
          endAdornment: loading && (
            <CircularProgress size={20} sx={{ color: 'text.secondary' }} />
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'background.paper',
          },
        }}
      />

      {showSuggestions && (
        <Paper
          elevation={3}
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 1000,
            maxHeight: '300px',
            overflow: 'auto',
            mt: 1,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          {loading ? (
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <CircularProgress size={24} />
              <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                Searching airports...
              </Typography>
            </Box>
          ) : airports.length > 0 ? (
            <List ref={listRef} sx={{ py: 0 }}>
              {airports.map((airport, index) => (
                <ListItem
                  key={airport.entityId}
                  button
                  selected={index === selectedIndex}
                  onClick={() => handleAirportSelect(airport)}
                  sx={{
                    py: 1.5,
                    px: 2,
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                    '&.Mui-selected': {
                      backgroundColor: 'action.selected',
                      '&:hover': {
                        backgroundColor: 'action.selected',
                      },
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Flight sx={{ color: 'primary.main', fontSize: 20 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 500,
                          color: 'text.primary',
                          fontSize: '14px',
                        }}
                      >
                        {airport.presentation.suggestionTitle}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          fontSize: '12px',
                        }}
                      >
                        {airport.presentation.subtitle}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          ) : inputValue.length >= 2 ? (
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                No airports found for "{inputValue}"
              </Typography>
            </Box>
          ) : null}
        </Paper>
      )}
    </Box>
  );
};

export default AirportAutocomplete;

