import { emitirCadastrarUsuario } from "./socket-front-cadastro.js";

const form = document.getElementById("form-cadastro");

form.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nome = form["input-nome"].value;
  const email = form["input-email"].value;
  const senha = form["input-senha"].value;
  const nascimento = form["input-nascimento"].value;

  emitirCadastrarUsuario({ nome, email, senha, nascimento });
});
