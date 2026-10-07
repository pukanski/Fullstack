import ImageNotSupportedOutlinedIcon from '@mui/icons-material/ImageNotSupportedOutlined';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

const limitarLinhas = (linhas) => ({
  display: '-webkit-box',
  WebkitLineClamp: linhas,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
});

const estiloArea = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyContent: 'flex-start',
};

function nomeDosArtistas(obra) {
  if (!obra.creators || obra.creators.length === 0) return 'Artista desconhecido';
  return obra.creators.map((c) => c.description).join(', ');
}

function ObraCard({ obra, onAbrir }) {
  const [imagemFalhou, setImagemFalhou] = useState(false);
  const urlImagem = obra.images?.web?.url;
  const temImagem = Boolean(urlImagem) && !imagemFalhou;

  const Area = onAbrir ? CardActionArea : 'div';
  const propsArea = onAbrir ? { onClick: () => onAbrir(obra.id) } : {};

  return (
    <Card sx={{ height: '100%' }}>
      <Area {...propsArea} style={estiloArea}>
        { }
        <Box
          sx={{
            aspectRatio: '1 / 1',
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
              alt={obra.title}
              loading="lazy"
              onError={() => setImagemFalhou(true)}
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

        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="h3" sx={limitarLinhas(2)}>
            {obra.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{ mt: 0.5, color: 'text.secondary', whiteSpace: 'pre-line', ...limitarLinhas(2) }}
          >
            {nomeDosArtistas(obra)}
          </Typography>
          {obra.creation_date && (
            <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'secondary.main' }}>
              {obra.creation_date}
            </Typography>
          )}
        </CardContent>
      </Area>
    </Card>
  );
}

export default ObraCard;
