import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  particles: {
    position: 'fixed',
    width: '100%',
    margin: '0',
    padding: '0',
    zIndex: '-1',
  },
  typography: {
    h1: {
      fontFamily: "'Josefin Sans', sans-serif",
    },
    h2: {
      fontFamily: "'Josefin Sans', sans-serif",
    },
  },
  breakpoints: {
    values: {
      mobile: 452,
      tablet: 886,
      desktop: 1312,
    },
  },
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;
