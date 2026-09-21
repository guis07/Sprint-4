async function gerarResumo(texto) {
  const resposta = await fetch("http://localhost:3001/api/resumo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      texto,
    }),
  });

  if (!resposta.ok) {
    throw new Error("Erro ao gerar resumo.");
  }

  const dados = await resposta.json();

  return dados.resumo;
}

export { gerarResumo };