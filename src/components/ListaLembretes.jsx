function ListaLembretes({ lembretes, onRemoverLembrete }) {
  return (
    <section>
      <h2>Meus lembretes</h2>

      {lembretes.length === 0 ? (
        <p>Nenhum lembrete cadastrado.</p>
      ) : (
        lembretes.map((lembrete) => (
          <article key={lembrete.id}>
            <h3>{lembrete.titulo}</h3>

            <p> Data: {lembrete.data}</p>

            <p> Horário: {lembrete.horario}</p>

            <p> Som: {lembrete.som}</p>

            <button
              onClick={() => onRemoverLembrete(lembrete.id)}
            >
              Excluir
            </button>
          </article>
        ))
      )}
    </section>
  );
}

export default ListaLembretes;