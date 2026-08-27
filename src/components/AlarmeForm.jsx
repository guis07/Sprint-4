import { useState } from "react";

function AlarmeForm({
  onCriarAlarme,
  onCancelar,
  pastas
}) {
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [som, setSom] = useState("Som 1");

  const [repetir, setRepetir] = useState(false);
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

  function criarAlarme(event) {
    event.preventDefault();

    let pastaSelecionada = null;

    if (criarPasta) {
      if (tipoPasta === "nova") {
        pastaSelecionada = nomePasta;
      } else {
        pastaSelecionada = pastaExistente;
      }
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

    setNome("");
    setData("");
    setHorario("");
    setSom("Som 1");
    setRepetir(false);
    setDias([]);
    setCriarPasta(false);
    setTipoPasta("nova");
    setNomePasta("");
    setPastaExistente("");
  }

  return (
    <form
      className="alarme-form"
      onSubmit={criarAlarme}
    >
      <div className="alarm-form-header">
        <div>
          <span className="section-label">
            LEMBRETE
          </span>

          <h3>Criar Alarme</h3>

          <p>
            Escolha quando você deseja ser lembrado.
          </p>
        </div>

        <div className="alarm-form-icon">
          ⏰
        </div>
      </div>

      {/* NOME */}

      <div className="form-group">
        <label>
          Nome do lembrete
        </label>

        <input
          type="text"
          placeholder="Ex: Prova de Java"
          value={nome}
          onChange={(event) =>
            setNome(event.target.value)
          }
          required
        />
      </div>

      {/* DATA E HORÁRIO */}

      <div className="form-row">

        <div className="form-group">
          <label>
            📅 Data
          </label>

          <input
            type="date"
            value={data}
            onChange={(event) =>
              setData(event.target.value)
            }
            required
          />
        </div>

        <div className="form-group">
          <label>
            ⏰ Horário
          </label>

          <input
            type="time"
            value={horario}
            onChange={(event) =>
              setHorario(event.target.value)
            }
            required
          />
        </div>

      </div>

      {/* SOM */}

      <div className="form-group">
        <label>
          🔊 Som do alarme
        </label>

        <select
          value={som}
          onChange={(event) =>
            setSom(event.target.value)
          }
        >
          <option>Sem som</option>
          <option>Som 1</option>
          <option>Som 2</option>
          <option>Som 3</option>
        </select>
      </div>

      {/* REPETIÇÃO */}

      <div className="form-option">
        <label className="checkbox-label">

          <input
            type="checkbox"
            checked={repetir}
            onChange={(event) =>
              setRepetir(event.target.checked)
            }
          />

          <span>
            Repetir durante a semana
          </span>

        </label>
      </div>

      {repetir && (
        <div className="days-container">

          <p>
            Escolha os dias:
          </p>

          <div className="days-grid">

            {diasSemana.map((dia) => (

              <label
                className={
                  dias.includes(dia)
                    ? "day selected"
                    : "day"
                }
                key={dia}
              >

                <input
                  type="checkbox"
                  checked={dias.includes(dia)}
                  onChange={() =>
                    alterarDia(dia)
                  }
                />

                {dia}

              </label>

            ))}

          </div>

        </div>
      )}

      {/* PASTA */}

      <div className="form-option">
        <label className="checkbox-label">

          <input
            type="checkbox"
            checked={criarPasta}
            onChange={(event) =>
              setCriarPasta(event.target.checked)
            }
          />

          <span>
            📁 Organizar em uma pasta
          </span>

        </label>
      </div>

      {criarPasta && (

        <div className="folder-container">

          <p>
            Onde deseja salvar?
          </p>

          <div className="folder-options">

            <label
              className={
                tipoPasta === "nova"
                  ? "folder-option active"
                  : "folder-option"
              }
            >

              <input
                type="radio"
                value="nova"
                checked={tipoPasta === "nova"}
                onChange={() =>
                  setTipoPasta("nova")
                }
              />

              <span>
                ➕ Nova pasta
              </span>

            </label>

            {pastas.length > 0 && (

              <label
                className={
                  tipoPasta === "existente"
                    ? "folder-option active"
                    : "folder-option"
                }
              >

                <input
                  type="radio"
                  value="existente"
                  checked={
                    tipoPasta === "existente"
                  }
                  onChange={() =>
                    setTipoPasta("existente")
                  }
                />

                <span>
                  📁 Pasta existente
                </span>

              </label>

            )}

          </div>

          {tipoPasta === "nova" && (

            <input
              type="text"
              placeholder="Nome da nova pasta"
              value={nomePasta}
              onChange={(event) =>
                setNomePasta(event.target.value)
              }
              required
            />

          )}

          {tipoPasta === "existente" && (

            <select
              value={pastaExistente}
              onChange={(event) =>
                setPastaExistente(event.target.value)
              }
              required
            >

              <option value="">
                Selecione uma pasta
              </option>

              {pastas.map((pasta) => (

                <option
                  key={pasta}
                  value={pasta}
                >
                  {pasta}
                </option>

              ))}

            </select>

          )}

        </div>

      )}

      {/* BOTÕES */}

      <div className="alarm-actions">

        <button
          type="submit"
          className="create-alarm-button"
        >
          ⏰ Criar Alarme
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