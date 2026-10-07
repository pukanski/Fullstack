import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ImageSearchOutlinedIcon from '@mui/icons-material/ImageSearchOutlined';
import SearchOffOutlinedIcon from '@mui/icons-material/SearchOffOutlined';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
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

const SUGESTOES_DE_BUSCA = ['Monet', 'Picasso', 'Rembrandt', 'landscape', 'portrait'];

function EstadoVazio({ termo, onSugestao, onLimpar }) {
  const buscaSemResultado = Boolean(termo);
  const Icone = buscaSemResultado ? SearchOffOutlinedIcon : ImageSearchOutlinedIcon;

  return (
    <Box
      role="status"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        py: 8,
        px: 3,
        textAlign: 'center',
        bgcolor: 'background.paper',
        border: '2px dashed',
        borderColor: 'divider',
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          width: 88,
          height: 88,
          borderRadius: '50%',
          display: 'grid',
          placeItems: 'center',
          bgcolor: 'action.hover',
          color: 'primary.main',
        }}
      >
        <Icone sx={{ fontSize: 48 }} />
      </Box>

      <Typography variant="h4" component="p">
        {buscaSemResultado ? 'Nenhuma obra encontrada' : 'Comece pela busca'}
      </Typography>

      {buscaSemResultado && (
        <Typography
          sx={{
            px: 1.5,
            py: 0.5,
            borderRadius: 1,
            bgcolor: 'action.hover',
            color: 'secondary.main',
            fontWeight: 600,
            wordBreak: 'break-word',
          }}
        >
          “{termo}”
        </Typography>
      )}

      <Typography sx={{ color: 'text.secondary', maxWidth: 480 }}>
        {buscaSemResultado
          ? 'Confira a grafia, use menos palavras ou tente um termo mais geral.'
          : 'Digite o nome de um artista ou o título de uma obra.'}
      </Typography>

      <Box sx={{ mt: 1 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
          {buscaSemResultado ? 'Que tal tentar um destes?' : 'Ou comece por uma sugestão:'}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
          {SUGESTOES_DE_BUSCA.map((sugestao) => (
            <Chip
              key={sugestao}
              label={sugestao}
              color="primary"
              variant="outlined"
              clickable
              onClick={() => onSugestao(sugestao)}
            />
          ))}
        </Box>
      </Box>
      {buscaSemResultado && (
        <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={onLimpar} sx={{ mt: 1 }}>
          Limpar busca
        </Button>
      )}
    </Box>
  );
}

function GaleriaGrid({ onAbrir }) {
  const { state, buscar, limparBusca } = useArtes();
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
      <EstadoVazio
        termo={termo}
        onSugestao={(sugestao) => buscar(sugestao)}
        onLimpar={limparBusca}
      />
    );
  }

  return (
    <section>
      {termo && (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            mb: 3,
          }}
        >
          <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
            Resultados para “{termo}”
          </Typography>
          <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={limparBusca}>
            Voltar ao início
          </Button>
        </Box>
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