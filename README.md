# 🚋 MetroBus Bateu?

Um contador humorístico dos acidentes do Metrobus em Coimbra. Porque rir é o melhor remédio... para além de travões.

https://metrobusbateu.pt/

## Sobre

Este site acompanha os acidentes envolvendo o Metrobus (Metro Mondego) em Coimbra, Portugal, mostrando um cronómetro em tempo real desde o último incidente registado.

**⚠️ Aviso:** Este site é uma paródia e não tem qualquer afiliação oficial com o Metro Mondego.

## Funcionalidades

- ⏱️ Contador em tempo real desde o último acidente
- 📍 Mapa de acidentes
- 📋 Histórico completo de acidentes com datas, locais e fontes
- 📰 Links para as notícias originais
- 📱 Design responsivo

## Tecnologias

- [Next.js 16](https://nextjs.org/) - Framework React
- [Tailwind CSS 4](https://tailwindcss.com/) - Styling
- Markdown - Armazenamento de dados dos acidentes

## Adicionar um novo acidente

Para registar um novo acidente, cria um ficheiro Markdown em `src/data/acidentes/` com o seguinte formato:

```markdown
---
data: 2025-12-06T10:50:00
local: Solum, Coimbra
titulo: Colisão entre Metrobus e automóvel na Solum
fonte: https://exemplo.pt/noticia
---

Descrição opcional do acidente.
```

O nome do ficheiro deve seguir o padrão: `AAAA-MM-DD-descricao.md`

## Desenvolvimento

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Abrir http://localhost:3000
```

## Build Estático

O site é exportado como HTML estático:

```bash
npm run build
```

Os ficheiros estáticos são gerados na pasta `out/` e podem ser hospedados em qualquer servidor web estático (GitHub Pages, Netlify, Vercel, etc).

## Licença

MIT

---

Feito com 🚋 em Coimbra
