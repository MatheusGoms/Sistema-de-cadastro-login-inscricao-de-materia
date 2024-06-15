import { emitirAutenticarUsuario } from "./socket-front-login.js";

const form = document.getElementById("form-login");

form.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const email = form["input-email"].value;
  const senha = form["input-senha"].value;

  emitirAutenticarUsuario({ email, senha });
});
