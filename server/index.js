import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/api/resumo", async (req, res) => {
  try {
    const { texto } = req.body;

    if (!texto || !texto.trim()) {
      return res.status(400).json({
        erro: "Nenhum texto foi enviado."
      });
    }

    const resposta = await client.responses.create({
      model: "gpt-5.6-luna",
      input: `
            Você é a assistente Jovi.

            Analise o texto abaixo e crie um resumo claro,
            curto e fácil de estudar.

            Não invente informações que não estejam no texto.

            Organize o resumo em tópicos quando fizer sentido.

Texto:
${texto}
`
    });

    res.json({
      resumo: resposta.output_text
    });

  } catch (error) {
    console.error("Erro na IA:", error);

    res.status(500).json({
      erro: "Não foi possível gerar o resumo."
    });
  }
});

app.listen(3001, () => {
  console.log(
    "Servidor da Jovi rodando em http://localhost:3001"
  );
});

