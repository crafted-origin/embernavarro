import { createMuiTheme } from '@material-ui/core/styles';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
import { red } from '@material-ui/core/colors';

import colors from './colors';

const BREAKPOINTS = {
  xs: 376,
  sm: 812,
  lg: 1232,
};

const defaultTheme = createMuiTheme({
  breakpoints: {
    keys: ['xs', 'sm', 'lg'],
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
      [defaultTheme.breakpoints.up('sm')]: {
        fontSize: `${14 / defaultTheme.typography.fontSize}rem`,
      },
      [defaultTheme.breakpoints.up('lg')]: {
        fontSize: `${16 / defaultTheme.typography.fontSize}rem`,
      },
    },
    h1: {
      fontFamily: "'Josefin Sans', sans-serif",
    },
    h2: {
      fontFamily: "'Jost', sans-serif",
    },
  },
  subtitle: {
    color: colors.white[400],
    fontFamily: "'Josefin Sans', sans-serif",
    fontSize: `${18 / defaultTheme.typography.fontSize}rem`,
    [defaultTheme.breakpoints.up('sm')]: {
      fontSize: `${20 / defaultTheme.typography.fontSize}rem`,
    },
    [defaultTheme.breakpoints.up('lg')]: {
      fontSize: `${30 / defaultTheme.typography.fontSize}rem`,
    },
  },
  description: {
    color: colors.white[400],
    [defaultTheme.breakpoints.up('sm')]: {
      width: `${647 / defaultTheme.typography.fontSize}rem`,
    },
    [defaultTheme.breakpoints.up('lg')]: {
      width: `${850 / defaultTheme.typography.fontSize}rem`,
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
console.log(theme);

export default theme;
