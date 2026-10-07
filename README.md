# Fullstack

## Projeto 1 - Galeria de Obras de Arte

Aplicação SPA desenvolvida em react.js, que permite buscar e visualizar obras de arte a partir da API pública do Cleveland Museum of Art.

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

### Tecnologias utilizadas

- React.js - Frontend
- useReducer — gerenciamento do estado de busca/filtros da aplicação
- MUI — biblioteca de componentes visuais
- Cleveland Museum of Art Open Access API — fonte de dados das obras de arte ([documentação](https://openaccess-api.clevelandart.org/))

### API utilizada

O projeto consome a [API do Cleveland Museum of Art](https://openaccess-api.clevelandart.org/), incluindo:
- Endpoint de busca: `/api/artworks/?q={termo}&limit={n}&skip={n}`
- Endpoint de detalhe: `/api/artworks/{id}`
- URLs de imagem já vêm prontas na resposta da API (images.web.url e images.print.url), sem necessidade de montagem manual

### Equipe

| Integrante | Responsabilidade |
|------------|-------------------|
| Gustavo Pukanski Schatzmann | Backend / integração com a API |
| Orlando Cardoso Neto | Frontend |
| Luiz Fernando Moreira Domênico | Apoio ao backend e ao frontend |

### Nota sobre a troca de API

O projeto usava a API do Art Institute of Chicago. Durante o desenvolvimento, identificamos que o host de imagens dessa API (www.artic.edu/iiif) está bloqueado por um desafio do cloudflare para a maioria dos acessos, o que faz com que as imagens das obras não carreguem no navegador (erro OpaqueResponseBlocking), mesmo com a API de dados funcionando normalmente. O problema é público e já foi documentado pelo próprio museu:

- https://github.com/art-institute-of-chicago/api-data/issues/9
- https://github.com/art-institute-of-chicago/data-aggregator/issues/157

Como isso afetava diretamente o RF03 (exibição de imagem nos cards), a equipe decidiu mudar para a API do Cleveland Museum of Art, que não tem esse bloqueio e também é uma API JSON aberta
