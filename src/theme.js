import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#fff350',
      main: '#ffc107',
      dark: '#c79100',
      contrastText: '#000',
    },
    secondary: {
      light: '#fff',
      main: '#eceff1',
      dark: '#babdbe',
      contrastText: '#000',
    },
  },
});

export default theme;