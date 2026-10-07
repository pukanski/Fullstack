import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import BarraBusca from './components/BarraBusca.jsx';
import DetalheObra from './components/DetalheObra.jsx';
import GaleriaGrid from './components/GaleriaGrid.jsx';

function App() {
  const [obraAbertaId, setObraAbertaId] = useState(null);

  return (
    <Container component="main" maxWidth="xl" sx={{ py: 5, display: 'grid', gap: 4 }}>
      <header>
        <Typography variant="h4" component="h1">
          Galeria de obras de arte
        </Typography>
        <Typography sx={{ color: 'text.secondary', mt: 0.5, mb: 3 }}>
          Acervo do Cleveland Museum of Art
        </Typography>
        <BarraBusca />
      </header>
      <GaleriaGrid onAbrir={setObraAbertaId} />
      <DetalheObra obraId={obraAbertaId} onFechar={() => setObraAbertaId(null)} />
    </Container>
  );
}

export default App