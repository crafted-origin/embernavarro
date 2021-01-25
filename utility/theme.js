import { createMuiTheme } from '@material-ui/core/styles';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
import { red } from '@material-ui/core/colors';

import colors from './colors';

const BREAKPOINTS = {
  mobile: 406,
  tablet: 886,
  desktop: 1312,
};

const defaultTheme = createMuiTheme({
  breakpoints: {
    values: BREAKPOINTS,
  },
  typography: {
    fontSize: 16,
  },
});

// Create a theme instance.
const theme = createMuiTheme({
  ...defaultTheme,
  particles: {
    position: 'fixed',
    width: '100%',
    margin: '0',
    padding: '0',
    zIndex: '-1',
  },
  typography: {
    body1: {
      fontFamily: "'Jost', sans-serif",
      fontSize: `${12 / defaultTheme.typography.fontSize}rem`,
      color: colors.grey[400],
      fontWeight: 300,
      [defaultTheme.breakpoints.up('tablet')]: {
        fontSize: `${14 / defaultTheme.typography.fontSize}rem`,
      },
      [defaultTheme.breakpoints.up('desktop')]: {
        fontSize: `${16 / defaultTheme.typography.fontSize}rem`,
      },
    },
    h1: {
      fontFamily: "'Josefin Sans', sans-serif",
    },
    h2: {
      fontFamily: "'Josefin Sans', sans-serif",
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
  colors,
});

export default theme;
