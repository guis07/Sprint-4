import Galeria from "../components/Galeria";

function GaleriaPage({
  alarmes,
  onAtualizarAlarme
}) {
  return (
    <main>
      <Galeria
        alarmes={alarmes}
        onAtualizarAlarme={onAtualizarAlarme}
      />
    </main>
  );
}

export default GaleriaPage;