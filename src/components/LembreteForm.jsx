import { useState } from "react";

function LembreteForm({ onAdicionarLembrete }) {
  const [titulo, setTitulo] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [som, setSom] = useState("Som 1");

  function cadastrarLembrete(event) {
    event.preventDefault();

    const novoLembrete = {
      titulo,
      data,
      horario,
      som
    };

    onAdicionarLembrete(novoLembrete);

    setTitulo("");
    setData("");
    setHorario("");
    setSom("Som 1");
  }

  return (
    <form onSubmit={cadastrarLembrete}>

      <h2>Criar lembrete</h2>

      <label>
        Quando deseja ser lembrado?
      </label>

      <input
        type="text"
        placeholder="Ex: CP de Front-end Design"
        value={titulo}
        onChange={(event) => setTitulo(event.target.value)}
        required
      />

      <label>
        Data:
      </label>

      <input
        type="date"
        value={data}
        onChange={(event) => setData(event.target.value)}
        required
      />

      <label>
        Horário:
      </label>

      <input
        type="time"
        value={horario}
        onChange={(event) => setHorario(event.target.value)}
        required
      />

      <label>
        Som:
      </label>

      <select
        value={som}
        onChange={(event) => setSom(event.target.value)}
      >
        <option>Som 1</option>
        <option>Som 2</option>
        <option>Som 3</option>
      </select>

      <button type="submit">
        Criar lembrete
      </button>

    </form>
  );
}

export default LembreteForm;