import { useState } from "react";
import AlarmeForm from "./AlarmeForm";

function Camera({ onAdicionarAlarme, pastas }) {
  const [foto, setFoto] = useState(null);
  const [fotoBase64, setFotoBase64] = useState(null);
  const [focoHabilitado, setFocoHabilitado] = useState(false);
  const [mostrarAlarme, setMostrarAlarme] = useState(false);

  function selecionarFoto(event) {
    const arquivo = event.target.files[0];

    if (arquivo) {
      const imagem = URL.createObjectURL(arquivo);

      setFoto(imagem);
      setFocoHabilitado(false);
      setMostrarAlarme(false);

      const leitor = new FileReader();

      leitor.onloadend = () => {
        setFotoBase64(leitor.result);
      };

      leitor.readAsDataURL(arquivo);
    }
  }

  function habilitarFoco() {
    setFocoHabilitado(true);
  }

  function criarAlarme(novoAlarme) {
    onAdicionarAlarme({
      ...novoAlarme,
      foto: fotoBase64,
      focoHabilitado: focoHabilitado
    });

    setMostrarAlarme(false);
  }

  function cancelarAlarme() {
    setMostrarAlarme(false);
  }

  return (
    <section className="scan-section">

      <div className="scan-header">
        <div>
          <span className="section-label">JOVI CAMERA</span>

          <h2>Modo Scan</h2>

          <p>
            Registre uma imagem e transforme informações
            importantes em conteúdo organizado.
          </p>
        </div>

        <div className="scan-icon">
          📷
        </div>
      </div>

      {!foto && (
        <label className="camera-upload">
          <div className="camera-upload-icon">
            📸
          </div>

          <strong>Adicionar uma imagem</strong>

          <span>
            Tire uma foto ou selecione uma imagem
          </span>

          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={selecionarFoto}
          />
        </label>
      )}

      {foto && (
        <div className="preview-container">

          <div className="image-preview">

            <img
              src={foto}
              alt="Imagem registrada no Modo Scan"
              className={
                focoHabilitado
                  ? "scan-image focus-active"
                  : "scan-image"
              }
            />

            {focoHabilitado && (
              <div className="focus-badge">
                ✓ Foco habilitado
              </div>
            )}

          </div>

          {!focoHabilitado && (
            <button
              className="focus-button"
              onClick={habilitarFoco}
            >
              🔎 Habilitar Foco
            </button>
          )}

          {focoHabilitado && (
            <div className="alarm-area">

              {!mostrarAlarme && (
                <>
                  <p className="focus-message">
                    A imagem está pronta. Agora você pode
                    criar um lembrete para ela.
                  </p>

                  <button
                    className="alarm-button"
                    onClick={() => setMostrarAlarme(true)}
                  >
                    ⏰ Criar Alarme
                  </button>
                </>
              )}

              {mostrarAlarme && (
                <AlarmeForm
                  onCriarAlarme={criarAlarme}
                  onCancelar={cancelarAlarme}
                  pastas={pastas}
                />
              )}

            </div>
          )}

        </div>
      )}

    </section>
  );
}

export default Camera;