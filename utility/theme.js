import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

import colors from './colors';

// * Must provide all keys with values if overriding.
// ! Else some of the breakpoint functions won't work properly.
// * https://material-ui.com/customization/breakpoints/#custom-breakpoints
const BREAKPOINTS = {
  xs: 0,
  sm: 412,
  md: 846,
  lg: 1272,
  xl: 1920,
};

/**
 * The default theme variables used to refer in the custom theme below.
 * ! Do not use any of these properties anywhere else other than the below theme.
 */
const defaultTheme = createMuiTheme({
  breakpoints: {
    values: BREAKPOINTS,
  },
  typography: {
    fontSize: 16,
    htmlFontSize: 16,
    fontFamily: "'Jost', 'Arial', sans-serif",
  },
});

const theme = createMuiTheme({
  ...defaultTheme,
  particles: {
    position: 'absolute',
    width: '100%',
    height: '100%',
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
      [defaultTheme.breakpoints.up('md')]: {
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
      [defaultTheme.breakpoints.up('md')]: {
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
      [defaultTheme.breakpoints.up('md')]: {
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
      [defaultTheme.breakpoints.up('md')]: {
        fontSize: `${20 / defaultTheme.typography.fontSize}rem`,
      },
    },
    h5: {
      fontFamily: "'Jost', 'Arial', sans-serif",
      fontSize: `${14 / defaultTheme.typography.fontSize}rem`,
      fontWeight: 300,
      [defaultTheme.breakpoints.up('md')]: {
        fontSize: `${16 / defaultTheme.typography.fontSize}rem`,
      },
      [defaultTheme.breakpoints.up('lg')]: {
        fontSize: `${20 / defaultTheme.typography.fontSize}rem`,
      },
    },
  },
  subtitle: {
    color: colors.white[400],
    fontFamily: "'Josefin Sans', sans-serif",
    fontSize: `${18 / defaultTheme.typography.fontSize}rem`,
    [defaultTheme.breakpoints.up('md')]: {
      fontSize: `${20 / defaultTheme.typography.fontSize}rem`,
    },
    [defaultTheme.breakpoints.up('lg')]: {
      fontSize: `${30 / defaultTheme.typography.fontSize}rem`,
    },
  },
  palette: {
    primary: {
      main: colors.grey[400],
      secondary: colors.white[400],
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
  overrides: {
    MuiButton: {
      root: {
        backgroundColor: colors.white[400],
        color: colors.blue[400],
        fontSize: `${14 / defaultTheme.typography.fontSize}rem`,
        fontWeight: 300,
      },
      outlined: {
        padding: '8px 15px',
        border: `1px solid ${colors.blue[400]} `,
      },
    },
  },
  colors,
});

export default theme;
