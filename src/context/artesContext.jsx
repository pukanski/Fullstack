import { createContext, useContext, useReducer } from 'react';
import { buscarArtes, ITENS_POR_PAGINA } from '../services/artesService';
import { ACTIONS, artesReducer, initialState } from '../state/artesReducer';

const ArtesContext = createContext();

export function ArtesProvider({ children }) {
    const [state, dispatch] = useReducer(artesReducer, initialState);

    async function buscar(termoBusca, paginaDesejada = 1) {
        const termoAtualizado = termoBusca !== undefined ? termoBusca : state.termo;
        const ehNovoTermo = termoAtualizado !== state.termo;
        const paginaParaBuscar = ehNovoTermo ? 1 : paginaDesejada;

        if (ehNovoTermo) {
            dispatch({ type: ACTIONS.DEFINIR_TERMO, payload: termoAtualizado });
        }

        dispatch({ type: ACTIONS.BUSCA_INICIADA });

        try {
            const json = await buscarArtes(termoAtualizado, paginaParaBuscar);

            //console.log('Paginação da API:', json.pagination);

            dispatch({ type: ACTIONS.MUDAR_PAGINA, payload: paginaParaBuscar });

            dispatch({
                type: ACTIONS.SUCESSO_BUSCA,
                payload: {
                    obras: json.data,
                    totalPaginas: Math.max(1, Math.ceil((json.info?.total ?? 0) / ITENS_POR_PAGINA))
                }
            });
        } catch (erro) {
            dispatch({
                type: ACTIONS.FALHA_BUSCA,
                payload: erro.message || 'Erro ao carregar os dados.'
            });
        }
    }

    function mudarPagina(novaPagina) {
        if (novaPagina < 1 || novaPagina > state.totalPaginas || novaPagina === state.pagina || state.carregando === true) {
            return
        }
        buscar(state.termo, novaPagina);
    }

    function limparBusca() {
        dispatch({ type: ACTIONS.LIMPAR_BUSCA });
    }

    const temPaginaAnterior = state.pagina > 1;
    const temProximaPagina = state.pagina < state.totalPaginas;

    const value = {
        state,
        buscar,
        mudarPagina,
        limparBusca,
        temPaginaAnterior,
        temProximaPagina
    };

    return (
        <ArtesContext.Provider value={value}>
            {children}
        </ArtesContext.Provider>
    );
}

export function useArtes() {
    const context = useContext(ArtesContext);
    if (!context) {
        throw new Error('useArtes deve ser usado dentro de um ArtesProvider');
    }
    return context;
}

