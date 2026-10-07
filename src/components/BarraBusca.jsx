import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useArtes } from '../context/artesContext.jsx';

function BarraBusca() {
  const { state, buscar } = useArtes();
  const [texto, setTexto] = useState(state.termo ?? '');
  const [termoAnterior, setTermoAnterior] = useState(state.termo);

  if (state.termo !== termoAnterior) {
    setTermoAnterior(state.termo);
    setTexto(state.termo ?? '');
  }
  const termoLimpo = texto.trim();
  const podeBuscar = termoLimpo !== '' && !state.carregando;

  const enviar = (evento) => {
    evento.preventDefault();
    if (!podeBuscar) return;
    buscar(termoLimpo);
  };

  return (
    <Box
      component="form"
      role="search"
      onSubmit={enviar}
      sx={{ display: 'flex', gap: 1, width: '100%', maxWidth: 640 }}
    >
      <TextField
        fullWidth
        type="search"
        label="Buscar obras"
        placeholder="Palavra-chave: artista, título, técnica..."
        autoComplete="off"
        value={texto}
        onChange={(evento) => setTexto(evento.target.value)}
      />
      <Button
        type="submit"
        variant="contained"
        disabled={!podeBuscar}
        loading={state.carregando}
        loadingPosition="start"
        startIcon={<SearchIcon />}
        sx={{ px: 3, flexShrink: 0 }}
      >
        Buscar
      </Button>
    </Box>
  );
}

export default BarraBusca;