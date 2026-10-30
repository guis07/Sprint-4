import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import AlertaAlarme from "./components/AlertaAlarme";

import Home from "./pages/Home";
import Login from "./pages/Login";
import CameraPage from "./pages/CameraPage";
import GaleriaPage from "./pages/GaleriaPage";

import PrivateRoute from "./routes/PrivateRoute";
import useAlarmes from "./hooks/useAlarmes";

import "./App.css";
import "./PhoneLayout.css";

function LayoutSite() {
  return (
    <div className="site-layout">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

function LayoutCelular() {
  return (
    <div className="phone-page">
      <div className="phone-frame">
        <div className="phone-screen">
          <div className="phone-notch">
            <span></span>
          </div>

          <Header />

          <div className="phone-content">
            <Outlet />
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
}

function App() {
  const {
    alarmes,
    alarmeAtivo,
    pastas,
    adicionarAlarme,
    excluirAlarme,
    excluirPasta,
    fecharAlarme,
  } = useAlarmes();

  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        <Route element={<LayoutSite />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Rotas privadas */}
        <Route element={<PrivateRoute />}>
          <Route element={<LayoutCelular />}>
            <Route
              path="/camera"
              element={<CameraPage onAdicionarAlarme={adicionarAlarme} pastas={pastas} />}
            />
            <Route
              path="/galeria"
              element={
                <GaleriaPage
                  alarmes={alarmes}
                  pastas={pastas}
                  onExcluirAlarme={excluirAlarme}
                  onExcluirPasta={excluirPasta}
                />
              }
            />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <AlertaAlarme alarme={alarmeAtivo} onFechar={fecharAlarme} />
    </BrowserRouter>
  );
}

export default App;
