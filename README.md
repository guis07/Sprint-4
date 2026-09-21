# 📷 Jovi Camera

## 📌 Sobre o projeto

O **Jovi Camera** é uma aplicação web desenvolvida em React com o objetivo de facilitar o registro, organização e consulta de imagens e lembretes.

A aplicação permite que o usuário registre imagens, organize seus registros em pastas, crie lembretes com data e horário e utilize reconhecimento óptico de caracteres (OCR) para identificar textos presentes nas imagens.

O projeto também possui um sistema de autenticação, rotas públicas e privadas, armazenamento local dos dados e uma API própria desenvolvida com Node.js e Express.

O projeto foi desenvolvido como parte do desafio acadêmico de desenvolvimento web.

---

## 🚀 Funcionalidades

- 📷 Seleção e registro de imagens
- 🔎 Modo de foco para visualização das imagens
- ⏰ Criação de lembretes
- 🔁 Repetição de lembretes por dias da semana
- 🔔 Alertas de lembretes
- 📁 Organização dos registros em pastas
- 🗑️ Exclusão de lembretes e pastas
- 🖼️ Galeria de imagens
- 📝 Reconhecimento de texto presente nas imagens utilizando OCR
- 🤖 Geração de resumo a partir do texto extraído
- 💾 Armazenamento dos registros utilizando `localStorage`
- 🔐 Sistema de login
- 🔒 Proteção de rotas privadas
- 🧩 Componentização com React
- 🪝 Utilização de Hooks nativos do React
- 🪝 Utilização de Custom Hook
- 🌐 Comunicação entre frontend e backend através de API REST
- 📱 Interface responsiva

---

## 🔐 Autenticação e rotas

O projeto possui rotas públicas e privadas utilizando `React Router`.

### Rotas públicas

- `/` → Página inicial
- `/login` → Página de login

### Rotas privadas

- `/camera` → Página da câmera
- `/galeria` → Página da galeria

As rotas privadas verificam se o usuário está autenticado antes de permitir o acesso.

A autenticação utilizada no projeto é realizada através do `localStorage` do navegador.

### Usuário para testes

```text
Usuário: jovi
Senha: 1234