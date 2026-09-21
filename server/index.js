import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/resumo", (req, res) => {
  try {
    const { texto } = req.body;

    if (!texto || !texto.trim()) {
      return res.status(400).json({
        erro: "Nenhum texto foi enviado."
      });
    }

    const textoLimpo = texto
      .replace(/\s+/g, " ")
      .trim();

    const frases = textoLimpo
      .split(/(?<=[.!?])\s+/)
      .filter((frase) => frase.length > 0);

    let resumo;

    if (frases.length <= 3) {
      resumo = frases.join(" ");
    } else {
      const quantidadeFrases = Math.max(
        2,
        Math.ceil(frases.length / 2)
      );

      resumo = frases
        .slice(0, quantidadeFrases)
        .join(" ");
    }

    res.json({
      resumo
    });

  } catch (error) {
    console.error("Erro ao gerar resumo:", error);

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