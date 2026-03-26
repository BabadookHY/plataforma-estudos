const jwt = require("jsonwebtoken");
const getToken = require("../helpers/get-token");

const autenticar = (req, res, next) => {
  const token = getToken(req);

  if (!token) {
    return res.status(401).json({ erro: "Token nao fornecido" });
  }

  try {
    const usuario = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = usuario;
    next();
  } catch (err) {
    console.log("Erro no token:", err.message);
    return res.status(403).json({ erro: "Token invalido ou expirado" });
  }
};

module.exports = autenticar;
