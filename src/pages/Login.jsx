import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  function entrar(e) {
    e.preventDefault();

    if (
      usuario === "jovi" &&
      senha === "1234"
    ) {
      localStorage.setItem(
        "usuarioLogado",
        "true"
      );

      navigate("/camera");
    } else {
      alert("Usuário ou senha incorretos.");
    }
  }

  return (
    <main>
      <h2>Login JOVI</h2>

      <form onSubmit={entrar}>

        <input
          type="text"
          placeholder="Usuário"
          value={usuario}
          onChange={(e) =>
            setUsuario(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) =>
            setSenha(e.target.value)
          }
        />

        <button type="submit">
          Entrar
        </button>

      </form>
    </main>
  );
}

export default Login;