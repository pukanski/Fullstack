import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { ArtesProvider } from './context/artesContext.jsx';
import './index.css';

//buscarArtes("monet").then(console.log).catch(console.error);
//buscarArtePorId("129884").then(console.log).catch(console.error);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ArtesProvider>
      <App />
    </ArtesProvider>
  </StrictMode>,
)
