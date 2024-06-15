import { obterCookie } from "../utils/cookies.js";
import {
  alertarERedirecionar,
  atualizaTextoEditor,
  tratarAutorizacaoSucesso,
} from "./disciplina.js";

const socket = io("/usuarios", {
  auth: {
    token: obterCookie("tokenJwt"),
  },
});

socket.on("autorizacao_sucesso", tratarAutorizacaoSucesso);

socket.on("connect_error", (erro) => {
  alert(erro);
  window.location.href = "/login/index.html";
});

function selecionarDisciplina(dadosEntrada) {
  socket.emit("selecionar_disciplina", dadosEntrada, (texto) => {
    atualizaTextoEditor(texto);
  });
}








function emitirTextoEditor(dados) {
  socket.emit("texto_editor", dados);
}



function emitirExcluirDisciplina(nome) {
  socket.emit("excluir_disciplina", nome);
}

socket.on("excluir_disciplina_sucesso", (nome) => {
  alertarERedirecionar(nome);
});

export { emitirTextoEditor, selecionarDisciplina, emitirExcluirDisciplina };
