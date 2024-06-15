import {
  emitirExcluirDisciplina,
  emitirTextoEditor,
  selecionarDisciplina,
} from "./socket-front-disciplina.js";

const parametros = new URLSearchParams(window.location.search);
const nomeDisciplina = parametros.get("nome");

const textoEditor = document.getElementById("editor-texto");
const tituloDisciplina = document.getElementById("titulo-disciplina");
const botaoExcluir = document.getElementById("excluir-disciplina");
const listaUsuariosConectados = document.getElementById("usuarios-conectados");

tituloDisciplina.textContent = nomeDisciplina || "Disciplina sem título";

function tratarAutorizacaoSucesso(payloadToken) {
  selecionarDisciplina({ nomeDisciplina, emailUsuario: payloadToken.emailUsuario });
}

function atualizarInterfaceUsuarios(usuariosNoDisciplina) {
  listaUsuariosConectados.innerHTML = "";

  usuariosNoDisciplina.forEach((email) => {
    listaUsuariosConectados.innerHTML += `
      <li class="list-group-item">${email}</li>
    `;
  });
}

textoEditor.addEventListener("keyup", () => {
  emitirTextoEditor({
    texto: textoEditor.value,
    nomeDisciplina,
  });
});

function atualizaTextoEditor(texto) {
  textoEditor.value = texto;
}

botaoExcluir.addEventListener("click", () => {
  emitirExcluirDisciplina(nomeDisciplina);
});

function alertarERedirecionar(nome) {
  if (nome === nomeDisciplina) {
    alert(`Disciplina ${nome} excluído!`);
    window.location.href = "/";
  }
}

export {
  atualizaTextoEditor,
  alertarERedirecionar,
  tratarAutorizacaoSucesso,
  atualizarInterfaceUsuarios,
};
