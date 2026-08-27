# 📷 Jovi Camera

## 📌 Sobre o projeto

O **Jovi Camera** é uma aplicação web desenvolvida em React com o objetivo de facilitar o registro, organização e consulta de imagens e lembretes.

A aplicação permite que o usuário registre uma imagem, organize seus registros em pastas, crie lembretes com data e horário e utilize o reconhecimento óptico de caracteres (OCR) para identificar textos presentes nas imagens.

O projeto foi desenvolvido como parte do desafio acadêmico de desenvolvimento web.

---

## 🚀 Funcionalidades

* 📷 Seleção e registro de imagens
* 🔎 Modo de foco para visualização da imagem
* ⏰ Criação de lembretes
* 🔁 Repetição de lembretes por dias da semana
* 🔔 Alertas de lembretes
* 📁 Organização dos registros em pastas
* 🗑️ Exclusão de lembretes e pastas
* 🖼️ Galeria de imagens
* 📝 Reconhecimento de texto presente nas imagens utilizando OCR
* 💾 Armazenamento dos registros utilizando `localStorage`
* 📱 Interface responsiva

---

## 🛠️ Tecnologias utilizadas

* **React**
* **JavaScript**
* **HTML5**
* **CSS3**
* **Vite**
* **Tesseract.js**
* **LocalStorage**
* **Git e GitHub**
* **Vercel**

---

## 📦 Como instalar as dependências

É necessário ter o **Node.js** instalado na máquina.

Após baixar ou clonar o projeto, abra o terminal dentro da pasta do projeto e execute:

```bash
npm install
```

Esse comando instala todas as dependências necessárias para executar a aplicação.

---

## ▶️ Como executar o projeto

Depois de instalar as dependências, execute:

```bash
npm run dev
```

O Vite irá iniciar o servidor de desenvolvimento.

O terminal exibirá um endereço semelhante a:

```text
http://localhost:5173/
```

Acesse esse endereço pelo navegador.

---

## 🔐 Usuários e senhas

O projeto não possui sistema de autenticação.

Portanto, não são necessários usuários ou senhas para realizar os testes.

---

## 🤖 Utilização de Inteligência Artificial

O projeto possui a funcionalidade denominada **Assistente Jovi**, responsável pelo reconhecimento de textos presentes nas imagens.

Para essa funcionalidade foi utilizado o **Tesseract.js**, uma biblioteca de OCR (Optical Character Recognition), que permite identificar e extrair textos presentes em imagens diretamente na aplicação.

A funcionalidade de geração de resumo por IA foi inicialmente planejada, porém não utiliza uma API paga na versão final do projeto. O botão de geração de resumo permanece na interface sem realizar chamadas para serviços externos de IA.

Dessa forma, a versão final do projeto não depende de uma chave de API ou serviço pago para funcionar.

---

## 💾 Armazenamento dos dados

Os registros criados pelo usuário são armazenados utilizando o **LocalStorage do navegador**.

Isso permite que informações como:

* imagens;
* lembretes;
* datas;
* horários;
* pastas;

permaneçam disponíveis após atualizar a página no mesmo navegador.

---

## 🌐 Deploy

### Vercel

> **Link do Deploy:** COLOCAR_LINK_DA_VERCEL_AQUI

### GitHub

> **Link do Repositório:** COLOCAR_LINK_DO_GITHUB_AQUI

---

## 📁 Estrutura principal do projeto

```text
jovi-camera/
│
├── public/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── AlarmeForm.jsx
│   │   ├── AlertaAlarme.jsx
│   │   ├── Camera.jsx
│   │   ├── Footer.jsx
│   │   ├── Galeria.jsx
│   │   ├── Header.jsx
│   │   ├── LeitorTexto.jsx
│   │   ├── LembreteForm.jsx
│   │   └── ListaLembretes.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── README.md
└── INTEGRANTES.TXT
```

---

## 👥 Integrantes

Os nomes completos e RMs dos integrantes estão disponíveis no arquivo:

```text
INTEGRANTES.TXT
```

Esse arquivo faz parte da entrega do projeto.

---

## 📋 Requisitos para execução

* Node.js instalado
* Navegador atualizado
* Conexão com a internet para instalação das dependências

Não é necessário configurar uma chave de API para executar a versão final do projeto.

---

## 🎓 Projeto acadêmico

Projeto desenvolvido para fins acadêmicos como parte do desafio de desenvolvimento web.

**Jovi Camera — Sistema de registro, organização e gerenciamento de imagens e lembretes.**
