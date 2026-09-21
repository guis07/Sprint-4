import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const usuarioLogado =
    localStorage.getItem("usuarioLogado") === "true";

  function sair() {
    localStorage.removeItem("usuarioLogado");
    navigate("/login");
  }

  return (
    <header className="header">
      <div className="header-content">

        {/* Logo */}
        <div className="logo">
          <span className="logo-icon">J</span>

          <div>
            <h1>Jovi</h1>
            <p>Camera</p>
          </div>
        </div>

        {/* Navegação */}
        <nav className="header-nav">
          <Link to="/">Início</Link>

          {usuarioLogado && (
            <>
              <Link to="/camera">Câmera</Link>
              <Link to="/galeria">Galeria</Link>
            </>
          )}
        </nav>

        {/* Status / Login */}
        <div className="header-status">
          <span className="status-dot"></span>

          {usuarioLogado ? (
            <>
              <span>Modo Scan</span>

              <button onClick={sair}>
                Sair
              </button>
            </>
          ) : (
            <Link to="/login">
              Entrar
            </Link>
          )}
        </div>

      </div>
    </header>
  );
}

export default Header;