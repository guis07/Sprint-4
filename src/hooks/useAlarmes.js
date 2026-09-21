import { useEffect, useState } from "react";

function useAlarmes() {
  const [alarmes, setAlarmes] = useState(() => {
    const dadosSalvos = localStorage.getItem("alarmes");

    return dadosSalvos
      ? JSON.parse(dadosSalvos)
      : [];
  });

  const [alarmeAtivo, setAlarmeAtivo] = useState(null);

  // Salvar alarmes no localStorage
  useEffect(() => {
    localStorage.setItem(
      "alarmes",
      JSON.stringify(alarmes)
    );
  }, [alarmes]);

  // Adicionar um novo alarme
  function adicionarAlarme(novoAlarme) {
    const alarmeComId = {
      id: Date.now(),
      ...novoAlarme
    };

    setAlarmes((listaAtual) => [
      ...listaAtual,
      alarmeComId
    ]);
  }

  // Atualizar um alarme
  function atualizarAlarme(id, alteracoes) {
    setAlarmes((listaAtual) =>
      listaAtual.map((alarme) =>
        alarme.id === id
          ? {
              ...alarme,
              ...alteracoes
            }
          : alarme
      )
    );
  }

  // Descobrir o dia atual
  function obterDiaDaSemana() {
    const agora = new Date();

    const dias = [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado"
    ];

    return dias[agora.getDay()];
  }

  // Verificar se algum alarme deve disparar
  useEffect(() => {
    function verificarAlarmes() {
      const agora = new Date();

      const dataAtual =
        agora.getFullYear() +
        "-" +
        String(
          agora.getMonth() + 1
        ).padStart(2, "0") +
        "-" +
        String(
          agora.getDate()
        ).padStart(2, "0");

      const horarioAtual =
        String(
          agora.getHours()
        ).padStart(2, "0") +
        ":" +
        String(
          agora.getMinutes()
        ).padStart(2, "0");

      const diaAtual =
        obterDiaDaSemana();

      alarmes.forEach((alarme) => {
        let deveDisparar = false;

        // Alarme repetido
        if (
          alarme.repetir === true &&
          Array.isArray(alarme.dias) &&
          alarme.dias.length > 0
        ) {
          if (
            alarme.dias.includes(diaAtual) &&
            alarme.horario === horarioAtual
          ) {
            deveDisparar = true;
          }
        }

        // Alarme normal
        else if (
          alarme.repetir !== true &&
          alarme.data === dataAtual &&
          alarme.horario === horarioAtual
        ) {
          deveDisparar = true;
        }

        // Disparar alarme
        if (deveDisparar) {
          const chaveAlarme =
            `alarme-executado-${alarme.id}-${dataAtual}-${horarioAtual}`;

          const jaExecutado =
            localStorage.getItem(chaveAlarme);

          if (!jaExecutado) {
            setAlarmeAtivo(alarme);

            localStorage.setItem(
              chaveAlarme,
              "true"
            );
          }
        }
      });
    }

    verificarAlarmes();

    const intervalo = setInterval(
      verificarAlarmes,
      30000
    );

    return () => {
      clearInterval(intervalo);
    };
  }, [alarmes]);

  // Fechar o alerta do alarme
  function fecharAlarme() {
    setAlarmeAtivo(null);
  }

  // Criar lista de pastas
  const pastas = [
    ...new Set(
      alarmes
        .map((alarme) => alarme.pasta)
        .filter((pasta) => pasta)
    )
  ];

  return {
    alarmes,
    alarmeAtivo,
    pastas,
    adicionarAlarme,
    atualizarAlarme,
    fecharAlarme
  };
}

export default useAlarmes;