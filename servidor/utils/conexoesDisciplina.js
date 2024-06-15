const conexoesDisciplina = [];

function encontrarConexao(nomeDisciplina, nomeUsuario) {
  return conexoesDisciplina.find((conexao) => {
    return (
      conexao.nomeDisciplina === nomeDisciplina && conexao.nomeUsuario === nomeUsuario
    );
  });
}

function adicionarConexao(conexao) {
  conexoesDisciplina.push(conexao);
}

function obterUsuariosDisciplina(nomeDisciplina) {
  return conexoesDisciplina
    .filter((conexao) => conexao.nomeDisciplina === nomeDisciplina)
    .map((conexao) => conexao.nomeUsuario);
}

function removerConexao(nomeDisciplina, nomeUsuario) {
  const indice = conexoesDisciplina.findIndex((conexao) => {
    return (
      conexao.nomeDisciplina === nomeDisciplina && conexao.nomeUsuario === nomeUsuario
    );
  });

  if (indice !== -1) {
    conexoesDisciplina.splice(indice, 1);
  }

  console.log(conexoesDisciplina);
}

export {
  encontrarConexao,
  adicionarConexao,
  obterUsuariosDisciplina,
  removerConexao,
};
