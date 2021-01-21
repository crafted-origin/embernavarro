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
  breakpoints: {
    values: {
      mobile: 412,
      tablet: 846,
      desktop: 1272,
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
