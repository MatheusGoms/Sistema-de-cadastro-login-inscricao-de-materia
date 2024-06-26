import { encontrarUsuario } from "../db/usuariosDb.js";
import autenticarUsuario from "../utils/autenticarUsuario.js";
import gerarJwt from "../utils/gerarJwt.js";

function registrarEventosLogin(socket, io) {
  socket.on("autenticar_usuario", async ({ email, senha }) => {
    const usuario = await encontrarUsuario(email);

    console.log(usuario);

    if (usuario) {
      const autenticado = autenticarUsuario(senha, usuario);

      if (autenticado) {
        const tokenJwt = gerarJwt({ emailUsuario: email });

        socket.emit("autenticacao_sucesso", tokenJwt);
      } else {
        socket.emit("autenticacao_erro");
      }
    } else {
      socket.emit("usuario_nao_encontrado");
    }
  });
}

export default registrarEventosLogin;
