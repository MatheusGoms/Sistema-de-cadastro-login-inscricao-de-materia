import { emitirAdicionarDisciplina } from "./socket-front-index.js";
import { obterCookie, removerCookie } from "./utils/cookies.js";

const tokenJwt = obterCookie("tokenJwt");

console.log(tokenJwt);

const listaDisciplina = document.getElementById("lista-disciplina");
const form = document.getElementById("form-adiciona-disciplina");
const inputDisciplina = document.getElementById("input-disciplina");
const botaoLogout = document.getElementById("botao-logout");

botaoLogout.addEventListener("click", () => {
  removerCookie("tokenJwt");
  alert("Usuário deslogado com sucesso!");
  window.location.href = "/login/index.html";
});

form.addEventListener("submit", (evento) => {
  evento.preventDefault();
  emitirAdicionarDisciplina(inputDisciplina.value);
  inputDisciplina.value = "";
});

function inserirLinkDisciplina(nomeDisciplina) {
  listaDisciplina.innerHTML += `
    <a
      href="/disciplina/index.html?nome=${nomeDisciplina}"
      class="list-group-item list-group-item-action"
      id="disciplina-${nomeDisciplina}"
    >
      ${nomeDisciplina}
    </a>
  `;
}

function removerLinkDisciplina(nomeDisciplina) {
  const disciplina = document.getElementById(`disciplina-${nomeDisciplina}`);

  listaDisciplina.removeChild(disciplina);
}

export { inserirLinkDisciplina, removerLinkDisciplina };
