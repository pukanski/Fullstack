import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import { useArtes } from '../context/artesContext.jsx';

function Paginacao() {
    const { state, mudarPagina } = useArtes();
    const { pagina, totalPaginas, carregando } = state;

    if (totalPaginas <= 1) return null;

    const aoMudar = (_evento, novaPagina) => {
        mudarPagina(novaPagina);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Box component="nav" aria-label="Paginação dos resultados" sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
                count={totalPaginas}
                page={pagina}
                onChange={aoMudar}
                disabled={carregando}
                color="primary"
                shape="rounded"
                siblingCount={1}
                boundaryCount={1}
            />
        </Box>
    );
}

export default Paginacao;
