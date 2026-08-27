import { useEffect, useState } from "react";
import "./App.css";

import Header from "./components/Header";
import Camera from "./components/Camera";
import Galeria from "./components/Galeria";
import Footer from "./components/Footer";
import AlertaAlarme from "./components/AlertaAlarme";

function App() {
  const [alarmes, setAlarmes] = useState(() => {
    const dadosSalvos =
      localStorage.getItem("alarmes");

    return dadosSalvos
      ? JSON.parse(dadosSalvos)
      : [];
  });

  const [alarmeAtivo, setAlarmeAtivo] =
    useState(null);

  useEffect(() => {
    localStorage.setItem(
      "alarmes",
      JSON.stringify(alarmes)
    );
  }, [alarmes]);

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

  // ----------------------------------------
  // ATUALIZAR UM ALARME
  // ----------------------------------------

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

  // ----------------------------------------
  // DIA DA SEMANA
  // ----------------------------------------

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

  // ----------------------------------------
  // VERIFICAR ALARMES
  // ----------------------------------------

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

        // ALARME REPETIDO

        if (
          alarme.repetir === true &&
          Array.isArray(alarme.dias) &&
          alarme.dias.length > 0
        ) {
          if (
            alarme.dias.includes(
              diaAtual
            ) &&
            alarme.horario ===
              horarioAtual
          ) {
            deveDisparar = true;
          }
        }

        // ALARME NORMAL

        else if (
          alarme.repetir !== true &&
          alarme.data === dataAtual &&
          alarme.horario ===
            horarioAtual
        ) {
          deveDisparar = true;
        }

        // DISPARAR

        if (deveDisparar) {

          const chaveAlarme =
            `alarme-executado-${alarme.id}-${dataAtual}-${horarioAtual}`;

          const jaExecutado =
            localStorage.getItem(
              chaveAlarme
            );

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

    const intervalo =
      setInterval(
        verificarAlarmes,
        30000
      );

    return () => {
      clearInterval(intervalo);
    };
  }, [alarmes]);

  function fecharAlarme() {
    setAlarmeAtivo(null);
  }

  const pastas = [
    ...new Set(
      alarmes
        .map(
          (alarme) =>
            alarme.pasta
        )
        .filter(
          (pasta) => pasta
        )
    )
  ];

  return (
    <>
      <Header />

      <main>

        <Camera
          onAdicionarAlarme={
            adicionarAlarme
          }
          pastas={pastas}
        />

        <Galeria
          alarmes={alarmes}
          onAtualizarAlarme={
            atualizarAlarme
          }
        />

      </main>

      <Footer />

      <AlertaAlarme
        alarme={alarmeAtivo}
        onFechar={fecharAlarme}
      />

    </>
  );
}

export default App;