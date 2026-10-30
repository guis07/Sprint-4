// Função serverless da Vercel: POST /api/resumo
// Recebe { texto } e devolve { resumo } com as primeiras frases do texto.
export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ erro: "Método não permitido." });
  }

  const texto = req.body?.texto;

  if (typeof texto !== "string" || !texto.trim()) {
    return res.status(400).json({ erro: "Nenhum texto foi enviado." });
  }

  const frases = texto
    .replace(/\s+/g, " ")
    .trim()
    .split(/(?<=[.!?])\s+/);

  const quantidade = frases.length <= 3 ? frases.length : Math.ceil(frases.length / 2);

  return res.status(200).json({ resumo: frases.slice(0, quantidade).join(" ") });
}
