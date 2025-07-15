import { createTheme } from '@mui/material/styles';

const getTheme = (darkMode) => {
  return createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#adcaf9' : '#1967d2',
        contrastText: darkMode ? '#202124' : '#ffffff',
      },
      secondary: {
        main: darkMode ? '#25272d' : '#f6f6f6',
      },
      background: {
        default: darkMode ? '#202124' : '#ffffff',
        paper: darkMode ? '#202124' : '#ffffff',
      },
      text: {
        primary: darkMode ? '#ffffff' : '#5f6368',
        secondary: darkMode ? '#aecbfa' : '#5f6368',
      },
      divider: '#5f6368',
      action: {
        hover: darkMode ? '#25272d' : '#e0ebfc',
      },
    },
    typography: {
      fontFamily: '"Google Sans", Roboto, Arial, sans-serif',
      h1: {
        fontWeight: 400,
        fontSize: '2.5rem',
      },
      h2: {
        fontWeight: 400,
        fontSize: '2rem',
      },
      h3: {
        fontWeight: 400,
        fontSize: '1.75rem',
      },
      h4: {
        fontWeight: 400,
        fontSize: '1.5rem',
      },
      h5: {
        fontWeight: 400,
        fontSize: '1.25rem',
      },
      h6: {
        fontWeight: 500,
        fontSize: '1rem',
      },
      body1: {
        fontSize: '14px',
        fontWeight: 500,
      },
      body2: {
        fontSize: '14px',
        fontWeight: 400,
      },
      button: {
        textTransform: 'none',
        fontWeight: 500,
        fontSize: '14px',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '14px',
            fontFamily: '"Google Sans", Roboto, Arial, sans-serif',
          },
          outlined: {
            borderColor: '#5f6368',
            color: darkMode ? '#ffffff' : '#5f6368',
            '&:hover': {
              backgroundColor: darkMode ? '#25272d' : '#e0ebfc',
              borderColor: '#5f6368',
            },
          },
          contained: {
            backgroundColor: darkMode ? '#adcaf9' : '#1967d2',
            color: darkMode ? '#202124' : '#ffffff',
            '&:hover': {
              backgroundColor: darkMode ? '#9ab7f5' : '#174ea6',
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              '& fieldset': {
                borderColor: '#5f6368',
              },
              '&:hover fieldset': {
                borderColor: '#5f6368',
              },
              '&.Mui-focused fieldset': {
                borderColor: darkMode ? '#adcaf9' : '#1967d2',
              },
            },
            '& .MuiInputLabel-root': {
              fontFamily: '"Google Sans", Roboto, Arial, sans-serif',
              fontSize: '14px',
            },
            '& .MuiInputBase-input': {
              fontFamily: '"Google Sans", Roboto, Arial, sans-serif',
              fontSize: '14px',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
            border: '1px solid #5f6368',
            backgroundColor: darkMode ? '#202124' : '#ffffff',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? '#202124' : '#ffffff',
            color: darkMode ? '#ffffff' : '#5f6368',
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            backgroundColor: darkMode ? '#202124' : '#ffffff',
            border: '1px solid #5f6368',
            borderRadius: '8px',
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            fontFamily: '"Google Sans", Roboto, Arial, sans-serif',
            fontSize: '14px',
            color: darkMode ? '#ffffff' : '#5f6368',
            '&:hover': {
              backgroundColor: darkMode ? '#25272d' : '#e0ebfc',
            },
          },
        },
      },
      MuiAccordion: {
        styleOverrides: {
          root: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            '&:before': {
              display: 'none',
            },
          },
        },
      },
    },
  });
};

export default getTheme;

