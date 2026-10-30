import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AlarmeForm from "./AlarmeForm";
import { redimensionarImagem } from "../services/imagem";

function Camera({ onAdicionarAlarme, pastas = [] }) {
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const [foto, setFoto] = useState(null);
  const [foco, setFoco] = useState(false);
  const [mostrarBotaoFoco, setMostrarBotaoFoco] = useState(false);
  const [mostrarAlarme, setMostrarAlarme] = useState(false);
  const [alarmeCriado, setAlarmeCriado] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [flash, setFlash] = useState(false);
  const [timer, setTimer] = useState(false);
  const [configuracoes, setConfiguracoes] = useState(false);

  function reiniciarEtapas() {
    setFoco(false);
    setMostrarBotaoFoco(false);
    setMostrarAlarme(false);
    setAlarmeCriado(false);
  }

  async function selecionarFoto(event) {
    const arquivo = event.target.files[0];
    event.target.value = "";

    if (!arquivo) return;

    try {
      setFoto(await redimensionarImagem(arquivo));
      reiniciarEtapas();
    } catch {
      alert("Não foi possível abrir essa imagem.");
    }
  }

  function clicarEscanear() {
    if (!foto) {
      inputRef.current.click();
    } else if (!foco) {
      setMostrarBotaoFoco(true);
    }
  }

  function voltarCamera() {
    setFoto(null);
    reiniciarEtapas();
  }

  function criarAlarme(novoAlarme) {
    onAdicionarAlarme({
      ...novoAlarme,
      foto,
      focoHabilitado: foco
    });

    setMostrarAlarme(false);
    setAlarmeCriado(true);
  }

  return (
    <section className="camera-app">
      <div className="camera-topo">
        <button
          type="button"
          onClick={() => setFlash(!flash)}
          className={flash ? "topo-ativo" : ""}
          title="Flash"
        >
          ⚡
        </button>

        <button
          type="button"
          onClick={() => setTimer(!timer)}
          className={timer ? "topo-ativo" : ""}
          title="Timer"
        >
          ◷
        </button>

        <span className="camera-nome">JOVI</span>

        <button
          type="button"
          onClick={() => setConfiguracoes(!configuracoes)}
          className={configuracoes ? "topo-ativo" : ""}
          title="Configurações"
        >
          ⚙
        </button>
      </div>

      {configuracoes && (
        <div className="camera-config">
          <strong>Configurações da câmera</strong>
          <p>Modo Scan</p>
          <p>Zoom: {zoom}x</p>

          <button
            type="button"
            onClick={() => setConfiguracoes(false)}
          >
            Fechar
          </button>
        </div>
      )}

      <div className="camera-visor">
        {foto ? (
          <img
            src={foto}
            alt="Imagem selecionada"
            className="camera-imagem"
            style={{ transform: `scale(${zoom})` }}
          />
        ) : (
          <div className="camera-vazia">
            <span>JOVI CAMERA</span>
            <p>Toque no botão para escolher uma imagem</p>
          </div>
        )}

        <div className="camera-sombra"></div>

        <div className="scan-corners corner-top-left"></div>
        <div className="scan-corners corner-top-right"></div>
        <div className="scan-corners corner-bottom-left"></div>
        <div className="scan-corners corner-bottom-right"></div>

        {timer && (
          <div className="camera-aviso">
            <span>◷</span> Timer ativado
          </div>
        )}

        {foco && !alarmeCriado && (
          <div className="camera-foco">
            ✓ Foco habilitado
          </div>
        )}

        {alarmeCriado && (
          <div className="camera-foco">
            ✓ Alarme criado!
          </div>
        )}

        {foto && mostrarBotaoFoco && !foco && (
          <button
            type="button"
            className="camera-foco-botao"
            onClick={() => setFoco(true)}
          >
            ◉ Habilitar foco
          </button>
        )}

        {foto && foco && !mostrarAlarme && !alarmeCriado && (
          <button
            type="button"
            className="camera-alarme-botao"
            onClick={() => setMostrarAlarme(true)}
          >
            ⏰ Criar alarme
          </button>
        )}

        {mostrarAlarme && (
          <div className="camera-formulario">
            <AlarmeForm
              onCriarAlarme={criarAlarme}
              onCancelar={() => setMostrarAlarme(false)}
              pastas={pastas}
            />
          </div>
        )}
      </div>

      <div className="camera-controles">
        <div className="camera-zoom">
          {[0.5, 1, 2].map((valor) => (
            <button
              key={valor}
              type="button"
              className={
                zoom === valor ? "zoom-selecionado" : ""
              }
              onClick={() => setZoom(valor)}
            >
              {valor}x
            </button>
          ))}
        </div>

        <div className="camera-modos">
          <span>FOTO</span>
          <strong>SCAN</strong>
          <span>VÍDEO</span>
        </div>

        <div className="camera-botoes">
          <button
            type="button"
            className="camera-galeria"
            onClick={() => navigate("/galeria")}
            aria-label="Abrir galeria"
          >
            {foto ? (
              <img src={foto} alt="Última foto" />
            ) : (
              "▧"
            )}
          </button>

          <button
            type="button"
            className="camera-disparador"
            onClick={clicarEscanear}
            aria-label="Escanear imagem"
          />

          <button
            type="button"
            className="camera-voltar"
            onClick={voltarCamera}
            aria-label="Voltar à câmera"
          >
            ↻
          </button>

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={selecionarFoto}
            hidden
          />
        </div>
      </div>
    </section>
  );
}

export default Camera;