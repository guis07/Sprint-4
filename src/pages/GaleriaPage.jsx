import Galeria from "../components/Galeria";

function GaleriaPage({ alarmes, pastas, onExcluirAlarme, onExcluirPasta }) {
  return (
    <main>
      <Galeria
        alarmes={alarmes}
        pastas={pastas}
        onExcluirAlarme={onExcluirAlarme}
        onExcluirPasta={onExcluirPasta}
      />
    </main>
  );
}

export default GaleriaPage;
