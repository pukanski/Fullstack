import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import BarraBusca from './components/BarraBusca.jsx';
import GaleriaGrid from './components/GaleriaGrid.jsx';

function App() {
  return (
    <Container component="main" maxWidth="xl" sx={{ py: 5, display: 'grid', gap: 4 }}>
      <header>
        <Typography variant="h4" component="h1">
          Galeria de obras de arte
        </Typography>
        <Typography sx={{ color: 'text.secondary', mt: 0.5, mb: 3 }}>
          Acervo do Art Institute of Chicago
        </Typography>
        <BarraBusca />
      </header>
      <GaleriaGrid />
    </Container>
  );
}

export default App