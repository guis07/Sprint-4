
import { useState } from "react";

function AlarmeForm({ onCriarAlarme, onCancelar, pastas = [] }) {
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [som, setSom] = useState("Som 1");
  const [mostrarSons, setMostrarSons] = useState(false);
  const [repetir, setRepetir] = useState(false);
  const [mostrarDias, setMostrarDias] = useState(false);
  const [dias, setDias] = useState([]);
  const [criarPasta, setCriarPasta] = useState(false);
  const [tipoPasta, setTipoPasta] = useState("nova");
  const [nomePasta, setNomePasta] = useState("");
  const [pastaExistente, setPastaExistente] = useState("");

  const diasSemana = [
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
    "Domingo"
  ];

  function alterarDia(dia) {
    if (dias.includes(dia)) {
      setDias(dias.filter((item) => item !== dia));
    } else {
      setDias([...dias, dia]);
    }
  }

  function alterarRepeticao(valor) {
    setRepetir(valor);
    setMostrarDias(valor);

    if (!valor) {
      setDias([]);
    }
  }

  function criarAlarme(event) {
    event.preventDefault();

    let pastaSelecionada = null;

    if (criarPasta) {
      pastaSelecionada =
        tipoPasta === "nova" ? nomePasta.trim() : pastaExistente;
    }

    const novoAlarme = {
      nome,
      data,
      horario,
      som,
      repetir,
      dias,
      pasta: pastaSelecionada
    };

    onCriarAlarme(novoAlarme);
  }

  return (
    <form className="alarme-form" onSubmit={criarAlarme}>
      <div className="form-group">
        <input
          type="time"
          value={horario}
          onChange={(event) => setHorario(event.target.value)}
          required
          aria-label="Horário"
        />
      </div>

      <div className="form-group">
        <input
          type="date"
          value={data}
          onChange={(event) => setData(event.target.value)}
          required
          aria-label="Data"
        />
      </div>

      <div className="form-group">
        <input
          type="text"
          placeholder="Nome do alarme"
          value={nome}
          onChange={(event) => setNome(event.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <select
          value={repetir ? "repetir" : "nao"}
          onChange={(event) =>
            alterarRepeticao(event.target.value === "repetir")
          }
          aria-label="Repetição"
        >
          <option value="nao">Não repetir</option>
          <option value="repetir">Repetir</option>
        </select>
      </div>

      {mostrarDias && (
        <div className="days-container">
          <div className="days-grid">
            {diasSemana.map((dia) => (
              <label
                className={dias.includes(dia) ? "day selected" : "day"}
                key={dia}
              >
                <input
                  type="checkbox"
                  checked={dias.includes(dia)}
                  onChange={() => alterarDia(dia)}
                />
                {dia}
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="form-group">
        <select
          value={mostrarSons ? "aberto" : "fechado"}
          onChange={(event) => {
            setMostrarSons(event.target.value === "aberto");
          }}
          aria-label="Som"
        >
          <option value="fechado">{som}</option>
          <option value="aberto">Escolher som</option>
        </select>
      </div>

      {mostrarSons && (
        <div className="form-group">
          <select
            value={som}
            onChange={(event) => {
              setSom(event.target.value);
              setMostrarSons(false);
            }}
            aria-label="Escolher som"
          >
            <option value="Sem som">Sem som</option>
            <option value="Som 1">Som 1</option>
            <option value="Som 2">Som 2</option>
            <option value="Som 3">Som 3</option>
          </select>
        </div>
      )}

      <div className="form-group">
        <select
          value={
            !criarPasta
              ? "nenhuma"
              : tipoPasta === "nova"
                ? "nova"
                : "existente"
          }
          onChange={(event) => {
            const valor = event.target.value;
            setCriarPasta(valor !== "nenhuma");

            if (valor === "nova") setTipoPasta("nova");
            if (valor === "existente") setTipoPasta("existente");
          }}
          aria-label="Pasta"
        >
          <option value="nenhuma">Sem pasta</option>
          <option value="nova">Criar nova pasta</option>
          {pastas.length > 0 && (
            <option value="existente">Usar pasta existente</option>
          )}
        </select>
      </div>

      {criarPasta && tipoPasta === "nova" && (
        <div className="form-group">
          <input
            type="text"
            placeholder="Nome da pasta"
            value={nomePasta}
            onChange={(event) => setNomePasta(event.target.value)}
            required
          />
        </div>
      )}

      {criarPasta && tipoPasta === "existente" && (
        <div className="form-group">
          <select
            value={pastaExistente}
            onChange={(event) => setPastaExistente(event.target.value)}
            required
            aria-label="Selecionar pasta"
          >
            <option value="">Selecionar pasta</option>
            {pastas.map((pasta) => (
              <option key={pasta} value={pasta}>
                {pasta}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="alarm-actions">
        <button type="submit" className="create-alarm-button">
          Criar alarme
        </button>

        <button
          type="button"
          className="cancel-alarm-button"
          onClick={onCancelar}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default AlarmeForm;
