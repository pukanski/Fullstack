import { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import ImageNotSupportedOutlinedIcon from '@mui/icons-material/ImageNotSupportedOutlined';
import { buscarArtePorId } from '../services/artesService.js';

const urlImagem = (imageId) =>
  `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`;

function htmlParaTexto(html) {
  if (!html) return '';
  const comQuebras = html.replace(/<\/p>|<br\s*\/?>/gi, '\n');
  const documento = new DOMParser().parseFromString(comQuebras, 'text/html');
  return (documento.body.textContent || '').trim();
}

function DetalheObra({ obraId, onFechar }) {
  const [obra, setObra] = useState(null);
  const [erro, setErro] = useState(null);
  const [tentativa, setTentativa] = useState(0);
  const [imagemFalhouId, setImagemFalhouId] = useState(null);

  useEffect(() => {
    if (obraId === null) return;

    let cancelado = false;
    setObra(null);
    setErro(null);

    buscarArtePorId(obraId)
      .then((json) => {
        if (!cancelado) setObra(json.data);
      })
      .catch((e) => {
        if (!cancelado) setErro(e.message || 'Erro ao carregar os detalhes da obra.');
      });

    return () => {
      cancelado = true;
    };
  }, [obraId, tentativa]);

  const obraAtual = obra && String(obra.id) === String(obraId) ? obra : null;

  let conteudo;
  if (erro) {
    conteudo = (
      <Alert
        severity="error"
        action={
          <Button color="inherit" size="small" onClick={() => setTentativa((n) => n + 1)}>
            Tentar de novo
          </Button>
        }
      >
        {erro}
      </Alert>
    );
  } else if (obraAtual) {
    const temImagem = Boolean(obraAtual.image_id) && imagemFalhouId !== obraAtual.image_id;
    const descricao = htmlParaTexto(obraAtual.description);

    conteudo = (
      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(0, 1fr) minmax(0, 1fr)' },
        }}
      >
        {/* Passe-partout: a obra aparece inteira, sem corte */}
        <Box
          sx={{
            aspectRatio: '1 / 1',
            alignSelf: 'start',
            bgcolor: '#E8E9ED',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
          }}
        >
          {temImagem ? (
            <Box
              component="img"
              src={urlImagem(obraAtual.image_id)}
              alt={obraAtual.title}
              onError={() => setImagemFalhouId(obraAtual.image_id)}
              sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          ) : (
            <>
              <ImageNotSupportedOutlinedIcon sx={{ color: 'text.secondary' }} />
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Imagem indisponível
              </Typography>
            </>
          )}
        </Box>

        <Box>
          <Typography sx={{ whiteSpace: 'pre-line' }}>
            {obraAtual.artist_display || 'Artista desconhecido'}
          </Typography>
          {obraAtual.date_display && (
            <Typography variant="body2" sx={{ mt: 1, color: 'secondary.main' }}>
              {obraAtual.date_display}
            </Typography>
          )}
          {obraAtual.medium_display && (
            <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
              Técnica: {obraAtual.medium_display}
            </Typography>
          )}
          <Typography
            sx={{
              mt: 3,
              lineHeight: 1.7,
              whiteSpace: 'pre-line',
              color: descricao ? 'text.primary' : 'text.secondary',
            }}
          >
            {descricao || 'Esta obra não tem descrição.'}
          </Typography>
        </Box>
      </Box>
    );
  } else {
    conteudo = (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress aria-label="Carregando detalhes da obra" />
      </Box>
    );
  }

  return (
    <Dialog
      open={obraId !== null}
      onClose={onFechar}
      maxWidth="md"
      fullWidth
      scroll="paper"
      aria-labelledby="detalhe-obra-titulo"
    >
      <DialogTitle id="detalhe-obra-titulo" sx={{ pr: 7 }}>
        {obraAtual ? obraAtual.title : 'Detalhes da obra'}
      </DialogTitle>
      <IconButton
        aria-label="Fechar"
        onClick={onFechar}
        sx={{ position: 'absolute', right: 8, top: 8 }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>{conteudo}</DialogContent>
    </Dialog>
  );
}

export default DetalheObra;