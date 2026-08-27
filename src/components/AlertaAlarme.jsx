import { useEffect, useRef } from "react";

function AlertaAlarme({ alarme, onFechar }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (!alarme) {
      return;
    }

    // Se o usuário escolheu "Sem som",
    // não reproduz áudio.
    if (
      !alarme.som ||
      alarme.som === "Sem som"
    ) {
      return;
    }

    const audio = new Audio("/sons/alarme.mp3");

    audio.loop = true;

    audioRef.current = audio;

    audio
      .play()
      .catch((erro) => {
        console.log(
          "O navegador bloqueou a reprodução automática do som:",
          erro
        );
      });

    return () => {
      audio.pause();
      audio.currentTime = 0;
      audioRef.current = null;
    };
  }, [alarme]);

  function fecharAlarme() {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }

    onFechar();
  }

  if (!alarme) {
    return null;
  }

  return (
    <div className="alarm-overlay">

      <div className="alarm-alert">

        <div className="alarm-icon-large">
          🔔
        </div>

        <span className="section-label">
          LEMBRETE
        </span>

        <h2>
          {alarme.nome}
        </h2>

        <p className="alarm-message">
          Está na hora do seu lembrete!
        </p>

        <div className="alarm-details">

          <div>
            📅 {alarme.data}
          </div>

          <div>
            ⏰ {alarme.horario}
          </div>

          {alarme.pasta && (
            <div>
              📁 {alarme.pasta}
            </div>
          )}

          {alarme.som && (
            <div>
              🔊 {alarme.som}
            </div>
          )}

        </div>

        <button
          className="alarm-dismiss-button"
          onClick={fecharAlarme}
        >
          ✓ Dispensar
        </button>

      </div>

    </div>
  );
}

export default AlertaAlarme;

