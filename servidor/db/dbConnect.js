import { MongoClient } from "mongodb";

const cliente = new MongoClient(
  "mongodb+srv://matheusag9610:24854788@cluster0.c25fjhr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

let disciplinaColecao, usuariosColecao;

try {
  await cliente.connect();

  const db = cliente.db("teste2");
  disciplinaColecao = db.collection("disciplina");
  usuariosColecao = db.collection("usuarios");

  console.log("Conectado ao banco de dados com sucesso!");
} catch (erro) {
  console.log(erro);
}

export { disciplinaColecao, usuariosColecao };
