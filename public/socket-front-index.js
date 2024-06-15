import { inserirLinkDisciplina, removerLinkDisciplina } from "./index.js";
import { obterCookie } from "./utils/cookies.js";

const socket = io("/usuarios", {
  auth: {
    token: obterCookie("tokenJwt"),
  },
});

socket.on("connect_error", (erro) => {
  alert(erro);
  window.location.href = "/login/index.html";
});

socket.emit("obter_disciplina", (disciplina) => {
  disciplina.forEach((disciplina) => {
    inserirLinkDisciplina(disciplina.nome);
  });
});

function emitirAdicionarDisciplina(nome) {
  socket.emit("adicionar_disciplina", nome);
}

socket.on("adicionar_disciplina_interface", (nome) => {
  inserirLinkDisciplina(nome);
});

socket.on("disciplina_existente", (nome) => {
  alert(`O disciplina ${nome} já existe!`);
});

socket.on("excluir_disciplina_sucesso", (nome) => {
  removerLinkDisciplina(nome);
});

export { emitirAdicionarDisciplina };
