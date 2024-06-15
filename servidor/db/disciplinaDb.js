import { disciplinaColecao } from "./dbConnect.js";

function obterDisciplina() {
  const disciplina = disciplinaColecao.find().toArray();
  return disciplina;
}

function adicionarDisciplina(nome) {
  const resultado = disciplinaColecao.insertOne({
    nome,
    texto: "",
  });

  return resultado;
}

function encontrarDisciplina(nome) {
  const disciplina = disciplinaColecao.findOne({
    nome,
  });

  return disciplina;
}

function atualizaDisciplina(nome, texto) {
  const atualizacao = disciplinaColecao.updateOne(
    {
      nome,
    },
    {
      $set: {
        texto,
      },
    }
  );

  return atualizacao;
}

function excluirDisciplina(nome) {
  const resultado = disciplinaColecao.deleteOne({
    nome,
  });

  return resultado;
}

export {
  encontrarDisciplina,
  atualizaDisciplina,
  obterDisciplina,
  adicionarDisciplina,
  excluirDisciplina,
};
