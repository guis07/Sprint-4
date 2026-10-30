import { useEffect, useRef, useState } from "react";

const DIAS_SEMANA = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

function obterAgora() {
  const agora = new Date();
  const dois = (numero) => String(numero).padStart(2, "0");

  return {
    data: `${agora.getFullYear()}-${dois(agora.getMonth() + 1)}-${dois(agora.getDate())}`,
    horario: `${dois(agora.getHours())}:${dois(agora.getMinutes())}`,
    dia: DIAS_SEMANA[agora.getDay()],
  };
}

function deveDisparar(alarme, agora) {
  if (alarme.horario !== agora.horario) return false;

  if (alarme.repetir) {
    return alarme.dias?.includes(agora.dia) ?? false;
  }

  return alarme.data === agora.data;
}

function useAlarmes() {
  // Os dados ficam só na memória: ao recarregar a página, tudo é apagado
  const [alarmes, setAlarmes] = useState([]);
  const [alarmeAtivo, setAlarmeAtivo] = useState(null);
  const jaDisparados = useRef(new Set());

  useEffect(() => {
    function verificarAlarmes() {
      const agora = obterAgora();

      alarmes.forEach((alarme) => {
        const chave = `${alarme.id}-${agora.data}-${agora.horario}`;

        if (deveDisparar(alarme, agora) && !jaDisparados.current.has(chave)) {
          jaDisparados.current.add(chave);
          setAlarmeAtivo(alarme);
        }
      });
    }

    verificarAlarmes();
    const intervalo = setInterval(verificarAlarmes, 30000);

    return () => clearInterval(intervalo);
  }, [alarmes]);

  function adicionarAlarme(novoAlarme) {
    setAlarmes((lista) => [...lista, { id: Date.now(), ...novoAlarme }]);
  }

  function excluirAlarme(id) {
    setAlarmes((lista) => lista.filter((alarme) => alarme.id !== id));
  }

  function excluirPasta(nomePasta) {
    setAlarmes((lista) => lista.filter((alarme) => alarme.pasta !== nomePasta));
  }

  function fecharAlarme() {
    setAlarmeAtivo(null);
  }

  const pastas = [...new Set(alarmes.map((alarme) => alarme.pasta).filter(Boolean))];

  return {
    alarmes,
    alarmeAtivo,
    pastas,
    adicionarAlarme,
    excluirAlarme,
    excluirPasta,
    fecharAlarme,
  };
}

export default useAlarmes;