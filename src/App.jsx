import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import AlertaAlarme from "./components/AlertaAlarme";

import Home from "./pages/Home";
import Login from "./pages/Login";
import CameraPage from "./pages/CameraPage";
import GaleriaPage from "./pages/GaleriaPage";

import PrivateRoute from "./routes/PrivateRoute";

import useAlarmes from "./hooks/useAlarmes";

function App() {

  const {
    alarmes,
    alarmeAtivo,
    pastas,
    adicionarAlarme,
    atualizarAlarme,
    fecharAlarme
  } = useAlarmes();

  return (
    <BrowserRouter>

      <Header />

      <Routes>

        {/* -------------------------------- */}
        {/* ROTA PÚBLICA - HOME */}
        {/* -------------------------------- */}

        <Route
          path="/"
          element={<Home />}
        />

        {/* -------------------------------- */}
        {/* ROTA PÚBLICA - LOGIN */}
        {/* -------------------------------- */}

        <Route
          path="/login"
          element={<Login />}
        />

        {/* -------------------------------- */}
        {/* ROTA PRIVADA - CÂMERA */}
        {/* -------------------------------- */}

        <Route
          path="/camera"
          element={
            <PrivateRoute>
              <CameraPage
                onAdicionarAlarme={
                  adicionarAlarme
                }
                pastas={pastas}
              />
            </PrivateRoute>
          }
        />

        {/* -------------------------------- */}
        {/* ROTA PRIVADA - GALERIA */}
        {/* -------------------------------- */}

        <Route
          path="/galeria"
          element={
            <PrivateRoute>
              <GaleriaPage
                alarmes={alarmes}
                onAtualizarAlarme={
                  atualizarAlarme
                }
              />
            </PrivateRoute>
          }
        />

      </Routes>

      <Footer />

      <AlertaAlarme
        alarme={alarmeAtivo}
        onFechar={fecharAlarme}
      />

    </BrowserRouter>
  );
}

export default App;