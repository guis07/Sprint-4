import { useState } from "react";
import LeitorTexto from "./LeitorTexto";
import { gerarResumo } from "../services/api";

function Galeria({ alarmes, pastas, onExcluirAlarme, onExcluirPasta }) {
  const [imagemSelecionada, setImagemSelecionada] = useState(null);
  const [pastaSelecionada, setPastaSelecionada] = useState(null);
  const [textoExtraido, setTextoExtraido] = useState("");
  const [resumo, setResumo] = useState("");
  const [carregandoResumo, setCarregandoResumo] = useState(false);
  const [erroResumo, setErroResumo] = useState("");

  // Se a pasta deixar de existir (foi excluída), o modal fecha sozinho
  const pastaAberta = pastas.includes(pastaSelecionada) ? pastaSelecionada : null;

  const imagensSemPasta = alarmes.filter((alarme) => !alarme.pasta);
  const imagensDaPasta = alarmes.filter((alarme) => alarme.pasta === pastaAberta);

  function limparResultadosIA() {
    setTextoExtraido("");
    setResumo("");
    setErroResumo("");
  }

  function abrirImagem(alarme) {
    setImagemSelecionada(alarme);
    limparResultadosIA();
  }

  function fecharImagem() {
    setImagemSelecionada(null);
    limparResultadosIA();
  }

  async function gerarResumoIA() {
    if (!textoExtraido.trim()) {
      setErroResumo("Primeiro extraia o texto da imagem.");
      return;
    }

    try {
      setCarregandoResumo(true);
      setErroResumo("");
      setResumo("");

      const resultado = await gerarResumo(textoExtraido);
      setResumo(resultado);
    } catch (erro) {
      console.error(erro);
      setErroResumo("Não foi possível gerar o resumo.");
    } finally {
      setCarregandoResumo(false);
    }
  }

  function excluirLembrete(id) {
    if (window.confirm("Tem certeza que deseja excluir este lembrete?")) {
      onExcluirAlarme(id);
    }
  }

  function excluirPasta(nomePasta) {
    const mensagem = `Tem certeza que deseja excluir a pasta "${nomePasta}"?\n\nTodos os lembretes dentro dela também serão excluídos.`;

    if (window.confirm(mensagem)) {
      onExcluirPasta(nomePasta);
    }
  }

  function renderizarCard(alarme) {
    return (
      <article className="gallery-card" key={alarme.id}>
        <div
          className="gallery-image-container"
          onClick={() => abrirImagem(alarme)}
        >
          <img
            src={alarme.foto}
            alt={alarme.nome}
            className="gallery-image"
          />

          <div className="gallery-icons">
            {alarme.focoHabilitado && (
              <span className="gallery-icon">🔎</span>
            )}

            <span className="gallery-icon alarm-icon">🔔</span>
          </div>
        </div>

        <div className="gallery-card-content">
          <h3>{alarme.nome}</h3>

          <div className="gallery-info">
            <span>📅 {alarme.data}</span>
            <span>⏰ {alarme.horario}</span>
          </div>

          {alarme.pasta && (
            <span className="gallery-folder">
              📁 {alarme.pasta}
            </span>
          )}

          <button
            className="ai-button"
            onClick={() => abrirImagem(alarme)}
          >
            ⭐ Ver conteúdo
          </button>

          <button
            className="delete-button"
            onClick={() => excluirLembrete(alarme.id)}
          >
            🗑️ Excluir lembrete
          </button>
        </div>
      </article>
    );
  }

  return (
    <section className="gallery-section">
      <div className="gallery-header">
        <div>
          <span className="section-label">SEUS REGISTROS</span>
          <h2>Galeria</h2>
          <p>
            Encontre suas imagens, lembretes e conteúdos registrados.
          </p>
        </div>

        <div className="gallery-count">
          {alarmes.length}
          <span>
            {alarmes.length === 1 ? " registro" : " registros"}
          </span>
        </div>
      </div>

      {alarmes.length === 0 && (
        <div className="empty-gallery">
          <div>📷</div>
          <h3>Sua galeria está vazia</h3>
          <p>Tire uma foto no Modo Scan para começar.</p>
        </div>
      )}

      {alarmes.length > 0 && (
        <>
          {pastas.length > 0 && (
            <div className="folders-area">
              <h3 className="gallery-subtitle">📁 Pastas</h3>

              <div className="folders-grid">
                {pastas.map((pasta) => {
                  const alarmesDaPasta = alarmes.filter(
                    (alarme) => alarme.pasta === pasta
                  );

                  const quantidade = alarmesDaPasta.length;

                  const primeiraImagem = alarmesDaPasta.find(
                    (alarme) => alarme.foto
                  );

                  return (
                    <div className="folder-card" key={pasta}>
                      <button
                        className="folder-open-button"
                        onClick={() => setPastaSelecionada(pasta)}
                      >
                        <span className="folder-icon">
                          {primeiraImagem ? (
                            <img
                              src={primeiraImagem.foto}
                              alt={`Foto da pasta ${pasta}`}
                              className="folder-thumbnail"
                            />
                          ) : (
                            "📁"
                          )}
                        </span>

                        <span className="folder-name">
                          {pasta}
                        </span>

                        <span className="folder-count">
                          {quantidade}{" "}
                          {quantidade === 1 ? "item" : "itens"}
                        </span>
                      </button>

                      <button
                        className="folder-delete-button"
                        onClick={() => excluirPasta(pasta)}
                      >
                        🗑️ Excluir pasta
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {imagensSemPasta.length > 0 && (
            <div className="gallery-area">
              <h3 className="gallery-subtitle">
                📷 Imagens sem pasta
              </h3>

              <div className="gallery-grid">
                {imagensSemPasta.map((alarme) =>
                  renderizarCard(alarme)
                )}
              </div>
            </div>
          )}
        </>
      )}

      {/* PASTA ABERTA */}
      {pastaAberta && (
        <div className="overlay">
          <div className="folder-modal">
            <div className="modal-header">
              <div>
                <span className="section-label">PASTA</span>
                <h2>📁 {pastaAberta}</h2>
              </div>

              <button
                className="close-button"
                onClick={() => setPastaSelecionada(null)}
              >
                ✕
              </button>
            </div>

            <div className="gallery-grid">
              {imagensDaPasta.map((alarme) =>
                renderizarCard(alarme)
              )}
            </div>
          </div>
        </div>
      )}

      {/* IMAGEM ABERTA */}
      {imagemSelecionada && (
        <div className="overlay">
          <div className="image-modal">
            <div className="modal-header">
              <div>
                <span className="section-label">
                  CONTEÚDO REGISTRADO
                </span>
                <h2>{imagemSelecionada.nome}</h2>
              </div>

              <button
                className="close-button"
                onClick={fecharImagem}
              >
                ✕
              </button>
            </div>

            <img
              src={imagemSelecionada.foto}
              alt={imagemSelecionada.nome}
              className="modal-image"
            />

            <div className="modal-information">
              <div>📅 {imagemSelecionada.data}</div>
              <div>⏰ {imagemSelecionada.horario}</div>

              {imagemSelecionada.pasta && (
                <div>📁 {imagemSelecionada.pasta}</div>
              )}

              {imagemSelecionada.focoHabilitado && (
                <div>🔎 Foco habilitado</div>
              )}
            </div>

            {/* LEITOR DE TEXTO */}
            <LeitorTexto
              imagem={imagemSelecionada.foto}
              onTextoExtraido={setTextoExtraido}
            />

            {/* BOTÕES DE IA */}
            <div className="ai-actions">
              <button
                className="ai-main-button"
                type="button"
                onClick={gerarResumoIA}
                disabled={carregandoResumo}
              >
                {carregandoResumo
                  ? "⏳ Gerando resumo..."
                  : "⭐ Gerar resumo"}
              </button>

              <button
                className="ai-secondary-button"
                type="button"
              >
                📚 Criar revisão
              </button>
            </div>

            {/* ERRO DA API */}
            {erroResumo && (
              <p className="ai-error">{erroResumo}</p>
            )}

            {/* RESULTADO DA IA */}
            {resumo && (
              <div className="ai-result">
                <h3>🤖 Resumo gerado pela IA</h3>
                <p>{resumo}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default Galeria;
