export async function gerarResumo(texto) {
  const resposta = await fetch("/api/resumo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ texto }),
  });

  if (!resposta.ok) {
    throw new Error("Erro ao gerar resumo.");
  }

  const dados = await resposta.json();
  return dados.resumo;
}
