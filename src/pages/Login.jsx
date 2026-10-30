import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { entrar } from "../services/auth";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  function enviar(event) {
    event.preventDefault();

    if (entrar(usuario, senha)) {
      navigate("/camera");
    } else {
      alert("Usuário ou senha incorretos.");
    }
  }

  return (
    <main>
      <h2>Login JOVI</h2>

      <form onSubmit={enviar}>
        <input
          type="text"
          placeholder="Usuário"
          value={usuario}
          onChange={(event) => setUsuario(event.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(event) => setSenha(event.target.value)}
        />

        <button type="submit">Entrar</button>
      </form>
    </main>
  );
}

export default Login;
