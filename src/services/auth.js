const CHAVE = "usuarioLogado";
const USUARIO = "jovi";
const SENHA = "1234";

export function estaLogado() {
  return localStorage.getItem(CHAVE) === "true";
}

export function entrar(usuario, senha) {
  if (usuario !== USUARIO || senha !== SENHA) return false;

  localStorage.setItem(CHAVE, "true");
  return true;
}

export function sair() {
  localStorage.removeItem(CHAVE);
}
