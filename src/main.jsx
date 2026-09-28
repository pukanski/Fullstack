import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { buscarArtePorId, buscarArtes } from './services/artesService.js';

buscarArtes("monet").then(console.log).catch(console.error);
buscarArtePorId("129884").then(console.log).catch(console.error);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
