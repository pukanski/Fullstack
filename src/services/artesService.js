const API_URL = "https://api.artic.edu/api/v1" //hardcoded pq ela é pública, então meio que não precisa usar .env para esconder

export async function buscarArtes(termo, pagina = 1) {
    const buscaUrl = `${API_URL}/artworks/search?q=${encodeURIComponent(termo)}&fields=id,title,artist_display,image_id,date_display&page=${pagina}&limit=50`

    const resposta = await fetch(buscaUrl)
    if (!resposta.ok) {
        throw new Error(`Ocorreu um erro ao buscar as artes: ${resposta.status}`)
    }

    const jsonArtes = await resposta.json()
    //console.log(jsonArtes)

    return jsonArtes
}

export async function buscarArtePorId(id) {
    const buscaId = `${API_URL}/artworks/${id}?fields=id,title,artist_display,date_display,medium_display,description,image_id`

    const resposta = await fetch(buscaId)
    if (!resposta.ok) {
        throw new Error(`Ocorreu um erro ao buscar a arte pelo id: ${resposta.status}`)
    }

    const jsonArte = await resposta.json()
    //console.log(jsonArte)

    return jsonArte
}