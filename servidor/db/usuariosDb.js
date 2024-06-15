import criaHashESalSenha from "../utils/criaHashESalSenha.js";
import { usuariosColecao } from "./dbConnect.js";

function encontrarUsuario(email) {
  return usuariosColecao.findOne({ email });
}

function cadastrarUsuario({ nome, email, senha, nascimento }) {
  const { hashSenha, salSenha } = criaHashESalSenha(senha);

  return usuariosColecao.insertOne({ nome, email, hashSenha, salSenha, nascimento });
}

export { cadastrarUsuario, encontrarUsuario };
