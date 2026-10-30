import { Navigate, Outlet } from "react-router-dom";
import { estaLogado } from "../services/auth";

function PrivateRoute() {
  return estaLogado() ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;
