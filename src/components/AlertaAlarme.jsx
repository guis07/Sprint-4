import { useEffect } from "react";

function AlertaAlarme({ alarme, onFechar }) {
  useEffect(() => {
    if (!alarme || !alarme.som || alarme.som === "Sem som") return;

    const audio = new Audio("/alarme.mp3");
    audio.loop = true;
    audio.play().catch((erro) => {
      console.log("O navegador bloqueou a reprodução automática do som:", erro);
    });

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [alarme]);

  if (!alarme) return null;

  return (
    <div className="alarm-overlay">
      <div className="alarm-alert">
        <div className="alarm-icon-large">🔔</div>

        <span className="section-label">LEMBRETE</span>

        <h2>{alarme.nome}</h2>

        <p className="alarm-message">Está na hora do seu lembrete!</p>

        <div className="alarm-details">
          <div>📅 {alarme.data}</div>
          <div>⏰ {alarme.horario}</div>
          {alarme.pasta && <div>📁 {alarme.pasta}</div>}
          {alarme.som && <div>🔊 {alarme.som}</div>}
        </div>

        <button className="alarm-dismiss-button" onClick={onFechar}>
          ✓ Dispensar
        </button>
      </div>
    </div>
  );
}

export default AlertaAlarme;
