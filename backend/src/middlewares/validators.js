const verifyDataLength = (data, maxLength, code, erroMessage, res) => {
  if (data.length > maxLength) {
    res.status(code).json({ erro: erroMessage });
    return true;
  }

  return false
};

const validateContent = (req, res, next) => {
  const { titulo, tema, disciplina, tipo, link, descricao, palavras_chave } =
    req.body;

  //  Mandatory data
  if (!titulo) return res.status(400).json({ erro: "Titulo é obrigatório" });

  if (!tema) return res.status(400).json({ erro: "Tema é obrigatório" });

  if (!disciplina)
    return res.status(400).json({ erro: "Disciplina é obrigatória" });

  // Length data
  if (verifyDataLength(titulo, 100, 400, "Titulo muito longo", res)) return;
  if (verifyDataLength(tema, 100, 400, "Tema muito longo", res)) return;
  if (verifyDataLength(tipo, 100, 400, "Tipo muito longo", res)) return;
  if (verifyDataLength(disciplina, 100, 400, "Disciplina muito longa", res)) return;
  if (verifyDataLength(link, 500, 400, "Link muito longo", res)) return;
  if (verifyDataLength(descricao, 500, 400, "Descrição muito longa", res)) return;
  if (verifyDataLength(palavras_chave, 500, 400, "Palavra chave muito longa", res)) return;

  next();
};

const validateMovie = (req, res, next) => {
  const { titulo, ano, descricao, tema, disciplina, conteudo_id } = req.body;

  //Mandatory Data
  if (!titulo) return res.status(400).json({ erro: "O título é obrigatório!" });

  if (!conteudo_id)
    return res.status(400).json({ erro: "O id do conteúdo é obrigatório" });

  if (typeof ano !== "string") {
    return res.status(400).json({ erro: "O Ano precisa ser um texto" });
  }

  //Length data
  if (verifyDataLength(titulo, 100, 400, "Título muito longo", res)) return;
  if (verifyDataLength(ano, 4, 400, "Ano muito longo", res)) return;
  if (verifyDataLength(descricao, 500, 400, "Descrição muito longa", res)) return;
  if (verifyDataLength(tema, 100, 400, "Tema muito longo", res)) return;
  if (verifyDataLength(disciplina, 100, 400, "Disciplina muito longa", res)) return;

  next();
};

const validateComments = (req, res, next) => {
  const { texto } = req.body;

  if(verifyDataLength(texto, 500, 400, "Comentário muito longo", res)) return;

  next();
}

module.exports = {
  validateContent,
  validateMovie,
  validateComments
};
