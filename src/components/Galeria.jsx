import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LeitorTexto from "./LeitorTexto";
import { gerarResumo } from "../services/api";
import "../Galeria.css";

function Galeria({ alarmes, pastas, onExcluirAlarme, onExcluirPasta }) {
  const navigate = useNavigate();

  const [imagemSelecionada, setImagemSelecionada] = useState(null);
  const [pastaSelecionada, setPastaSelecionada] = useState(null);
  const [textoExtraido, setTextoExtraido] = useState("");
  const [resumo, setResumo] = useState("");
  const [carregandoResumo, setCarregandoResumo] = useState(false);
  const [erroResumo, setErroResumo] = useState("");

  // Se a pasta deixar de existir (foi excluída), o filtro é desfeito sozinho
  const pastaAberta = pastas.includes(pastaSelecionada) ? pastaSelecionada : null;
  const fotos = pastaAberta ? alarmes.filter((alarme) => alarme.pasta === pastaAberta) : alarmes;

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

      setResumo(await gerarResumo(textoExtraido));
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
      fecharImagem();
    }
  }

  function excluirPasta(nomePasta) {
    const mensagem = `Tem certeza que deseja excluir a pasta "${nomePasta}"?\n\nTodos os lembretes dentro dela também serão excluídos.`;

    if (window.confirm(mensagem)) {
      onExcluirPasta(nomePasta);
    }
  }

  return (
    <>
      <section className="camera-app galeria-aberta">
        <div className="camera-galeria-tela galeria-rolagem">
          <div className="galeria-topo">
            <button type="button" onClick={() => navigate("/camera")} aria-label="Voltar à câmera">
              ←
            </button>

            <h2>Galeria</h2>
          </div>

          <h3>Pastas</h3>

          <div className="galeria-pastas">
            {pastas.map((pasta) => {
              const doGrupo = alarmes.filter((alarme) => alarme.pasta === pasta);

              return (
                <button
                  type="button"
                  key={pasta}
                  className={`galeria-pasta ${pasta === pastaAberta ? "galeria-pasta-ativa" : ""}`}
                  onClick={() => setPastaSelecionada(pasta === pastaAberta ? null : pasta)}
                >
                  <div className="galeria-pasta-capa">
                    {doGrupo[0]?.foto ? <img src={doGrupo[0].foto} alt={`Pasta ${pasta}`} /> : <span>▤</span>}
                  </div>

                  <p>
                    {pasta} ({doGrupo.length})
                  </p>
                </button>
              );
            })}

            <button
              type="button"
              className={`galeria-pasta ${pastaAberta ? "" : "galeria-pasta-ativa"}`}
              onClick={() => setPastaSelecionada(null)}
            >
              <div className="galeria-pasta-capa galeria-pasta-escura">
                <span>▧</span>
              </div>

              <p>Todas as fotos ({alarmes.length})</p>
            </button>
          </div>

          <div className="galeria-fotos-titulo">
            <h3>{pastaAberta ? `Fotos · ${pastaAberta}` : "Fotos"}</h3>

            {pastaAberta && (
              <button type="button" className="galeria-pasta-excluir" onClick={() => excluirPasta(pastaAberta)}>
                🗑️ Excluir pasta
              </button>
            )}
          </div>

          {fotos.length === 0 ? (
            <p className="galeria-vazia">
              Sua galeria está vazia.
              <br />
              Tire uma foto no Modo Scan para começar.
            </p>
          ) : (
            <div className="galeria-fotos">
              {fotos.map((alarme) => (
                <button
                  type="button"
                  key={alarme.id}
                  className="galeria-foto"
                  onClick={() => abrirImagem(alarme)}
                  aria-label={`Abrir ${alarme.nome}`}
                >
                  <img src={alarme.foto} alt={alarme.nome} />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {imagemSelecionada && (
        <div className="overlay">
          <div className="image-modal">
            <div className="modal-header">
              <div>
                <span className="section-label">CONTEÚDO REGISTRADO</span>
                <h2>{imagemSelecionada.nome}</h2>
              </div>

              <button className="close-button" onClick={fecharImagem}>
                ✕
              </button>
            </div>

            <img src={imagemSelecionada.foto} alt={imagemSelecionada.nome} className="modal-image" />

            <div className="modal-information">
              <div>📅 {imagemSelecionada.data}</div>
              <div>⏰ {imagemSelecionada.horario}</div>
              {imagemSelecionada.pasta && <div>📁 {imagemSelecionada.pasta}</div>}
              {imagemSelecionada.focoHabilitado && <div>🔎 Foco habilitado</div>}
            </div>

            <LeitorTexto imagem={imagemSelecionada.foto} onTextoExtraido={setTextoExtraido} />

            <div className="ai-actions">
              <button
                className="ai-main-button"
                type="button"
                onClick={gerarResumoIA}
                disabled={carregandoResumo}
              >
                {carregandoResumo ? "⏳ Gerando resumo..." : "⭐ Gerar resumo"}
              </button>

              <button className="ai-secondary-button" type="button">
                📚 Criar revisão
              </button>
            </div>

            {erroResumo && <p className="ai-error">{erroResumo}</p>}

            {resumo && (
              <div className="ai-result">
                <h3>🤖 Resumo gerado pela IA</h3>
                <p>{resumo}</p>
              </div>
            )}

            <button className="delete-button" onClick={() => excluirLembrete(imagemSelecionada.id)}>
              🗑️ Excluir lembrete
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Galeria;