# Fullstack

## Projeto 1 - Galeria de Obras de Arte

Aplicação SPA desenvolvida em react.js, que permite buscar e visualizar obras de arte a partir da API pública do Art Institute of Chicago.

### Requisitos Funcionais

| ID | Requisito |
|----|-----------|
| RF01 | O sistema deve permitir buscar obras de arte por título, artista ou palavra-chave |
| RF02 | O sistema deve exibir os resultados da busca em formato de grid de cards |
| RF03 | Cada card deve exibir a imagem, título e artista da obra |
| RF04 | O sistema deve permitir visualizar os detalhes de uma obra específica |
| RF05 | O sistema deve exibir uma mensagem quando a busca não retornar resultados |
| RF06 | O sistema deve exibir um indicador de carregamento durante as requisições à API |
| RF07 | O sistema deve tratar e exibir mensagens de erro em caso de falha na comunicação com a API |
| RF08 | O sistema deve permitir paginação ou carregamento de mais resultados |

## Tecnologias utilizadas

- React.js - Frontend
- useReducer — gerenciamento do estado de busca/filtros da aplicação
- MUI — biblioteca de componentes visuais
- Art Institute of Chicago API — fonte de dados das obras de arte ([documentação](https://api.artic.edu/docs/))

## API utilizada

O projetio consome a [API do Art Institute of Chicago](https://api.artic.edu/docs/), incluindo:
- Endpoint de busca: `/api/v1/artworks/search`
- Endpoint de detalhe: `/api/v1/artworks/{id}`
- IIIF Image API para montagem das URLs de imagem das obras

## Equipe

| Integrante | Responsabilidade |
|------------|-------------------|
| Gustavo Pukanski Schatzmann | Backend / integração com a API |
| Orlando Cardoso Neto | Frontend |
| Luiz Fernando Moreira Domênico | Apoio ao backend e ao frontend |
