import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

import colors from './colors';

const BREAKPOINTS = {
  xs: 376,
  sm: 812,
  lg: 1232,
};

/**
 * The default theme variables used to refer in the custom theme below.
 * ! Do not use any of these properties anywhere else other than the below theme.
 * ? Are the breakpoints set correctly with the correct breakpoint generated functions?
 */
const defaultTheme = createMuiTheme({
  breakpoints: {
    keys: ['xs', 'sm', 'lg'],
    values: BREAKPOINTS,
  },
  typography: {
    fontSize: 16,
    htmlFontSize: 16,
    fontFamily: "'Jost', 'Arial', sans-serif",
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
    // Deep merge from default theme and custom theme.
    ...defaultTheme.typography,
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
      fontFamily: defaultTheme.typography.fontFamily,
      fontSize: `${24 / defaultTheme.typography.fontSize}rem`,
      fontWeight: 700,
      [defaultTheme.breakpoints.up('sm')]: {
        fontSize: `${30 / defaultTheme.typography.fontSize}rem`,
      },
      [defaultTheme.breakpoints.up('lg')]: {
        fontSize: `${40 / defaultTheme.typography.fontSize}rem`,
      },
    },
    h3: {
      fontFamily: "'Josefin Sans', sans-serif",
      fontSize: `${18 / defaultTheme.typography.fontSize}rem`,
      fontWeight: 100,
      [defaultTheme.breakpoints.up('sm')]: {
        fontSize: `${20 / defaultTheme.typography.fontSize}rem`,
      },
      [defaultTheme.breakpoints.up('lg')]: {
        fontSize: `${30 / defaultTheme.typography.fontSize}rem`,
      },
    },
    h4: {
      fontFamily: "'Jost', 'Arial', sans-serif",
      fontSize: `${14 / defaultTheme.typography.fontSize}rem`,
      fontWeight: 300,
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
      width: `${674 / defaultTheme.typography.fontSize}rem`,
    },
    [defaultTheme.breakpoints.up('lg')]: {
      width: `${850 / defaultTheme.typography.fontSize}rem`,
    },
  },
  palette: {
    primary: {
      main: '#556cd6',
    },
    text: {
      primary: colors.grey[400],
      secondary: colors.white[400],
    },
    action: {
      hover: colors.blue[300],
      active: colors.blue[300],
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
