import {
  adicionarDisciplina,
  encontrarDisciplina,
  obterDisciplina,
} from "../db/disciplinaDb.js";

function registrarEventosInicio(socket, io) {
  socket.on("obter_disciplina", async (devolverDisciplina) => {
    const disciplina = await obterDisciplina();

    devolverDisciplina(disciplina);
  });

  socket.on("adicionar_disciplina", async (nome) => {
    const disciplinaExiste = (await encontrarDisciplina(nome)) !== null;

    if (disciplinaExiste) {
      socket.emit("disciplina_existente", nome);
    } else {
      const resultado = await adicionarDisciplina(nome);

      if (resultado.acknowledged) {
        io.emit("adicionar_disciplina_interface", nome);
      }
    }
  });
}

export default registrarEventosInicio;
