import Camera from "../components/Camera";

function CameraPage({ onAdicionarAlarme, pastas }) {
  return (
    <main>
      <Camera onAdicionarAlarme={onAdicionarAlarme} pastas={pastas} />
    </main>
  );
}

export default CameraPage;
