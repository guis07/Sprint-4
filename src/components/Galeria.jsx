import { useState } from "react";
import LeitorTexto from "./LeitorTexto";

function Galeria({ alarmes }) {
  const [imagemSelecionada, setImagemSelecionada] =
    useState(null);

  const [pastaSelecionada, setPastaSelecionada] =
    useState(null);

  const [textoExtraido, setTextoExtraido] =
    useState("");

  const pastas = [
    ...new Set(
      alarmes
        .map((alarme) => alarme.pasta)
        .filter((pasta) => pasta)
    )
  ];

  const imagensSemPasta = alarmes.filter(
    (alarme) => !alarme.pasta
  );

  const imagensDaPasta = alarmes.filter(
    (alarme) => alarme.pasta === pastaSelecionada
  );

  function abrirImagem(alarme) {
    setImagemSelecionada(alarme);

    // Limpa o texto anterior ao abrir outra imagem
    setTextoExtraido("");
  }

  function fecharImagem() {
    setImagemSelecionada(null);
    setTextoExtraido("");
  }

  function abrirPasta(pasta) {
    setPastaSelecionada(pasta);
  }

  function fecharPasta() {
    setPastaSelecionada(null);
  }

  function excluirLembrete(id) {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este lembrete?"
    );

    if (!confirmar) {
      return;
    }

    const alarmesSalvos =
      JSON.parse(localStorage.getItem("alarmes")) || [];

    const novosAlarmes = alarmesSalvos.filter(
      (alarme) => alarme.id !== id
    );

    localStorage.setItem(
      "alarmes",
      JSON.stringify(novosAlarmes)
    );

    window.location.reload();
  }

  function excluirPasta(nomePasta) {
    const confirmar = window.confirm(
      `Tem certeza que deseja excluir a pasta "${nomePasta}"?\n\nTodos os lembretes dentro dela também serão excluídos.`
    );

    if (!confirmar) {
      return;
    }

    const alarmesSalvos =
      JSON.parse(localStorage.getItem("alarmes")) || [];

    const novosAlarmes = alarmesSalvos.filter(
      (alarme) => alarme.pasta !== nomePasta
    );

    localStorage.setItem(
      "alarmes",
      JSON.stringify(novosAlarmes)
    );

    window.location.reload();
  }

  function renderizarCard(alarme) {
    return (
      <article
        className="gallery-card"
        key={alarme.id}
      >
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
              <span className="gallery-icon">
                🔎
              </span>
            )}

            <span className="gallery-icon alarm-icon">
              🔔
            </span>
          </div>
        </div>

        <div className="gallery-card-content">
          <h3>{alarme.nome}</h3>

          <div className="gallery-info">
            <span>
              📅 {alarme.data}
            </span>

            <span>
              ⏰ {alarme.horario}
            </span>
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
            onClick={() =>
              excluirLembrete(alarme.id)
            }
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
          <span className="section-label">
            SEUS REGISTROS
          </span>

          <h2>Galeria</h2>

          <p>
            Encontre suas imagens, lembretes e conteúdos
            registrados.
          </p>
        </div>

        <div className="gallery-count">
          {alarmes.length}

          <span>
            {alarmes.length === 1
              ? " registro"
              : " registros"}
          </span>
        </div>

      </div>

      {alarmes.length === 0 && (
        <div className="empty-gallery">

          <div>
            📷
          </div>

          <h3>
            Sua galeria está vazia
          </h3>

          <p>
            Tire uma foto no Modo Scan para começar.
          </p>

        </div>
      )}

      {alarmes.length > 0 && (
        <>

          {pastas.length > 0 && (
            <div className="folders-area">

              <h3 className="gallery-subtitle">
                📁 Pastas
              </h3>

              <div className="folders-grid">

                {pastas.map((pasta) => {

                  const quantidade =
                    alarmes.filter(
                      (alarme) =>
                        alarme.pasta === pasta
                    ).length;

                  return (
                    <div
                      className="folder-card"
                      key={pasta}
                    >

                      <button
                        className="folder-open-button"
                        onClick={() =>
                          abrirPasta(pasta)
                        }
                      >
                        <span className="folder-icon">
                          📁
                        </span>

                        <span className="folder-name">
                          {pasta}
                        </span>

                        <span className="folder-count">
                          {quantidade}{" "}
                          {quantidade === 1
                            ? "item"
                            : "itens"}
                        </span>
                      </button>

                      <button
                        className="folder-delete-button"
                        onClick={() =>
                          excluirPasta(pasta)
                        }
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

                {imagensSemPasta.map(
                  (alarme) =>
                    renderizarCard(alarme)
                )}

              </div>

            </div>
          )}

        </>
      )}

      {/* PASTA ABERTA */}

      {pastaSelecionada && (
        <div className="overlay">

          <div className="folder-modal">

            <div className="modal-header">

              <div>
                <span className="section-label">
                  PASTA
                </span>

                <h2>
                  📁 {pastaSelecionada}
                </h2>
              </div>

              <button
                className="close-button"
                onClick={fecharPasta}
              >
                ✕
              </button>

            </div>

            <div className="gallery-grid">

              {imagensDaPasta.map(
                (alarme) =>
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

                <h2>
                  {imagemSelecionada.nome}
                </h2>
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

              <div>
                📅 {imagemSelecionada.data}
              </div>

              <div>
                ⏰ {imagemSelecionada.horario}
              </div>

              {imagemSelecionada.pasta && (
                <div>
                  📁 {imagemSelecionada.pasta}
                </div>
              )}

              {imagemSelecionada.focoHabilitado && (
                <div>
                  🔎 Foco habilitado
                </div>
              )}

            </div>

            {/* LEITOR DE TEXTO */}

            <LeitorTexto
              imagem={imagemSelecionada.foto}
              onTextoExtraido={setTextoExtraido}
            />

            {/* BOTÕES DE IA */}

            <div className="ai-actions">

              {/* BOTÃO SEM FUNCIONALIDADE */}

              <button
                className="ai-main-button"
                type="button"
              >
                ⭐ Gerar resumo
              </button>

              <button
                className="ai-secondary-button"
                type="button"
              >
                📚 Criar revisão
              </button>

            </div>

          </div>

        </div>
      )}

    </section>
  );
}

export default Galeria;