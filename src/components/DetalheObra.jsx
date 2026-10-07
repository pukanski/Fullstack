import CloseIcon from '@mui/icons-material/Close';
import ImageNotSupportedOutlinedIcon from '@mui/icons-material/ImageNotSupportedOutlined';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { buscarArtePorId } from '../services/artesService.js';

// A descrição curatorial do Cleveland vem em wall_description (às vezes null,
// nem toda obra tem texto). A Cleveland não costuma devolver HTML aqui, mas
// mantemos a limpeza por segurança.
function htmlParaTexto(html) {
  if (!html) return '';
  const comQuebras = html.replace(/<\/p>|<br\s*\/?>/gi, '\n');
  const documento = new DOMParser().parseFromString(comQuebras, 'text/html');
  return (documento.body.textContent || '').trim();
}

function nomeDosArtistas(obra) {
  if (!obra.creators || obra.creators.length === 0) return 'Artista desconhecido';
  return obra.creators.map((c) => c.description).join(', ');
}

function DetalheObra({ obraId, onFechar }) {
  const [obra, setObra] = useState(null);
  const [erro, setErro] = useState(null);
  const [tentativa, setTentativa] = useState(0);
  const [imagemFalhouUrl, setImagemFalhouUrl] = useState(null);

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
    // print = resolução maior que a usada no card (web), melhor para a tela de detalhe
    const urlImagem = obraAtual.images?.print?.url || obraAtual.images?.web?.url;
    const temImagem = Boolean(urlImagem) && imagemFalhouUrl !== urlImagem;
    const descricao = htmlParaTexto(obraAtual.wall_description);

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
              src={urlImagem}
              alt={obraAtual.title}
              onError={() => setImagemFalhouUrl(urlImagem)}
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
            {nomeDosArtistas(obraAtual)}
          </Typography>
          {obraAtual.creation_date && (
            <Typography variant="body2" sx={{ mt: 1, color: 'secondary.main' }}>
              {obraAtual.creation_date}
            </Typography>
          )}
          {obraAtual.technique && (
            <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
              Técnica: {obraAtual.technique}
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
