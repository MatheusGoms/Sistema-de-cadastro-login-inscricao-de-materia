import { scryptSync, timingSafeEqual } from "crypto";

function autenticarUsuario(senhaDigitada, email) {
  const hashTeste = scryptSync(senhaDigitada, email.salSenha, 64);

  const hashReal = Buffer.from(email.hashSenha, "hex");

  const autenticado = timingSafeEqual(hashTeste, hashReal);

  return autenticado;
}

export default autenticarUsuario;
