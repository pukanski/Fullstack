// src/context/ArtesContext.jsx
import { createContext, useContext, useReducer } from 'react';
import { buscarArtes } from '../services/artesService';
import { ACTIONS, artesReducer, initialState } from '../state/arteReducer';

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

            console.log('Paginação da API:', json.pagination);

            dispatch({ type: ACTIONS.MUDAR_PAGINA, payload: paginaParaBuscar });

            dispatch({
                type: ACTIONS.SUCESSO_BUSCA,
                payload: {
                    obras: json.data,
                    totalPaginas: json.pagination?.total_pages || 1
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
        buscar(state.termo, novaPagina);
    }

    const value = {
        state,
        buscar,
        mudarPagina
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