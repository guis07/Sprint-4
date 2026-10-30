import { useEffect, useState } from "react";
import { createWorker } from "tesseract.js";

function LeitorTexto({ imagem, onTextoExtraido }) {
  const [texto, setTexto] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [progresso, setProgresso] = useState(0);
  const [erro, setErro] = useState("");

  // Envia o texto reconhecido para o componente Galeria
  useEffect(() => {
    onTextoExtraido?.(texto);
  }, [texto, onTextoExtraido]);

  async function lerTexto() {
    if (!imagem) return;

    setCarregando(true);
    setErro("");
    setTexto("");
    setProgresso(0);

    let worker;

    try {
      worker = await createWorker("por", 1, {
        logger: (mensagem) => {
          if (mensagem.status === "recognizing text") {
            setProgresso(Math.round(mensagem.progress * 100));
          }
        },
      });

      const resultado = await worker.recognize(imagem);
      const textoEncontrado = resultado.data.text.trim();

      setTexto(textoEncontrado || "Não foi possível identificar texto nessa imagem.");
    } catch (error) {
      console.error("Erro ao reconhecer texto:", error);
      setErro("Não foi possível ler o texto da imagem.");
    } finally {
      if (worker) await worker.terminate();
      setCarregando(false);
    }
  }

  return (
    <div className="text-reader">
      <div className="text-reader-header">
        <div>
          <span className="section-label">INTELIGÊNCIA</span>
          <h3>⭐ Assistente Jovi</h3>
          <p>A Jovi pode identificar o texto presente na imagem.</p>
        </div>
      </div>

      {!texto && !carregando && !erro && (
        <button className="ai-main-button" onClick={lerTexto}>
          ⭐ Identificar texto
        </button>
      )}

      {carregando && (
        <div className="ocr-loading">
          <div className="ocr-loading-icon">🔎</div>
          <h4>Analisando imagem...</h4>
          <p>A Jovi está procurando textos na foto.</p>

          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${progresso}%` }} />
          </div>

          <span>{progresso}%</span>
        </div>
      )}

      {erro && <div className="ocr-error">⚠️ {erro}</div>}

      {texto && (
        <div className="recognized-text">
          <div className="recognized-text-header">
            <h4>📝 Texto identificado</h4>

            <button onClick={lerTexto} className="retry-button">
              🔄 Ler novamente
            </button>
          </div>

          <div className="recognized-text-content">{texto}</div>
        </div>
      )}
    </div>
  );
}

export default LeitorTexto;
