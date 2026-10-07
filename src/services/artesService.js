const API_URL = "https://openaccess-api.clevelandart.org/api/artworks" //hardcoded pq ela é pública, então meio que não precisa usar .env para esconder

export const ITENS_POR_PAGINA = 50

export async function buscarArtes(termo, pagina = 1) {
    const pular = (pagina - 1) * ITENS_POR_PAGINA

    const buscaUrl = `${API_URL}/?q=${encodeURIComponent(termo)}&limit=${ITENS_POR_PAGINA}&skip=${pular}&has_image=1`

    const resposta = await fetch(buscaUrl)
    if (!resposta.ok) {
        throw new Error(`Ocorreu um erro ao buscar as artes: ${resposta.status}`)
    }

    const jsonArtes = await resposta.json()
    //console.log(jsonArtes)

    return jsonArtes
}

export async function buscarArtePorId(id) {
    const buscaId = `${API_URL}/${id}`

    const resposta = await fetch(buscaId)
    if (!resposta.ok) {
        throw new Error(`Ocorreu um erro ao buscar a arte pelo id: ${resposta.status}`)
    }

    const jsonArte = await resposta.json()
    //console.log(jsonArte)

    return jsonArte
}