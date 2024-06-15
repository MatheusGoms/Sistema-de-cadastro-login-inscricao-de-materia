import {
  atualizaDisciplina,
  encontrarDisciplina,
  excluirDisciplina,
} from "../db/disciplinaDb.js";
import {
  adicionarConexao,
  encontrarConexao,
  obterUsuariosDisciplina,
  removerConexao,
} from "../utils/conexoesDisciplina.js";

function registrarEventosDisciplina(socket, io) {
  socket.on(
    "selecionar_disciplina",
    async ({ nomeDisciplina, emailUsuario }, devolverTexto) => {
      const disciplina = await encontrarDisciplina(nomeDisciplina);

      if (disciplina) {
        const conexaoEncontrada = encontrarConexao(nomeDisciplina, emailUsuario);

        if (!conexaoEncontrada) {
          socket.join(nomeDisciplina);

          adicionarConexao({ nomeDisciplina, emailUsuario });

          socket.data = {
            usuarioEntrou: true,
          };

          const usuariosNoDisciplina = obterUsuariosDisciplina(nomeDisciplina);

          io.to(nomeDisciplina).emit("usuarios_no_disciplina", usuariosNoDisciplina);

          devolverTexto(disciplina.texto);
        } else {
          socket.emit("usuario_ja_no_disciplina");
        }
      }

      socket.on("texto_editor", async ({ texto, nomeDisciplina }) => {
        const atualizacao = await atualizaDisciplina(nomeDisciplina, texto);

        if (atualizacao.modifiedCount) {
          socket.to(nomeDisciplina).emit("texto_editor_clientes", texto);
        }
      });

      socket.on("excluir_disciplina", async (nome) => {
        const resultado = await excluirDisciplina(nome);

        if (resultado.deletedCount) {
          io.emit("excluir_disciplina_sucesso", nome);
        }
      });

      socket.on("disconnect", () => {
        if (socket.data.usuarioEntrou) {
          removerConexao(nomeDisciplina, emailUsuario);

          const usuariosNoDisciplina = obterUsuariosDisciplina(nomeDisciplina);

          io.to(nomeDisciplina).emit("usuarios_no_disciplina", usuariosNoDisciplina);
        }
      });
    }
  );
}

export default registrarEventosDisciplina;
