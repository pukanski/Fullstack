import { createTheme } from '@mui/material/styles';

const fonteTexto = '"Work Sans", "Helvetica Neue", Arial, sans-serif';
const fonteTitulo = '"Newsreader", Georgia, "Times New Roman", serif';

const theme = createTheme({
  palette: {
    primary: { main: '#2F3E9E', contrastText: '#FFFFFF' }, // azul ultramar
    secondary: { main: '#7A5C1E' }, // latão, cor de plaquinha de museu
    background: { default: '#F4F5F7', paper: '#FFFFFF' },
    text: { primary: '#1B1F2A', secondary: '#4B5263' },
    divider: '#D9DBE1',
  },
  shape: { borderRadius: 4 },
  typography: {
    fontFamily: fonteTexto,
    h1: { fontFamily: fonteTitulo, fontWeight: 600, letterSpacing: '-0.01em' },
    h2: { fontFamily: fonteTitulo, fontWeight: 600, letterSpacing: '-0.01em' },
    h3: { fontFamily: fonteTitulo, fontWeight: 600 },
    h4: { fontFamily: fonteTitulo, fontWeight: 600, fontSize: '2rem' },
    h5: { fontFamily: fonteTitulo, fontWeight: 600 },
    h6: {
      fontFamily: fonteTitulo,
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.3,
    },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: ({ theme }) => ({
          border: `1px solid ${theme.palette.divider}`,
        }),
      },
    },
  },
});

export default theme;