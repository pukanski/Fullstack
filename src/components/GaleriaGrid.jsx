import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { useArtes } from '../context/artesContext.jsx';
import ObraCard from './ObraCard.jsx';

const QUANTIDADE_SKELETONS = 12;

const gridSx = {
  display: 'grid',
  gap: 3,
  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 240px), 1fr))',
};

function GaleriaGrid({ onAbrir }) {
  const { state, buscar } = useArtes();
  const { obras, carregando, erro, termo, pagina } = state;

  if (carregando) {
    return (
      <Box sx={gridSx} role="status" aria-busy="true" aria-label="Carregando obras">
        {Array.from({ length: QUANTIDADE_SKELETONS }, (_, i) => (
          <Box key={i}>
            <Skeleton variant="rectangular" sx={{ aspectRatio: '1 / 1', height: 'auto' }} />
            <Skeleton variant="text" sx={{ fontSize: '1.125rem', mt: 1 }} />
            <Skeleton variant="text" width="60%" />
          </Box>
        ))}
      </Box>
    );
  }

  if (erro) {
    return (
      <Alert
        severity="error"
        action={
          termo ? (
            <Button color="inherit" size="small" onClick={() => buscar(termo, pagina)}>
              Tentar de novo
            </Button>
          ) : undefined
        }
      >
        {erro}
      </Alert>
    );
  }

  if (!obras || obras.length === 0) {
    return (
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5" component="p" sx={{ mb: 1 }}>
          {termo ? `Nenhuma obra encontrada para “${termo}”` : 'Comece pela busca'}
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>
          {termo
            ? 'Tente outro termo ou verifique a grafia.'
            : 'Digite o nome de um artista, o título de uma obra ou um período.'}
        </Typography>
      </Box>
    );
  }

  return (
    <section>
      {termo && (
        <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
          Resultados para “{termo}”
        </Typography>
      )}
      <Box sx={gridSx}>
        {obras.map((obra) => (
          <ObraCard key={obra.id} obra={obra} onAbrir={onAbrir} />
        ))}
      </Box>
    </section>
  );
}

export default GaleriaGrid;