module.exports.InternalServerError = res => {
  return res.status(500).json({error: "Ocorreu um Erro inesperado"});
};

module.exports.InvalidSessionError = res => {
  return res.status(401).send({ error: "Sessão Inválida" });
};

module.exports.ConflictError = (res, message) => {
  return res.status(409).json({error: message});
};

module.exports.NotAuthorizedError = (res, message) => {
  res.status(401).json({error: message});
};