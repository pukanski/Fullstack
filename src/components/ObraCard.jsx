import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ImageNotSupportedOutlinedIcon from '@mui/icons-material/ImageNotSupportedOutlined';

const urlImagem = (imageId) =>
  `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`;

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

function ObraCard({ obra, onAbrir }) {
  const [imagemFalhou, setImagemFalhou] = useState(false);
  const temImagem = Boolean(obra.image_id) && !imagemFalhou;

  const Area = onAbrir ? CardActionArea : 'div';
  const propsArea = onAbrir ? { onClick: () => onAbrir(obra.id) } : {};

  return (
    <Card sx={{ height: '100%' }}>
      <Area {...propsArea} style={estiloArea}>
        {/* Passe-partout: a obra aparece inteira, sem corte */}
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
              src={urlImagem(obra.image_id)}
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
            {obra.artist_display || 'Artista desconhecido'}
          </Typography>
          {obra.date_display && (
            <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'secondary.main' }}>
              {obra.date_display}
            </Typography>
          )}
        </CardContent>
      </Area>
    </Card>
  );
}

export default ObraCard;