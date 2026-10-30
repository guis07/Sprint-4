# Jovi Camera

Aplicação web em React que ajuda a registrar, organizar e consultar imagens e lembretes de estudo. O usuário fotografa (ou escolhe) uma imagem no **Modo Scan**, cria um alarme de revisão, organiza tudo em pastas e usa **OCR** para extrair o texto da imagem e gerar um resumo.

Projeto da **Sprint 4** (Front-End Design + Web Development), evolução da solução da Challenge JOVI desenvolvida nas sprints anteriores.

- **Repositório Git:** https://github.com/guis07/Sprint-4
- **Deploy na Vercel:** `INSERIR AQUI O LINK DA VERCEL`

## Integrantes

Os nomes e RMs estão no arquivo `INTEGRANTES.TXT`.

## Tecnologias utilizadas

- React 19 (componentização, props, hooks nativos e hook customizado)
- React Router (rotas públicas e privadas)
- Tailwind CSS 3 + CSS
- Vite
- Tesseract.js (OCR no navegador)
- Função serverless da Vercel (API própria em `api/resumo.js`)
- `localStorage` (login, alarmes e fotos)

## Funcionalidades

- Landing page com a apresentação da solução (Home)
- Login e proteção das rotas privadas
- Seleção de imagem no Modo Scan, com zoom e modo de foco
- Criação de alarmes de revisão (data, horário, repetição por dia da semana e som)
- Alerta com som quando chega a hora do alarme
- Organização das imagens em pastas
- Exclusão de lembretes e de pastas
- Galeria com os registros
- OCR para identificar o texto presente nas imagens
- Geração de resumo do texto extraído (consome a API própria)
- Layout responsivo para Desktop, Tablet e Mobile

## Rotas

| Rota | Acesso | Descrição |
| --- | --- | --- |
| `/` | Pública | Landing page |
| `/login` | Pública | Login |
| `/camera` | **Privada** | Modo Scan e criação de alarmes |
| `/galeria` | **Privada** | Galeria, pastas, OCR e resumo |

Quem tenta abrir uma rota privada sem estar logado é redirecionado para `/login`.

## Usuário e senha para teste

| Usuário | Senha |
| --- | --- |
| `jovi` | `1234` |

## Como executar o projeto

**Pré-requisito:** Node.js 20.19 ou superior (recomendado 22) e npm.

### 1. Instalar as dependências

Na pasta principal do projeto:

```bash
npm install
```

### 2. Iniciar a aplicação

```bash
npm run dev
```

Abra no navegador o endereço exibido no terminal (normalmente `http://localhost:5173`).

### 3. Gerar a versão de produção (opcional)

```bash
npm run build
npm run preview
```

> Observação: o `npm run preview` serve apenas os arquivos estáticos. A rota `/api/resumo` funciona no `npm run dev` e na Vercel.

## Back-end / API

O projeto tem uma API própria, **sem servidor separado para iniciar**:

- O código da API está em `api/resumo.js` (`POST /api/resumo`).
- **Na Vercel**, a pasta `api/` é publicada automaticamente como função serverless.
- **Localmente**, o `npm run dev` já serve a rota `/api/resumo` (configurado em `vite.config.js`). Basta rodar o comando do passo 2; não é preciso abrir outro terminal.

### `POST /api/resumo`

Corpo da requisição:

```json
{ "texto": "Texto extraído da imagem. Mais uma frase." }
```

Resposta (`200`):

```json
{ "resumo": "Texto extraído da imagem." }
```

Erros: `400` (texto ausente ou inválido) e `405` (método diferente de POST).

O resumo é gerado por um algoritmo simples: devolve as primeiras frases do texto (metade delas, quando há mais de três). Não usa um modelo de IA.

## Como testar o fluxo completo

1. Acesse `/login` e entre com `jovi` / `1234`.
2. Em `/camera`, toque no botão central e escolha uma imagem (de preferência com texto, como uma foto de lousa).
3. Toque no botão central de novo, clique em **Habilitar foco** e depois em **Criar alarme**.
4. Preencha horário, data e nome (opcionalmente pasta e repetição) e crie o alarme.
5. Em `/galeria`, abra o registro, clique em **Identificar texto** (OCR) e depois em **Gerar resumo**.
6. Para testar o alerta, crie um alarme para daqui a 1 ou 2 minutos e mantenha a aba aberta.

## Estrutura do projeto

```
api/
  resumo.js                 API própria (função serverless)
public/                     Imagens do protótipo, vídeo, favicon e som do alarme
src/
  components/               Header, Footer, Camera, AlarmeForm, Galeria, LeitorTexto, AlertaAlarme
  pages/                    Home, Login, CameraPage, GaleriaPage
  routes/PrivateRoute.jsx   Proteção das rotas privadas
  hooks/useAlarmes.js       Hook customizado: estado, persistência e disparo dos alarmes
  services/
    api.js                  Chamada à API de resumo
    auth.js                 Login e logout
    imagem.js               Redução da foto antes de salvar
  App.jsx                   Rotas e layouts
vercel.json                 Redirecionamento das rotas do React Router
```

## Deploy (Git + Vercel)

1. Envie o projeto para o repositório no GitHub.
2. Na Vercel, clique em **Add New → Project** e importe o repositório.
3. A Vercel detecta o Vite automaticamente (build: `npm run build`, saída: `dist`). Não é necessária nenhuma variável de ambiente.
4. Clique em **Deploy** e copie o link gerado para o topo deste README.

## Uso de inteligência artificial

Ferramentas de inteligência artificial (Claude, da Anthropic) foram usadas como apoio ao desenvolvimento: para revisar o código e apontar erros, remover código e arquivos que não eram usados, mover a API para uma função serverless compatível com a Vercel, separar a lógica de autenticação e de redução de imagens em serviços, configurar o deploy e redigir este README. As alterações são verificadas e adaptadas de acordo com as necessidades do projeto.

A funcionalidade de resumo da aplicação **não** utiliza IA generativa: é um algoritmo próprio que seleciona as primeiras frases do texto reconhecido pelo OCR (Tesseract.js).
