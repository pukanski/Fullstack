export const ACTIONS = {
    BUSCA_INICIADA: 'BUSCA_INICIADA',
    SUCESSO_BUSCA: 'SUCESSO_BUSCA',
    FALHA_BUSCA: 'FALHA_BUSCA',
    MUDAR_PAGINA: 'MUDAR_PAGINA',
    DEFINIR_TERMO: 'DEFINIR_TERMO',
    LIMPAR_BUSCA: 'LIMPAR_BUSCA'
};

export const initialState = {
    obras: [],
    carregando: false,
    erro: null,
    termo: '',
    pagina: 1,
    totalPaginas: 1
};

export function artesReducer(state, action) {
    switch (action.type) {
        case ACTIONS.BUSCA_INICIADA:
            return {
                ...state,
                carregando: true,
                erro: null
            };

        case ACTIONS.SUCESSO_BUSCA:
            return {
                ...state,
                carregando: false,
                obras: action.payload.obras,
                totalPaginas: action.payload.totalPaginas,
                erro: null
            };

        case ACTIONS.FALHA_BUSCA:
            return {
                ...state,
                carregando: false,
                erro: action.payload
            };

        case ACTIONS.MUDAR_PAGINA:
            return {
                ...state,
                pagina: action.payload
            };

        case ACTIONS.DEFINIR_TERMO:
            return {
                ...state,
                termo: action.payload
            };

        case ACTIONS.LIMPAR_BUSCA:
            return initialState;

        default:
            return state;
    }
}