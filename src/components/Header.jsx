import { Link, useNavigate } from "react-router-dom";
import { estaLogado, sair } from "../services/auth";

function Header() {
  const navigate = useNavigate();
  const usuarioLogado = estaLogado();

  function sairDaConta() {
    sair();
    navigate("/login");
  }

  return (
    <header className="bg-[#0b1120] border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">

        <Link to="/" className="flex items-center gap-3 no-underline">
          <div className="w-11 h-11 rounded-xl bg-cyan-400 text-slate-950 flex items-center justify-center text-2xl font-bold">
            J
          </div>

          <div>
            <h1 className="text-xl font-bold text-white">
              Jovi
            </h1>
            <p className="text-xs text-slate-400">
              Camera
            </p>
          </div>
        </Link>

        <nav className="flex items-center gap-6 flex-wrap">
          <Link
            to="/"
            className="text-sm text-slate-300 no-underline hover:text-cyan-400 transition"
          >
            Início
          </Link>

          {usuarioLogado && (
            <>
              <Link
                to="/camera"
                className="text-sm text-slate-300 no-underline hover:text-cyan-400 transition"
              >
                Câmera
              </Link>

              <Link
                to="/galeria"
                className="text-sm text-slate-300 no-underline hover:text-cyan-400 transition"
              >
                Galeria
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-3 rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm">
          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>

          {usuarioLogado ? (
            <>
              <span className="text-slate-300">
                Modo Scan
              </span>

              <button
                onClick={sairDaConta}
                className="text-slate-300 hover:text-rose-400 transition"
              >
                Sair
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-cyan-400 no-underline hover:text-cyan-300 transition"
            >
              Entrar
            </Link>
          )}
        </div>

      </div>
    </header>
  );
}

export default Header;
