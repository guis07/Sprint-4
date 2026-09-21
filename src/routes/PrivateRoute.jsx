import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const usuarioLogado =
    localStorage.getItem("usuarioLogado");

  if (usuarioLogado !== "true") {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default PrivateRoute;