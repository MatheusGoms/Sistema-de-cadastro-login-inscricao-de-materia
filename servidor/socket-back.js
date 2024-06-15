import "dotenv/config";

import registrarEventosDisciplina from "./registrarEventos/disciplina.js";
import registrarEventosInicio from "./registrarEventos/inicio.js";
import registrarEventosCadastro from "./registrarEventos/cadastro.js";
import registrarEventosLogin from "./registrarEventos/login.js";

import io from "./servidor.js";
import autorizarUsuario from "./middlewares/autorizarUsuario.js";

const nspUsuarios = io.of("/usuarios");

nspUsuarios.use(autorizarUsuario);

nspUsuarios.on("connection", (socket) => {
  registrarEventosInicio(socket, nspUsuarios);
  registrarEventosDisciplina(socket, nspUsuarios);
});

io.of("/").on("connection", (socket) => {
  registrarEventosCadastro(socket, io);
  registrarEventosLogin(socket, io);
});
